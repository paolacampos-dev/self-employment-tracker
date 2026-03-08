import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function ClientsPage({ searchParams })   {
    const params = await searchParams;
    const sort = params?.sort
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
                    <li key={client.id} className="app-card">
                        <Link href={`/freelancer/clients/${client.id}`} className="font-bold">
                        {client.company_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
