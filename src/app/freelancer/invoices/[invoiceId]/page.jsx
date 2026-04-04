import { db } from "@/utils/dbConnection";
import DeleteInvoice from "@/actions/delete/deleteInvoice"
import CrudActions from "@/components/CrudActions";
import { formatDateForDisplay } from "@/utils/dateHelpers";
import { auth } from "@clerk/nextjs/server";
import { GetInvoiceStatus } from "@/utils/statusOptions"
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function InvoiceId({ params }) {
    const { userId } = await auth()
    const { invoiceId } = await params;

    /*just selecting invoices info -> SELECT * FROM invoices WHERE id = $1 AND user_id = $2*/
    const query = await db.query(
        `
        SELECT 
            invoices.*, 
            jobs.title AS job_title, 
            clients.company_name
        FROM invoices
        JOIN jobs ON invoices.job_id = jobs.id
        JOIN clients ON jobs.client_id = clients.id
        WHERE invoices.id = $1
        AND invoices.user_id = $2
        `,
        [invoiceId, userId]
    );
    const invoice = query.rows[0];
    const status = GetInvoiceStatus(invoice);

    return (
    <>
        <PageWrapper backHref={"/freelancer/invoices"}>
            <CardSection>            
                    <p className="font-bold text-sm text-gray-500 mb-0">{invoice.invoice_number}</p>
                    <p className={status.className}>{status.label}</p>
                <h2 className="text-xl underline mt-7">{invoice.company_name}</h2>
                <h3 className="text-xl font-bold">{invoice.job_title}</h3>
                <hr className="card-divider"></hr>
                <div className="app-details">
                    <p>{invoice.job_details}</p>
                    <p className="font-bold">£ {invoice.amount}</p>
                    <p>Date issued: {formatDateForDisplay(invoice.date_issued)}</p>
                    <p className="font-bold text-red-700">Due date: {formatDateForDisplay(invoice.due_date)}</p>
                </div> 

                <CrudActions
                    editHref={`/freelancer/invoices/${invoice.id}/edit`}
                    deleteAction={DeleteInvoice}
                    id={invoice.id}
                    message="Are you sure you want to delete this Invoice?"
                />
            </CardSection>
        </PageWrapper>
    </>
    );
}
