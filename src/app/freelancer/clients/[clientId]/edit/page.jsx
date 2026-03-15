import { db } from "@/utils/dbConnection";
import ClientForm from "@/components/forms/ClientForm.jsx";
import { UpdateClient } from "@/actions/update/updateClient";
import BackButton from "@/components/buttons/BackButton";

export default async function EditClientPage({ params }) {
    const { clientId } = await params;

    const query = await db.query(
        `SELECT * 
        FROM clients 
        WHERE id = $1`,
        [clientId]
    );
    const client = query.rows[0];

    return (
    <>
        <BackButton href={`/freelancer/clients/${clientId}`} className=""/>
        <ClientForm action={UpdateClient} client={client} />;
    </>
    )
}