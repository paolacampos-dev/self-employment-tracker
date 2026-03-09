import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function ClientsPage({ searchParams })   {
    const sort = searchParams?.sort
    const { userId } = await auth()
    const { rows } = await db.query(`
                        SELECT * FROM clients WHERE user_id = $1`, 
                        [userId]
                    );
    const clients = [...rows];
        if(sort==="desc")  {
            clients.sort((a, b) =>  
                        b.company_name.localeCompare(a.company_name)
                        );
            } else if (sort==="asc")   {
                    clients.sort((a, b) =>  
                    a.company_name.localeCompare(b.company_name)
            );
        }
    console.log(rows);

    return (
        <>
            <nav className="list-sort">
                <Link href="/freelancer/clients/?sort=asc">Asc</Link>
                <Link href="/freelancer/clients/?sort=desc">Desc</Link>
            </nav>
            
            <ul className="app-list">
                {clients.map((client) => (
                    <li key={client.id} className="app-card p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0">  
                            <h2 className="font-bold">{client.company_name}</h2>
                            <div className="flex gap-4  justify-end">
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
                ))}
            </ul>
        </>
    );
}
