import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { formatDateForDisplay } from "@/utils/dateHelpers";
import Link from "next/link";

export default async function ExpensesPage() {
    const { userId } = await auth();

    const result = await db.query(
        `
        SELECT expenses.*, jobs.title, clients.company_name
        FROM expenses
        JOIN jobs ON expenses.job_id = jobs.id
        JOIN clients ON jobs.client_id = clients.id
        WHERE expenses.user_id = $1
        ORDER BY expenses.date DESC NULLS LAST
        `, 
        [userId]
    );
    const expenses = result.rows;

    return (
        <div className="app-page-spacing">
            <div className="app-card">
                <h1 className="text-xl font-bold mb-4 underline">Expenses</h1>

                {expenses.length === 0 ? (
                    <p>No expenses yet.</p>
                ) : (
                    <ul className="app-list">
                        {expenses.map((expense) => (
                            <li key={expense.id} className="app-card flex justify-between items-center">
                                <div>
                                    <p>{expense.company_name}</p>
                                    <p>{expense.title}</p>
                                    <p className="font-bold">{expense.concept}</p>
                                    <p>{expense.category}</p>
                                    <p>£{expense.amount}</p>
                                    <p>{formatDateForDisplay(expense.date)}</p>
                                </div>
                                <div>
                                    <Link
                                        href={`/freelancer/expenses/${expense.id}`}
                                        className="app-button app-button-sm"
                                    >
                                    View
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
        </div>
    );
}