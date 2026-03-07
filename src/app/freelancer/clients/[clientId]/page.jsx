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
        <div className="app-card ">
            <div className="app-card-content">
                <h1>{data.company_name}</h1>
                <h2>{data.url}</h2>
                <h3 className="description-details">{data.description}</h3>

                <div className="app-details">
                    <p>{data.contact_name}</p>
                    <p>{data.contact_role}</p>
                    <p>{data.phone_number}</p>
                    <p>{data.email}</p>
                    <p>{data.address}</p>
                </div> 
            </div>

            <div className="crud-wrapper">
                <div className="crud-actions">
                    <div className="edit-btn-wrapper"> 
                        <Link href={`/freelancer/clients/${data.id}/edit`}className="app-button">Edit</Link>
                    </div> 
                    <DeleteClientButton id={data.id} />
                </div>
            </div>    
        </div>
    </>
    );
}
