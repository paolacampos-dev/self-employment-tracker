import styles from "./page.module.css";


export default function ClientForm({ action, client }) {
    return (
        <div className="app-page-spacing">
            <div className="app-card">
                <h1 className="text-lg sm:text-xl mb-2">
                {client ? "Edit Client" : "New Client"}
                </h1>

        <form action={action}>
            {client?.id && (
                <input type="hidden" name="id" value={client.id} />
            )}

                <div className={styles.formLabel}>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        name="company_name"
                        defaultValue={client?.company_name || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="contactName">Contact Name:</label>
                    <input
                        type="text"
                        name="contact_name"
                        defaultValue={client?.contact_name || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="contactRole">Contact Role:</label>
                    <input
                        type="text"
                        name="contact_role"
                        defaultValue={client?.contact_role || ""}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        defaultValue={client?.phone_number || ""}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        defaultValue={client?.email || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="url">Website</label>
                    <input
                        type="text"
                        name="url"
                        defaultValue={client?.url || ""}
                        required
                        placeholder="copy and paste a url"
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                        defaultValue={client?.description || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formLabel}>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        defaultValue={client?.address || ""}
                        required
                        className={styles.formInput}
                    />
                </div>

                <button className="app-button">
                {client ? "Update Client" : "Save Client"}
                </button>
        </form>
        </div>
    </div>
    );
}