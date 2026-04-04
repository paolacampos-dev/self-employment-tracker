import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import ExpensesForm from "@/components/forms/ExpensesForm";
import { UpdateExpense } from "@/actions/update/updateExpense";
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function EditExpense ({ params })  {
    const { userId } = await auth();
    const resolvedParams = await params;
    //the param has to be called the same name as the dynamic route [expenseId] -> expenseId
    const { expenseId } = resolvedParams;

    const expenseQuery = await db.query(
        `
        SELECT expenses.*, jobs.client_id
        FROM expenses
        JOIN jobs ON expenses.job_id = jobs.id
        WHERE expenses.id = $1 AND expenses.user_id = $2
        `, 
        [expenseId, userId]
    )
    const expense = expenseQuery.rows[0]

    const jobsQuery = await db.query(
        `
        SELECT * FROM jobs 
        WHERE user_id = $1
        ORDER BY title ASC
        `,
        [userId]
    );
    const jobs = jobsQuery.rows

    const clientQuery = await db.query(
        `
        SELECT id, company_name 
        FROM clients 
        WHERE user_id = $1
        ORDER BY company_name
        `,
        [userId]
    )
    const clients = clientQuery.rows

    console.log("params:", params)
    console.log("expenseQuery rows:", expenseQuery.rows)
    console.log("expense:", expense)
    console.log("jobs:", jobs)
    console.log("clients:", clients)

    return(
        <>
            <PageWrapper backHref={`/freelancer/expenses/${expenseId}`} className="px-1 md:px-11">
                <CardSection useCard={false}>
                    <ExpensesForm 
                        action={UpdateExpense} 
                        expense={expense} 
                        jobs={jobs} 
                        clients={clients}
                    />
                </CardSection>
            </PageWrapper>
        </>
    )
}
