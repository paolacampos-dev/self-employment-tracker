import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { ClientSegmentRoot } from "next/dist/client/components/client-segment";

export default async function JobsPage({ searchParams })   {
    const params = await searchParams;
    const sort = params?.sort
    const { userId } = await auth()
    const { rows } = await db.query(`
                        SELECT jobs.*, clients.company_name
                        FROM jobs
                        JOIN clients ON jobs.client_id = clients.id
                        WHERE jobs.user_id = $1`, 
                        [userId]
                    );
    const jobs = [...rows];
        if(sort==="desc")  {
            jobs.sort((a, b) =>  
                        b.title.localeCompare(a.title)
                        );
            } else if (sort==="asc")   {
                    jobs.sort((a, b) =>  
                    a.title.localeCompare(b.title)
            );
        }
    console.log(rows);

    return (
        <>
            <nav className="list-sort">
                <Link href="/freelancer/jobs/?sort=asc">Asc</Link>
                <Link href="/freelancer/jobs/?sort=desc">Desc</Link>
            </nav>

            <h1 className="color-[-var(--bgExpr)] text-2xl">{ jobs[0]?.company_name}</h1> 
            <ul className="app-list">
                {jobs.map((job) => (
                    <li key={job.id} className="app-card">
                        <Link href={`/freelancer/jobs/${job.id}`} className="font-bold">
                        {job.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
