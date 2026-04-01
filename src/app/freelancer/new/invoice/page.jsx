import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"
import InvoicesForm from "@/components/forms/InvoiceForm"

export default async function NewInvoice ()    {
    const { userId } = await auth()
    
    if (!userId) {
    throw new Error("Unauthorized")
    }

    const clientsResult = await db.query(`
        SELECT * 
        FROM clients
        WHERE user_id = $1
        ORDER BY company_name ASC
    `,
        [userId]
    );
    const clients = clientsResult.rows;

    const jobsResult = await db.query(
    `
        SELECT jobs.*, clients.company_name
        FROM jobs
        JOIN clients ON jobs.client_id = clients.id
        LEFT JOIN invoices ON invoices.job_id = jobs.id
        WHERE jobs.user_id = $1 
        AND invoices.job_id IS NULL
        ORDER BY clients.company_name ASC, jobs.title ASC
        `, 
        [userId]
    );
    const jobs = jobsResult.rows

    // get last invoice for this user
    const lastInvoice = await db.query(
            `
            SELECT invoice_number
            FROM invoices
            WHERE user_id = $1
            ORDER BY invoice_number DESC
            LIMIT 1
            `,
            [userId]
    );

    // extract number
    let nextNumber = 1;
    if (lastInvoice.rows.length > 0) {
        const last = lastInvoice.rows[0].invoice_number;
        const lastNumber = parseInt(last.split("-")[1], 10);
        nextNumber = lastNumber + 1;
    }

    // format: INV-001
    const invoiceNumber = `INV-${String(nextNumber).padStart(3, "0")}`;

    async function handleSubmit(rawFormData) {
    "use server";   

        const {
            user_id,
            invoice_number, 
            job_id,
            amount,
            status,
            date_issued,
            due_date,
        } = Object.fromEntries(rawFormData)

        const dateIssued = date_issued || null
        const dueDate = due_date || null
        const amountCharged = amount || null

        await db.query(
            `
            INSERT INTO invoices (user_id, invoice_number, job_id, amount, status, date_issued, due_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, 
            [userId, invoiceNumber, job_id, amountCharged,  status, dateIssued, dueDate]
        )

        revalidatePath("/freelancer")
        redirect("/freelancer")
    }

    return (
        <InvoicesForm 
            action={handleSubmit}
            clients={clients}
            jobs={jobs}
            invoiceNumber={invoiceNumber}
        />
    )
}