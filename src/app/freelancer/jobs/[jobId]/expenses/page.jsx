import { db } from "@/utils/dbConnection"
import { auth } from "@clerk/nextjs/server"
import { formatDateForDisplay } from "@/utils/dateHelpers"
import BackButton from "@/components/buttons/BackButton";

export default async function JobExpense({ params })  {
    const { userId } = await auth();
    const { jobId } = await params;

    const expensesQuery = await db.query(
        `
        SELECT expenses.*, clients.company_name
        FROM expenses
        JOIN jobs ON expenses.job_id = jobs.id
        JOIN clients ON jobs.client_id = clients.id
        WHERE expenses.job_id = $1
        AND expenses.user_id = $2
        ORDER BY expenses.date DESC
        `,
        [jobId, userId]
    )
    const expenses = expensesQuery.rows
    const totalExpenses = expenses.reduce((sum, expense) => {
        return sum + Number(expense.amount);
    }, 0);

    return(
        <>
        <BackButton href={`/freelancer/jobs`} />
        <div className="app-card"> 
            <h1 className="card-title underline">EXPENSES:</h1>
            <p className="text-sm text-center opacity-70 mb-5">{expenses[0]?.company_name}</p>
                {expenses.map((expense) => (
                    <div key={expense.id}> 
                        <p>{expense.concept}</p>
                        <p className="font-semibold">£{expense.amount}</p> 
                        <p>{formatDateForDisplay(expense.date)}</p>
                        <hr className="py-2"></hr>
                    </div>
                ))}
                <div>
                    <p className="font-bold mt-4 text-lg">
                        Total: £{totalExpenses.toFixed(2)}
                    </p>
                </div>
        </div> 
        </>
    ); 
}
