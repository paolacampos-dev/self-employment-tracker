"use client"

import styles from "./page.module.css"
import { formatDateForInput } from "@/utils/dateHelpers.js";
import { useState } from "react";

export default function InvoicesForm({ action, jobs, clients, invoice, invoiceNumber })    {
const [selectedClientId, setSelectedClientId]  = useState (invoice?.client_id?String(invoice.client_id) : "")

const [selectedJobId, setSelectedJobId] = useState(invoice?.job_id ? String(invoice.job_id) : "")
const filteredJobs = jobs.filter((job) => String(job.client_id) === selectedClientId)
const selectedJob = filteredJobs.find((job) => String(job.id) === selectedJobId)

return(
    <div className="app-page-spacing">
            <div className="app-card">
                <h1 className="text-lg sm:text-xl mb-2">
                {invoice ? "Edit Invoice" : "New Invoice"}
                </h1>
            <form action={action}> 
                {invoice?.id && (
                <input type="hidden" name="id" value={invoice.id} />
            )}

                <div className={styles.formLabel}>
                    <label htmlFor="invoice_number">Invoice number:</label>
                    <input
                        type="text"
                        name="invoice_number"
                        value={invoice?.invoice_number || invoiceNumber}
                        readOnly
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="status">Status:</label>
                    <select
                            id="status"
                            name="status"
                            defaultValue={invoice?.status || ""}
                            required
                            className={styles.formInput}
                        >
                        <option value="" disabled>Select status:</option>
                            <option value= "Draft">Draft</option>
                            <option value="Sent">Sent</option>
                            <option value="Paid">Paid</option>
                    </select>
                </div>
                <div className={styles.formLabel}>
                    <label htmlFor="clients_id">Client:</label>
                        <select
                            id="client_id"
                            value={selectedClientId}
                            onChange={(e) => {
                                setSelectedClientId(e.target.value);
                                setSelectedJobId("");
                            }}
                            readOnly
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
                            id="job_id"
                            name="job_id"
                            value={selectedJobId}
                            onChange={(e) => setSelectedJobId(e.target.value)}
                            readOnly
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
                    <label htmlFor="job_details"> Job details:</label>
                        <textarea
                            id="job_details"
                            value={invoice?.job_details || selectedJob?.job_details || ""}
                            readOnly
                            className={styles.formInput}
                            rows={4}
                        />
                </div>
                
                <div className={styles.formLabel}>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        name="amount"
                        step="0.01"
                        min="0"
                        defaultValue={invoice?.amount || ""}
                        className={styles.formInput} 
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="date_issued">Date Issued:</label>
                    <input
                        id="date_issued"
                        type="date"
                        name="date_issued"
                        defaultValue={formatDateForInput(invoice?.date_issued)}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="due_date"> Due date:</label>
                    <input
                        id="due_date"
                        type="date"
                        name="due_date"
                        defaultValue={formatDateForInput(invoice?.due_date)}
                        className={styles.formInput}
                    />
                </div>

                <button className="app-button">
                {invoice ? "Update Invoice" : "Save Invoice"}
                </button>
        </form>
        </div>
    </div>
    );
}





