import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { jobSortOptions, defaultJobSort, jobsSelectOptions } from "@/utils/SortOptions";
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
            <SortSelect options={jobsSelectOptions}/>
            <div className="app-card">
            <ul className="app-list">
                {jobs.map((job) => (
                    <li key={job.id} className="app-card flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                        <Link 
                            href={`/freelancer/jobs/${job.id}?returnTo=/freelancer/jobs`} 
                            className="font-bold"
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
        </>
    );
}
