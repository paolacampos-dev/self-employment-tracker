"use client"

import styles from "./page.module.css";
import { formatDateForInput } from "@/utils/dateHelpers.js";
import { expenseCategoryOptions } from "@/utils/expenseCategories";
import FormButton from "./FormButton";
import { useState } from "react";


export default function ExpensesForm({ action, expense, jobs, clients})    {
    const [selectedClientId, setSelectedClientId] = useState(expense?.client_id? String(expense.client_id) : "")
    const filteredJobs = jobs.filter((job) => String(job.client_id) === selectedClientId)
    return(
        <div className="py-0">
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
                            onChange={(e) => setSelectedClientId(e.target.value)}
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
                        {filteredJobs.map((job) => (
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
                <div className={styles.formLabel}>
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
                        <div className="relative">
                            <span className="absolute left-3 top-0 bottom-0 flex items-center text-gray-500 pointer-events-none">
                                £
                            </span>
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                step="0.01"
                                defaultValue={expense?.amount || ""}
                                className={styles.formInput}
                                style={{ paddingLeft: "1.75rem" }}
                            />
                        </div>
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

                <FormButton>
                {expense ? "Update Expense" : "Save Expense"}
                </FormButton>
        </form>
        </div>
    </div>
    );
}


