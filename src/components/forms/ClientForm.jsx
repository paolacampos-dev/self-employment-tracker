export default function ClientForm({ action, client }) {
    return (
        <div className="px-1 py-1 sm:px-6 sm:py-8">
            <div className="w-full max-w-2xl rounded-xl border bg-white p-3 shadow sm:mx-auto sm:p-6">
                <h1 className="text-lg sm:text-xl font-bold text-center mb-2">
                {client ? "Edit Client" : "New Client"}
                </h1>

        <form action={action}>
            <div>
                {client?.id && (
                <input type="hidden" name="id" value={client.id} />
                )}

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        name="company_name"
                        defaultValue={client?.company_name || ""}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="contactName">Contact Name</label>
                    <input
                        type="text"
                        name="contact_name"
                        defaultValue={client?.contact_name || ""}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="contactRole">Contact Role</label>
                    <input
                        type="text"
                        name="contact_role"
                        defaultValue={client?.contact_role || ""}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        defaultValue={client?.phone_number || ""}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        defaultValue={client?.email || ""}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="url">Website</label>
                    <input
                        type="text"
                        name="url"
                        defaultValue={client?.url || ""}
                        required
                        placeholder="copy and paste a url"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        defaultValue={client?.description || ""}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <div className="flex flex-col mb-3 sm:mb-6">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        defaultValue={client?.address || ""}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                    />
                </div>

                <button className="block mx-auto border border-[var(--bgExpr)] text-white bg-[var(--bgOrange)] text-center font-bold px-4 py-2 rounded-md">
                {client ? "Update Client" : "Save Client"}
                </button>
            </div>
        </form>
        </div>
    </div>
    );
}