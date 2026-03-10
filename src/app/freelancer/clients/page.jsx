import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import GetClientStatus from "../../../utils/clientStatus";

export default async function ClientsPage({ searchParams })   {
    const params = await searchParams
    const sort = params?.sort
    const { userId } = await auth()
    const result = await db.query(
                        `
                        SELECT
                            clients.id, 
                            clients.company_name,
                            array_agg(DISTINCT jobs.status) 
                            FILTER (WHERE jobs.status IS NOT NULL) As job_statuses
                        FROM clients
                        LEFT JOIN jobs ON jobs.client_id = clients.id
                        WHERE clients.user_id = $1
                        GROUP BY clients.id, clients.company_name
                        `,
                        [userId]
                    );
    console.log(result)
    
    const clients = [...result.rows];
        if(sort==="desc")  {
            clients.sort((a, b) =>  
                        b.company_name.localeCompare(a.company_name)
                        );
            } else if (sort==="asc")   {
                    clients.sort((a, b) =>  
                    a.company_name.localeCompare(b.company_name)
            );
        }
    console.log(result.rows);

    return (
        <>
            <nav className="list-sort">
                <Link href="/freelancer/clients/?sort=asc">Asc</Link>
                <Link href="/freelancer/clients/?sort=desc">Desc</Link>
            </nav>
            
            <ul className="app-list">
                {clients.map((client) => {
                    const status = GetClientStatus(client.job_statuses);

                    return  (
                        <li key={client.id} className="app-card p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0">  
                            <h2 className="font-bold">{client.company_name}</h2>
                            {status.label && (
                                <p className={status.className}>{status.label}</p>
                            )}
                                                    
                            <div className="flex gap-4 justify-end">
                                <Link
                                    href={`/freelancer/clients/${client.id}`}
                                    className="app-button app-button-sm"
                                >
                                View
                                </Link>
                                <Link
                                    href={`/freelancer/clients/${client.id}/jobs`}
                                    className="app-button app-button-sm"
                                >
                                Jobs
                                </Link>
                            </div>
                        </div>
                    </li>
                )
            })}
            </ul>
        </>
    );
}
