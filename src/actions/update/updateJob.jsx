"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function UpdateJob(rawFormData) {
    const { userId } = await auth();

    if (!userId) {
    throw new Error("Unauthorized");
    }
const clientsResult = await db.query(
        `SELECT id, company_name FROM clients WHERE user_id = $1`, 
        [userId]
    );
    const clients = clientsResult.rows;

    const id = rawFormData.get("id");

    const formValues = {
        clientId: rawFormData.get("client_id"),
        title: rawFormData.get("title"),
        jobDetails: rawFormData.get("job_details"),
        status: rawFormData.get("status"),
        startDate: rawFormData.get("start_date") || null,
        deadline: rawFormData.get("deadline") || null,
        hoursExpected: rawFormData.get("hours_expected") || null,
        hoursWorked: rawFormData.get("hours_worked") || null,
        hourlyRate: rawFormData.get("hourly_rate") || null,
        price: rawFormData.get("price") || null,
    };

    await db.query(
        `UPDATE jobs
            SET client_id = $1, 
            title = $2,
            job_details = $3,
            status = $4,
            start_date = $5,
            deadline = $6,
            hours_expected = $7,
            hours_worked = $8,
            hourly_rate = $9,
            price= $10
            WHERE id = $11 AND user_id = $12`,
        [
        formValues.clientId,
        formValues.title,
        formValues.jobDetails,
        formValues.status,
        formValues.startDate,
        formValues.deadline,
        formValues.hoursExpected,
        formValues.hoursWorked,
        formValues.hourlyRate,
        formValues.price, 
        id,
        userId,
        ]
    );

    revalidatePath(`/freelancer/jobs/${id}`);
    redirect(`/freelancer/jobs/${id}`);
    }