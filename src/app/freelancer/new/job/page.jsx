import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"
import JobForm from "@/components/forms/JobForm"


export default async function NewJob () {
    const { userId } = await auth()
    
    if (!userId) {
    throw new Error("Unauthorized")
    }
    
    const clientsResult = await db.query(
        `SELECT id, company_name FROM clients WHERE user_id = $1`, 
        [userId]
    );

    const clients = clientsResult.rows;

async function handleSubmit(rawFormData) {
    "use server";

    // The "name" property in the input form -> needs to macth the column name in the DB:
    const { 
        client_id, 
        title, 
        job_details, 
        status, 
        start_date, 
        deadline, 
        hours_expected, 
        hours_worked, 
        hourly_rate, 
        price  
    } = Object.fromEntries(rawFormData);

    // they need to be converted in the server because DB doesnt accept an empty string for numbers incl dates
    const startDate = start_date || null;
    const deadlineDate = deadline || null;
    const hoursExpected = hours_expected || null;
    const hoursWorked = hours_worked || null;
    const hourlyRate = hourly_rate || null;
    const priceFixed = price || null;
    
    await db.query(
        `INSERT INTO jobs (user_id, client_id, title, job_details, status, start_date, deadline, hours_expected, hours_worked, hourly_rate, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
        userId,
        client_id,
        title,
        job_details,
        status,
        startDate,
        deadlineDate,
        hoursExpected,
        hoursWorked,
        hourlyRate,
        priceFixed, 
        ]
    );
    revalidatePath("/freelancer/jobs");
    redirect("/freelancer/jobs");
    }
    return (
        <>
        <JobForm action={handleSubmit} clients={clients} />
        </>
    );
}
