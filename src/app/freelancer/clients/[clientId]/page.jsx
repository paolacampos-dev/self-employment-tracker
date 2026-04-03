import { db } from "@/utils/dbConnection";
import DeleteClient from "@/actions/delete/deleteClient";
import CrudActions from "@/components/CrudActions";
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function ClientId({ params }) {
    const resolvedParams = await params
    const { clientId } = resolvedParams;

    const query = await db.query(
        `
        SELECT * 
        FROM clients 
        WHERE id = $1
        `, 
        [
        clientId,
        ]
    );
    const data = query.rows[0];

    return (
    <>
        <PageWrapper 
            backHref="/freelancer/clients/" 
            wrapperClass="px-6 max-w-xl sm:max-w-2xl mx-auto"
        >
            <CardSection>
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
            </CardSection>
        </PageWrapper>
    </>
    );
}
