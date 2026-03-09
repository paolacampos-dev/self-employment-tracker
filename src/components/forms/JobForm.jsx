import styles from "./page.module.css";
import { formatDateForInput } from "@/utils/dateHelpers.js";

export default function JobForm({ action, job, clients })    {
    return(
        <div className="app-page-spacing">
            <div className="app-card">
                <h1 className="text-lg sm:text-xl mb-2">
                {job ? "Edit Job" : "New Job"}
                </h1>
            <form action={action}> 
                {job?.id && (
                <input type="hidden" name="id" value={job.id} />
            )}
                <div className={styles.formLabel}>
                    <label htmlFor="clients_id">Client:</label>
                        <select
                            name="client_id"
                            defaultValue={job?.client_id || ""}
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
                    <label htmlFor="jobTitle">Job title:</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={job?.title || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="jobDetails">Job details:</label>
                    <input
                        type="text"
                        name="job_details"
                        defaultValue={job?.job_details || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="status">Status:</label>
                    <select
                            name="status"
                            defaultValue={job?.status || ""}
                            required
                            className={styles.formInput}
                        >
                        <option value="" disabled>Select status:</option>
                            <option className="text-blue-600 font-bold" value="in_progress">InProgress</option>
                            <option className="text-green-600 font-bold" value="live">Live</option>
                            <option className="font-bold" value="completed">Completed</option>
                            <option className="text-red-600 font-bold" value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="startDate">Start date:</label>
                    <input
                        type="date"
                        name="start_date"
                        defaultValue={formatDateForInput(job?.start_date)}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="deadline">Deadline:</label>
                    <input
                        type="date"
                        name="deadline"
                        defaultValue={formatDateForInput(job?.deadline)}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="hoursExpected">Hours expected:</label>
                    <input
                        type="number"
                        name="hours_expected"
                        defaultValue={job?.hours_expected || ""}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="hoursWorked">Hours Worked:</label>
                    <input
                        type="number"
                        name="hours_worked"
                        defaultValue={job?.hours_worked || ""}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="hourlyRate">Hourly rate:</label>
                    <input
                        type="number"
                        name="hourly_rate"
                        defaultValue={job?.hourly_rate || ""}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={job?.price || ""}
                        className={styles.formInput}
                    />
                </div>

                <button className="app-button">
                {job ? "Update Job" : "Save Job"}
                </button>
        </form>
        </div>
    </div>
    );
}

