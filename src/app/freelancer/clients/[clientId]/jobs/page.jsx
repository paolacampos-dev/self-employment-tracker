import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import SortSelect from "@/components/SortSelect";
import { clientJobsSortOptions, defaultJobSort, clientJobsSelectOptions } from "@/utils/SortOptions";
import BackButton from "@/components/buttons/BackButton";

export default async function ClientJobsPage({ params, searchParams }) {
    const { userId } = await auth();
/* Because dealing with a dynamic route, Next has to solve first params.clientId and then searchParams.sort
    (params and searchParams are promises, not objects)
    (if a property access fails on async data --> await the object first):
    1. wait for searchParams to resolve
    2. Store the resolved object in a variable
    3. read .sort from the resolved object*/
    const resolvedParams = await params;
    const { clientId } = resolvedParams;
    const resolvedSearchParams = await searchParams;
    const sort = resolvedSearchParams?.sort || "";
    const orderBy = clientJobsSortOptions[sort] || defaultJobSort;

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

    const statusColors = {
        live: "text-green-600 font-semibold",
        in_progress: "text-blue-600 font-semibold",
        completed: "text-gray-600",
        cancelled: "text-red-600",
    };

    return (
        <>
        <BackButton href="/freelancer/clients" />
        <div className="app-page-spacing">
            <div className="app-card">
            <h1 className="text-xl font-bold mb-2 underline">Jobs for {client?.company_name}</h1>

            <SortSelect options={clientJobsSelectOptions}/>
            
            {!client ? (
                <p>Client not found.</p>
                ) : jobs.length === 0 ? (
                <p>No jobs for this client yet.</p>
                ) : (
                <ul className="app-list">
                    {jobs.map((job) => (
                        <li key={job.id} className="app-card">
                            <Link
                                href={`/freelancer/jobs/${job.id}?returnTo=/freelancer/clients/${client.id}/jobs`}
                                className="font-bold"
                            >
                            {job.title}
                            </Link>
                            <p className={statusColors[job.status]}>{job.status.replace("_", " ")}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
    </>
    );
}