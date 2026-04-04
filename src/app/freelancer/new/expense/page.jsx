import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"
import ExpensesForm from "@/components/forms/ExpensesForm"

export default async function NewExpense()    {
    const {userId} = await auth();

    const clientResult = await db.query(`
        SELECT * 
        FROM clients
        WHERE user_id = $1
        ORDER BY company_name ASC
    `,
        [userId]
    );
    const clients = clientResult.rows;

    
const jobsResult = await db.query(
    `
        SELECT jobs.*, clients.company_name
        FROM jobs
        JOIN clients ON jobs.client_id = clients.id
        WHERE jobs.user_id = $1 
        ORDER BY clients.company_name ASC, jobs.title ASC
        `, 
        [userId]
    );
    const jobs = jobsResult.rows;

async function handleSubmit(rawData)    {
    "use server"
    const { userId } = await auth();

    /*  const formValues = {
            category: rawFormData.get("category"),
            concept: rawFormData.get("concept"),
            amount: rawFormData.get("amount"),
            expenseDate: rawFormData.get("expense"),
            jobId: rawFormData.get("job_id"),
    };*/

    const {
        client_id, 
        job_id, 
        concept, 
        category, 
        amount, 
        date, 
    } = Object.fromEntries(rawData)

    const dateIssued = date || null;
    const amountCharged = amount || null;

    await db.query(
            `
            INSERT INTO expenses (job_id, concept, category, amount, date, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [job_id, concept, category, amountCharged, dateIssued, userId]
        );

        revalidatePath("/freelancer/expenses");
        redirect("/freelancer/expenses");
}
    return (
        <ExpensesForm
            action={handleSubmit}
            clients={clients}
            jobs={jobs}
        />
        
    )
}