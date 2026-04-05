import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { formatDateForDisplay } from "@/utils/dateHelpers";
import { getExpenseCategoryLabel } from "@/utils/expenseCategories";
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
                {expenses.length === 0 ? (
                    <div className="text-center py-8">
                        <h2 className="text-lg font-semibold mb-2">
                            No expenses yet
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Create your first expense to start managing your workload.
                        </p>

                    <Link
                        href="/freelancer/new/expense"
                        className="app-button"
                    >
                        + New Expense
                    </Link>
                </div>
                ) : (
                    <div>
                        <h1 className="text-xl font-bold mb-4 underline">Expenses</h1>
                        <ul className="app-list">
                            {expenses.map((expense) => (
                                <li key={expense.id} className="app-card flex justify-between items-center">
                                    <Link
                                        href={`/freelancer/expenses/${expense.id}`}
                                        className="flex-1 block"
                                    >
                                        <p>{expense.company_name}</p>
                                        <p>{expense.title}</p>
                                        <p className="font-bold">{expense.concept}</p>
                                        <p className="break-words">{getExpenseCategoryLabel(expense.category)}</p>
                                        <p>£{expense.amount}</p>
                                        <p>{formatDateForDisplay(expense.date)}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}