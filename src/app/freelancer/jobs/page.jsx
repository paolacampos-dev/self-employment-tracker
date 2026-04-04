import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { jobSortOptions, defaultJobSort, jobsSelectOptions } from "@/utils/sortOptions";
import SortSelect from "@/components/SortSelect";

export default async function JobsPage({ searchParams })   {
    const params = await searchParams;
    const sort = params?.sort || "";
    const { userId } = await auth()
    
    const orderBy = jobSortOptions[sort] || defaultJobSort;
    
    const query =
        `
        SELECT
            jobs.*,
            clients.company_name,
            COALESCE(SUM(expenses.amount), 0) AS total_expenses
        FROM jobs
        JOIN clients
            ON jobs.client_id = clients.id
        LEFT JOIN expenses
            ON expenses.job_id = jobs.id
        WHERE jobs.user_id = $1
        GROUP BY jobs.id, clients.company_name
        ORDER BY ${orderBy}
        `;

    const { rows } = await db.query(query, [userId]);
    const jobs = rows;
    console.log(rows);

    const statusColors = {
        live: "text-green-600 font-semibold",
        in_progress: "text-blue-600 font-semibold",
        completed: "text-gray-600",
        cancelled: "text-red-600",
    };

    return (
        <>
            <div className="mt-2 sm:mt-6 mb-2">
                <SortSelect options={jobsSelectOptions}/>
            </div>
            <div className="app-card">
                {jobs.length === 0 ? (
                    <div className="text-center py-8">
                        <h2 className="text-lg font-semibold mb-2">
                            No jobs yet
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Create your first job to start managing your worload.
                        </p>
                
                        <Link
                            href="/freelancer/new/job"
                            className="app-button"
                        >
                            + New Job
                        </Link>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-xl font-bold mb-4 underline">Jobs</h1>
                        <ul className="app-list">
                            {jobs.map((job) => (
                                <li 
                                    key={job.id} 
                                    className="app-card flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center"
                                >
                                    <Link 
                                        href={`/freelancer/jobs/${job.id}?returnTo=/freelancer/jobs`} 
                                        className="flex-1 block font-bold"
                                    >
                                        <div>
                                            <p className="text-xs">{job.company_name}</p>
                                            <p className="opacity-70 underline font-semibold">{job.title}</p>
                                            <p className={statusColors[job.status]}>{job.status.replace("_", " ")}</p>
                                        </div>
                                    </Link>
                                    <Link 
                                        href={`/freelancer/jobs/${job.id}/expenses`} 
                                        className="app-button flex flex-col items-center text-sm px-3 py-1 ml-4 self-start sm:self-auto"
                                    > 
                                        <span>Expenses</span>
                                        <span className="text-sm font-semibold "> £{Number(job.total_expenses).toFixed(2)}</span> 
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
