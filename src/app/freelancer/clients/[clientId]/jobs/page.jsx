import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import SortJobsSelect from "../../../../../components/SortJobsSelect";
import { jobSortOptions, defaultJobSort } from "@/utils/jobSortOptions";
import BackButton from "../../../../../components/buttons/BackButton";

export default async function ClientJobsPage({ params, searchParams }) {
    const { userId } = await auth();
    const { clientId } = await params;
    const sort = searchParams?.sort || "";
    const orderBy = jobSortOptions[sort] || defaultJobSort;

    const clientResult = await db.query(`
        SELECT * FROM clients
        WHERE id = $1 AND user_id = $2
    `,
        [clientId, userId]
    );
    const client = clientResult.rows[0];

    const jobsQuery = `
        SELECT jobs.*, clients.company_name
        FROM jobs
        JOIN clients ON jobs.client_id = clients.id
        WHERE jobs.client_id = $1 AND jobs.user_id = $2
        ORDER BY ${orderBy}
        `;

    const jobsResult = await db.query(jobsQuery, [clientId, userId]);
    const jobs = jobsResult.rows;

    return (
        <div className="app-page-spacing">
        <BackButton href={"/freelancer/clients"} />    
        <div className="app-card">
            <h1 className="text-xl font-bold mb-2 underline">Jobs for {client?.company_name}</h1>

            <SortJobsSelect />
            
            {!client ? (
                <p>Client not found.</p>
                ) : jobs.length === 0 ? (
                <p>No jobs for this client yet.</p>
                ) : (
                <ul className="app-list">
                    {jobs.map((job) => (
                        <li key={job.id} className="app-card">
                            <Link
                                href={`/freelancer/jobs/${job.id}`}
                                className="font-bold"
                            >
                            {job.title}
                            </Link>
                            <p>{job.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
    );
}