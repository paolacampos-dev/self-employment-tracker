import { db } from "@/utils/dbConnection";
import Link from "next/link";
import DeleteClientButton from "@/components/deleteButton/DeleteClientButton.jsx";

export default async function ClientId({ params }) {
    const { clientId } = await params;

    const query = await db.query(`SELECT * FROM clients WHERE id = $1`, 
        [
        clientId,
        ]);

    const data = query.rows[0];



    return (
    <>
        <div>
            <h1>{data.company_name}</h1>
            <h2>{data.url}</h2>
            <h3>{data.description}</h3>
            <div>
                <p>{data.contact_name}</p>
                <p>{data.contact_role}</p>
                <p>{data.phone_number}</p>
                <p>{data.email}</p>
                <p>{data.address}</p>
            </div> 

            <Link href={`/freelancer/clients/${data.id}/edit`}>
            Edit
            </Link>

            <DeleteClientButton id={data.id} />
        </div>
    </>
    );
}
