export default function ClientForm({ action, client }) {
    return (
        <div className="app-page-spacing">
            <div className="app-card">
                <h1 className="text-lg sm:text-xl font-bold text-center mb-2">
                {client ? "Edit Client" : "New Client"}
                </h1>

        <form action={action}>
            <div>
                {client?.id && (
                <input type="hidden" name="id" value={client.id} />
                )}

                <div className="form-label">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        name="company_name"
                        defaultValue={client?.company_name || ""}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="contactName">Contact Name</label>
                    <input
                        type="text"
                        name="contact_name"
                        defaultValue={client?.contact_name || ""}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="contactRole">Contact Role</label>
                    <input
                        type="text"
                        name="contact_role"
                        defaultValue={client?.contact_role || ""}
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        defaultValue={client?.phone_number || ""}
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        defaultValue={client?.email || ""}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="url">Website</label>
                    <input
                        type="text"
                        name="url"
                        defaultValue={client?.url || ""}
                        required
                        placeholder="copy and paste a url"
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        defaultValue={client?.description || ""}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        defaultValue={client?.address || ""}
                        required
                        className="form-input"
                    />
                </div>

                <button className="app-button">
                {client ? "Update Client" : "Save Client"}
                </button>
            </div>
        </form>
        </div>
    </div>
    );
}