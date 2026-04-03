import { db } from "@/utils/dbConnection";
import ClientForm from "@/components/forms/ClientForm.jsx";
import { UpdateClient } from "@/actions/update/updateClient";
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

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
        <PageWrapper backHref={`/freelancer/clients/${clientId}`} className="px-1 md:px-11">
            <CardSection useCard={false}>
                <ClientForm 
                    action={UpdateClient} 
                    client={client} 
                />;
            </CardSection>
        </PageWrapper>
    </>
    )
}