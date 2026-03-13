"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function UpdateExpense(rawFormData) {
    const { userId } = await auth();

    if (!userId) {
    throw new Error("Unauthorized");
    }

    const id = rawFormData.get("id");

    const formValues = {
        concept: rawFormData.get("concept"),
        category: rawFormData.get("category"),
        amount: rawFormData.get("amount"),
        date: rawFormData.get("date"),
        job_id: rawFormData.get("job_id")
    };

        await db.query(
        `
        UPDATE expenses
        SET concept = $1,
            category = $2, 
            amount = $3,
            date = $4,
            job_id = $5
        WHERE id = $6
        AND user_id = $7
        `,
        [
            formValues.concept,
            formValues.category,
            formValues.amount,
            formValues.date,
            formValues.job_id,
            id,
            userId
        ]
    );
    
    revalidatePath(`/freelancer/expenses/${id}/edit`);
    revalidatePath(`/freelancer/expenses/${id}`);
    redirect(`/freelancer/expenses/${id}`);
    }