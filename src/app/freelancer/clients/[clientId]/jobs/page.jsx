import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function ClientJobsPage({ params }) {
    const { userId } = await auth();
    const { clientId } = await params;

    const clientResult = await db.query(
        `SELECT * FROM clients
        WHERE id = $1 AND user_id = $2`,
        [clientId, userId]
    );

    const client = clientResult.rows[0];

    const jobsResult = await db.query(
        `SELECT * FROM jobs
        WHERE client_id = $1 AND user_id = $2
        ORDER BY title ASC`,
        [clientId, userId]
    );

    const jobs = jobsResult.rows;

    return (
        <div className="app-page-spacing">
        <div className="app-card">
        <h1 className="text-xl font-bold mb-2">Jobs for {client?.company_name}</h1>
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

            <div className="mt-4">
                <Link
                    href={`/freelancer/clients/`}
                    className="app-button"
                >
                Back
                </Link>
            </div>
        </div>
    </div>
    );
}