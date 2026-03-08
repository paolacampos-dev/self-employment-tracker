import { db } from "@/utils/dbConnection";
import DeleteClient from "@/actions/delete/deleteClient";
import CrudActions from "@/components/CrudActions";

export default async function ClientId({ params }) {
    const { clientId } = await params;

    const query = await db.query(`SELECT * FROM clients WHERE id = $1`, 
        [
        clientId,
        ]);

    const data = query.rows[0];



    return (
    <>
        <div className="px-6 py-6 max-w-xl mx-auto">
            <div className="app-card">
                <div className="app-card-content">
                    <h1>{data.company_name}</h1>
                    <h2>{data.url}</h2>
                    <h3 className="description-details">{data.description}</h3>
                    <hr className="card-divider"></hr>

                    <div className="app-details">
                        <p>{data.contact_name}</p>
                        <p>{data.contact_role}</p>
                        <p>{data.phone_number}</p>
                        <p>{data.email}</p>
                        <p>{data.address}</p>
                    </div> 

                    <CrudActions
                        editHref={`/freelancer/clients/${data.id}/edit`}
                        deleteAction={DeleteClient}
                        id={data.id}
                        message="Are you sure you want to delete this client?"
                    />
                </div>
            </div>
        </div>
    </>
    );
}
