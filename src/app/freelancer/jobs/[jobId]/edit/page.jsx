import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import JobForm from "@/components/forms/JobForm.jsx";
import { UpdateJob } from "@/actions/update/updateJob.jsx";
import CardSection from "@/components/layout/CardSection";
import PageWrapper from "@/components/layout/PageWrapper";

export default async function EditJobPage({ params }) {
    const { userId } = await auth();
    const { jobId } = await params;

    const query = await db.query(
        `SELECT * 
        FROM jobs 
        WHERE id = $1 AND  user_id = $2`,
        [jobId, userId]
    );
    const job = query.rows[0];

    const clientsResult = await db.query(
        `SELECT id, company_name 
        FROM clients 
        WHERE user_id = $1`,
        [userId]
    );
    const clients = clientsResult.rows;
    
    return (
        <>
        < PageWrapper backHref={`/freelancer/jobs/${jobId}`} className="px-1 md:px-11">
            <CardSection useCard={false}>
                <JobForm 
                    action={UpdateJob} 
                    job={job} 
                    clients={clients}
                />
            </CardSection>
        </PageWrapper>
        </>
    )
}