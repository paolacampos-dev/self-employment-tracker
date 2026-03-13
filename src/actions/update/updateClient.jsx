"use server";

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function UpdateClient(rawFormData) {
    const { userId } = await auth();

    if (!userId) {
    throw new Error("Unauthorized");
    }

    const id = rawFormData.get("id");

    const formValues = {
        companyName: rawFormData.get("company_name"),
        contactName: rawFormData.get("contact_name"),
        contactRole: rawFormData.get("contact_role"),
        phoneNumber: rawFormData.get("phone_number"),
        email: rawFormData.get("email"),
        website: rawFormData.get("url"),
        description: rawFormData.get("description"),
        address: rawFormData.get("address"),
    };

    await db.query(
        `UPDATE clients
            SET company_name = $1,
            contact_name = $2,
            contact_role = $3,
            phone_number = $4,
            email = $5,
            url = $6,
            description = $7,
            address = $8
            WHERE id = $9 AND user_id = $10`,
        [
        formValues.companyName,
        formValues.contactName,
        formValues.contactRole,
        formValues.phoneNumber,
        formValues.email,
        formValues.website,
        formValues.description,
        formValues.address,
        id,
        userId,
        ]
    );

    revalidatePath(`/freelancer/clients/${id}`);
    revalidatePath(`/freelancer/clients`);
    redirect(`/freelancer/clients/${id}`);
    }