import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { jobSortOptions, defaultJobSort, jobsSelectOptions } from "@/utils/SortOptions";
import SortSelect from "@/components/SortSelect";

export default async function JobsPage({ searchParams })   {
    "client use"
    const params = await searchParams;
    const sort = await params?.sort || "";
    const { userId } = await auth()
    
    const orderBy = jobSortOptions[sort] || defaultJobSort;
    
    const query = `
        SELECT jobs.*, clients.company_name
        FROM jobs
        JOIN clients ON jobs.client_id = clients.id
        WHERE jobs.user_id = $1
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

            {/* <h1 className="color-[var(--bgExpr)] text-2xl">Jobs</h1>  */}
            <ul className="app-list">
                {jobs.map((job) => (
                    <li key={job.id} className="app-card">
                        <Link 
                            href={`/freelancer/jobs/${job.id}`} 
                            className="font-bold"
                        >
                        {job.title}
                        </Link>
                        <p className="text-sm opacity-70">{job.company_name}</p>
                        <p className={statusColors[job.status]}>{job.status.replace("_", " ")}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
