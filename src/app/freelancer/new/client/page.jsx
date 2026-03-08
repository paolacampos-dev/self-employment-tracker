import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"
import ClientForm from "@/components/forms/ClientForm"
// import { currentUser, userId } from "@clerk/nextjs/server"


export default function NewClient()   {
    async function handleSubmit(rawFormData) {
    "use server";
    const { userId } = await auth()
    
    if (!userId) {
    throw new Error("Unauthorized")
    }
    console.log(rawFormData);

    // The "name" property in the input form -> needs to macth the column name in the DB:
    const { company_name, contact_name, contact_role, phone_number, email, url, description, address } = Object.fromEntries(rawFormData);

    await db.query(
        `INSERT INTO clients (user_id, company_name, contact_name, contact_role, phone_number, email, url, description, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
        userId,
        company_name,
        contact_name,
        contact_role,
        phone_number,
        email,
        url,
        description,
        address,
        ]

    //TODO: REFACTOR from:
    /*1.
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

    
        const {
            company_name: companyName,
            contact_name: contactName,
            contact_role: contactRole,
            phone_number: phoneNumber,
            email,
            url: website,
            description,
            address,
        } = Object.fromEntries(rawFormData);

        await db.query(
            `INSERT INTO clients (user_id, company_name, contact_name, contact_role, phone_number, email, url, description, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
            ],*/
    );
    revalidatePath("/freelancer/clients");
    redirect("/freelancer/clients");
    }
    return (
        <>
        <ClientForm action={handleSubmit} />
        </>
    );
}
