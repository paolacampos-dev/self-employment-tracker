"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteInvoice(formData) {
    const { userId } = await auth();
    const id = formData.get("id");

    await db.query(`
        DELETE FROM invoices WHERE id = $1 AND user_id = $2
        `,
        [id, userId]
    );
    revalidatePath("/freelancer/invoices");
    redirect("/freelancer/invoices");
}