import styles from "./page.module.css";
import { formatDateForInput } from "@/utils/dateHelpers.js";
import { expenseCategoryOptions } from "@/utils/expenseCategories";


export default function ExpensesForm({ action, expense, jobs, clients})    {
    return(
        <div className="app-page-spacing">
            <div className="app-card">
                <h1 className="text-lg sm:text-xl mb-2">
                {expense ? "Edit Expense" : "New Expense"}
                </h1>
            <form action={action}> 
                {expense?.id && (
                <input type="hidden" name="id" value={expense.id} />
            )}
                <div className={styles.formLabel}>
                    <label htmlFor="clients_id">Client:</label>
                        <select
                            name="client_id"
                            defaultValue={expense?.client_id || ""}
                            required
                            className={styles.formInput}
                        >
                        <option value="" disabled>Select Client:</option>
                        {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                        {client.company_name}
                        </option>
                        ))}
                        </select>
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="job_id">Job:</label>
                        <select
                            name="job_id"
                            defaultValue={expense?.job_id || ""}
                            required
                            className={styles.formInput}
                        >
                        <option value="" disabled>Select Job:</option>
                        {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                        {job.title}
                        </option>
                        ))}
                        </select>
                </div>
                
                <div className={styles.formLabel}>
                    <label htmlFor="concept">Expense Concept:</label>
                    <input
                        type="text"
                        name="concept"
                        defaultValue={expense?.concept || ""}
                        required
                        className={styles.formInput}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select 
                        name="category" 
                        defaultValue={expense?.category || ""}
                        className={styles.formInput} 
                        required>
                            <option value="">Select a category:</option>
                            {expenseCategoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                    </select>
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        defaultValue={expense?.amount || ""}
                        className={styles.formInput}
                    />
                </div>


                <div className={styles.formLabel}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        name="date"
                        defaultValue={formatDateForInput(expense?.date)}
                        className={styles.formInput}
                    />
                </div>

                <button className="app-button">
                {expense ? "Update Expense" : "Save Expense"}
                </button>
        </form>
        </div>
    </div>
    );
}


