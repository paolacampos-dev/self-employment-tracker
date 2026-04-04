import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import InvoiceForm from "@/components/forms/InvoiceForm";
import { UpdateInvoice } from "@/actions/update/updateInvoice";
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function EditInvoice({ params })   {
    const { userId } = await auth()
    const { invoiceId } = await params

    const query = await db.query(
        `
        SELECT 
            invoices.*,
            jobs.client_id
        FROM invoices
        JOIN jobs ON invoices.job_id = jobs.id
        WHERE invoices.id = $1 
        AND invoices.user_id = $2
        `,
        [invoiceId, userId]
    )
    const invoice = query.rows[0]

    const jobsResult = await db.query(
        `
        SELECT
            jobs.id,
            jobs.title,
            jobs.job_details,
            jobs.client_id
        FROM jobs
        WHERE jobs.user_id = $1
        `,
        [userId]
    )
    const jobs = jobsResult.rows

    const clientsResult = await db.query(
        `
        SELECT 
            id, 
            company_name
        FROM clients
        WHERE user_id = $1
        `,
        [userId]
    )

const clients = clientsResult.rows

    return (
        <>
        < PageWrapper backHref={`/freelancer/invoices/${invoiceId}`} className="px-1 md:px-11">
            <CardSection useCard={false}>
                <InvoiceForm 
                    action={UpdateInvoice} 
                    jobs={jobs}
                    invoice={invoice}
                    clients={clients}
                />
            </CardSection>
        </PageWrapper>
        </>
    )


}