import { GetInvoiceStatus } from "@/utils/statusOptions"
import { invoiceSortOptions, invoiceSelectOptions } from "@/utils/sortOptions";
import SortSelect from "@/components/SortSelect";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { formatDateForDisplay } from "@/utils/dateHelpers";

export default async function InvoicesPage({ searchParams }) {
    const { userId } = await auth()

    const resolvedSearchParams = await searchParams
    const sort = resolvedSearchParams?.sort || ""
    const orderBy = invoiceSortOptions[sort] || "invoices.date_issued ASC";

    const invoicesResult = await db.query(
        `
        SELECT
            invoices.id,
            invoices.invoice_number,
            invoices.status,
            invoices.date_issued,
            invoices.due_date,
            invoices.amount,
            jobs.title AS job_title,
            jobs.job_details,
            clients.company_name
        FROM invoices
        JOIN jobs ON invoices.job_id = jobs.id
        JOIN clients ON jobs.client_id = clients.id
        WHERE invoices.user_id = $1
        ORDER BY ${orderBy}
        `,
        [userId]
    );

    const invoices = invoicesResult.rows

    return (
        <>
        <SortSelect options={invoiceSelectOptions} />

        <div className="app-card">
            {invoices.length === 0 ? (
                <div className="text-center py-8">
                    <h2 className="text-lg font-semibold mb-2">
                        No invoices yet
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Create your first invoice to start getting paid.
                    </p>

                    <Link
                        href="/freelancer/new/invoice"
                        className="app-button"
                    >
                        + New Invoice
                    </Link>
                </div>
            ) : (
                <div>
                    <h1 className="text-xl font-bold mb-4 underline">Invoices</h1>
                    <ul className="app-list">
                    {invoices.map((invoice) => {
                        const status = GetInvoiceStatus(invoice);

                        return (
                            <li key={invoice.id} className="app-card">
                                <h2>{invoice.invoice_number}</h2>

                                <p>{invoice.company_name}</p>
                                <p>{invoice.job_title}</p>
                                <p>{invoice.job_details}</p>

                                <p className={status.className}>
                                    {status.label}
                                </p>

                                <p>{invoice.amount}</p>
                                <p>{formatDateForDisplay(invoice.date_issued)}</p>
                                <p>{formatDateForDisplay(invoice.due_date)}</p>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                )
            }  
        </div> 
    </>
    );
}