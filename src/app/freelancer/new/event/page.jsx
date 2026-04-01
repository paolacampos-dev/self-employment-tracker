import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"
import EventsForm from "@/components/forms/EventsForm"

export default async function NewEvent ()    {
    const { userId } = await auth()
    
    if (!userId) {
    throw new Error("Unauthorized")
    }

    const jobsResult = await db.query(
        `
        SELECT 
            jobs.id,
            jobs.title,
            jobs.job_details,
            clients.company_name
        FROM jobs
        JOIN clients ON jobs.client_id = clients.id
        WHERE jobs.user_id = $1
        ORDER BY clients.company_name ASC, jobs.title ASC;
        `, 
        [userId]
    )
    const jobs = jobsResult.rows

    async function handleSubmit(rawFormData) {
    "use server";   
        const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }
        const {
            job_id, 
            title, 
            start_datetime, 
            end_datetime, 
            notes, 
        } = Object.fromEntries(rawFormData)

        const selectedJob = job_id || null
        const startDate = start_datetime || null
        const endDate = end_datetime || null

        await db.query(
            `
            INSERT INTO events (user_id, job_id, title, start_datetime, end_datetime, notes)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [userId, selectedJob, title, startDate, endDate, notes]
        )

        revalidatePath("/freelancer/schedule")
        redirect("/freelancer/schedule")
    }

    return(
        <EventsForm
            action={handleSubmit}
            jobs={jobs}
        />
    )
}