import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { jobSortOptions, defaultJobSort } from "@/utils/jobSortOptions";
import SortJobsSelect from "../../../components/SortJobsSelect.jsx";

export default async function JobsPage({ searchParams })   {
    const params = await searchParams;
    const sort = params?.sort
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

    return (
        <>
            <SortJobsSelect />

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
                        <p>{job.status}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
