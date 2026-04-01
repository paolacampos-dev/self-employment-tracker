"use client"

import styles from "./page.module.css"
import { formatDateForInput } from "@/utils/dateHelpers.js";
import { useState } from "react";

export default function EventsForm({ action, jobs, event }) {
    const [selectedJobId, setSelectedJobId] = useState(
        event?.job_id ? String(event.job_id) : ""
    );

    const selectedJob = jobs.find(
        (job) => String(job.id) === selectedJobId
    );

    return (
    <div className="app-page-spacing">
        <div className="app-card">
            <h1 className="text-lg sm:text-xl mb-2">
            {event ? "Edit Event" : "New Event"}
            </h1>

            <form action={action}>
            {event?.id && (
                <input type="hidden" name="id" value={event.id} />
            )}

            {/* Title */}
            <div className={styles.formLabel}>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={event?.title || ""}
                    required
                    className={styles.formInput}
                />
            </div>

            {/* Job (with company name) */}
            <div className={styles.formLabel}>
                <label htmlFor="job_id">Job:</label>
                <select
                    id="job_id"
                    name="job_id"
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className={styles.formInput}
                >
                <option value="">No linked job</option>

                {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                    {job.company_name} — {job.title}
                </option>
                ))}
                </select>
            </div>

            {/* Optional job preview */}
            {selectedJob && (
            <div className={styles.formLabel}>
                <label>Job details:</label>
                <textarea
                    value={selectedJob.job_details || ""}
                    readOnly
                    rows={3}
                    className={styles.formInput}
                />
            </div>
            )}

            {/* Start datetime */}
            <div className={styles.formLabel}>
                <label htmlFor="start_datetime">Start:</label>
                <input
                    id="start_datetime"
                    type="datetime-local"
                    name="start_datetime"
                    defaultValue={formatDateForInput(event?.start_datetime)}
                    required
                    className={styles.formInput}
                />
            </div>

            {/* End datetime */}
            <div className={styles.formLabel}>
                <label htmlFor="end_datetime">End:</label>
                <input
                    id="end_datetime"
                    type="datetime-local"
                    name="end_datetime"
                    defaultValue={formatDateForInput(event?.end_datetime)}
                    className={styles.formInput}
                />
            </div>

            {/* Notes */}
            <div className={styles.formLabel}>
                <label htmlFor="notes">Notes:</label>
                <textarea
                    id="notes"
                    name="notes"
                    defaultValue={event?.notes || ""}
                    rows={4}
                    className={styles.formInput}
                />
            </div>

            {/* Submit */}
            <button className="app-button">
                {event ? "Update Event" : "Save Event"}
            </button>
            </form>
        </div>
    </div>
    );
}

