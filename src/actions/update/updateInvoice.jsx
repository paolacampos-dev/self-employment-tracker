"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function UpdateInvoice(rawFormData) {
    const { userId } = await auth();

    if (!userId) {
    throw new Error("Unauthorized");
    }

    const id = rawFormData.get("id");

    const formValues = {
        invoice_number: rawFormData.get("invoice_number"),
        status: rawFormData.get("status"),
        amount: rawFormData.get("amount"),
        date_issued: rawFormData.get("date_issued"),
        due_date: rawFormData.get("due_date"),
        job_id: rawFormData.get("job_id")
    };

        await db.query(
        `
        UPDATE invoices
        SET invoice_number = $1,
            status = $2, 
            amount = $3,
            date_issued = $4,
            due_date = $5,
            job_id = $6
        WHERE id = $7
        AND user_id = $8
        `,
        [
            formValues.invoice_number,
            formValues.status,
            formValues.amount,
            formValues.date_issued,
            formValues.due_date,
            formValues.job_id,
            id,
            userId
        ]
    );
    
    revalidatePath(`/freelancer/invoices/${id}/edit`);
    revalidatePath(`/freelancer/invoices/${id}`);
    redirect(`/freelancer/invoices/${id}`);
    }