import { db } from "@/utils/dbConnection";
import DeleteExpense from "@/actions/delete/deleteExpense"
import CrudActions from "@/components/CrudActions";
import { formatDateForDisplay } from "@/utils/dateHelpers";
import { getExpenseCategoryLabel } from "@/utils/expenseCategories";
import { auth } from "@clerk/nextjs/server";
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function ExpenseId({ params }) {
    const { userId } = await auth()
    const { expenseId } = await params;

    /*just selecting expenses info -> SELECT * FROM expenses WHERE id = $1 AND user_id = $2*/

    const query = await db.query(
        `
        SELECT expenses.*, jobs.title, clients.company_name
        FROM expenses
        JOIN jobs ON expenses.job_id = jobs.id
        JOIN clients ON jobs.client_id = clients.id
        WHERE expenses.id = $1
        AND expenses.user_id = $2
        `,
        [expenseId, userId]
    );
    const data = query.rows[0];
    console.log(data)

    return (
    <>
        <PageWrapper backHref={"/freelancer/expenses"}>
            <CardSection>            
                <h1 className="font-semibold text-sm text-gray-500 underline">{data.company_name}</h1>
                <h2 className="text-xl font-bold">{data.title}</h2>
                <hr className="card-divider"></hr>
                <div className="app-details">
                    <p>{data.concept}</p>
                    <p>{getExpenseCategoryLabel(data.category)}</p>
                    <p>£ {data.amount}</p>
                    <p>{formatDateForDisplay(data.date)}</p>
                </div> 

                <CrudActions
                    editHref={`/freelancer/expenses/${data.id}/edit`}
                    deleteAction={DeleteExpense}
                    id={data.id}
                    message="Are you sure you want to delete this Expense?"
                />
            </CardSection>
        </PageWrapper>
    </>
    );
}
