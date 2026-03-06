import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth} from "@clerk/nextjs/server"
// import { currentUser, userId } from "@clerk/nextjs/server"


export default function NewClientPage()   {
    async function handleSubmit(rawFormData) {
    "use server";
    const { userId } = await auth()
    
    if (!userId) {
    throw new Error("Unauthorized")
    }

    
    // console.log(rawFormData);
    const formValues =  {
        companyName:rawFormData.get("company_name"),
        contactName:rawFormData.get("contact_name"),
        contactRole:rawFormData.get("contact_role"),
        phoneNumber:rawFormData.get("phone_number"),
        email:rawFormData.get("email"),
        website:rawFormData.get("url"),
        description:rawFormData.get("description"),
        address:rawFormData.get("address"),
    }
    console.log(formValues);

    //refactor our formValues
    // const { company_name, contact_name, contact_role, phone_number, email, url, description, address } = {
    //   companyName: rawFormData.get("company_name"),
    //   contactName: rawFormData.get("contact_name"),
    //   contact_role: rawFormData.get("contact_role"),
    //   website: rawFormData.get("url"),
    // ...
    // };
    // console.log(formValues);
    // const formValues = Object.fromEntries(rawFormData);
    // const { company_name, contact_name, contact_role, phone_number, email, url, description, address } = Object.fromEntries(rawFormData);

    db.query(
        `INSERT INTO clients (user_id, Company_name, contact_name, contact_role, phone_number, email, url, description, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
        userId,
        formValues.companyName,
        formValues.contactName,
        formValues.contactRole,
        formValues.phoneNumber,
        formValues.email, 
        formValues.website, 
        formValues.description, 
        formValues.address
        ],
    );
    revalidatePath("/clients");
    redirect("/freelancer");
    }
    return (
        <>
        <div className="px-1 py-1 sm:px-6 sm:py-8">
            <div className="w-full max-w-2xl rounded-xl border bg-white p-3 shadow sm:mx-auto sm:p-6">
                <h1 className="text-lg sm:text-xl font-bold text-center mb-2">New Client</h1>
                <form action={handleSubmit}>
                    <div>
                        <div className="flex flex-col  mb-3 sm:mb-6">
                            <label htmlFor="companyName">Company Name</label> 
                            <input 
                                type="text" 
                                name="company_name" 
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                                />
                        </div>
                        <div className="flex flex-col mb-3 sm:mb-6">
                            <label htmlFor="contact_name">Contact Name</label> 
                            <input 
                                type="text" 
                                name="contactName"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none" 
                                />
                        </div>
                        <div className="flex flex-col mb-3 sm:mb-6">
                            <label htmlFor="contact_role">Contact Role</label> 
                            <input 
                                type="text" 
                                name="contactRole"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                                />
                        </div>
                        <div className="flex flex-col mb-3 sm:mb-6">
                            <label htmlFor="phone_number">Phone Number</label> 
                            <input 
                                type="text" 
                                name="phoneNumber"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                                />
                        </div>
                        <div className="flex flex-col mb-3 sm:mb-6">
                            <label htmlFor="email">Email</label> 
                            <input 
                                type="text" 
                                name="email" 
                                required 
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                            />
                        </div>
                        <div className="flex flex-col mb-3 sm:mb-6">
                            <label htmlFor="url">Website</label> 
                            <input 
                                type="text" 
                                name="website" 
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
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                                />
                        </div>
                        <div className="flex flex-col mb-3 sm:mb-6">
                            <label htmlFor="address">Address</label> 
                            <input 
                                type="text" 
                                name="address" 
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[var(--Sun)] focus:ring-2 focus:ring-[var(--Sun)]/30 outline-none"
                                />
                        </div>
                        <button className="block mx-auto border border-[var(--bgExpr)] text-white bg-[var(--bgOrange)] text-center font-bold px-4 py-2 rounded-md">
                        Save Client
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

// async function NewClient(formData: FormData)
// const name =formDataget