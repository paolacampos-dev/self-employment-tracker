import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { GetClientStatus } from "@/utils/statusOptions";
import SortSelect from "@/components/SortSelect";
import { clientSortOptions, defaultClientSort, clientSelectOptions } from "@/utils/sortOptions";

export default async function ClientsPage({ searchParams })   {
    const { userId } = await auth()

    const resolvedSearchParams = await searchParams;
    const sort = resolvedSearchParams?.sort || "";
    const orderBy = clientSortOptions[sort] || defaultClientSort;

    const result = await db.query(
                    `
                    SELECT
                        clients.id,
                        clients.company_name,
                        array_agg(DISTINCT jobs.status)
                            FILTER (WHERE jobs.status IS NOT NULL) AS job_statuses
                    FROM clients
                    LEFT JOIN jobs ON jobs.client_id = clients.id
                    WHERE clients.user_id = $1
                    GROUP BY clients.id, clients.company_name
                    ORDER BY ${orderBy}
                    `,
                        [userId]
                    );
    console.log(result)
    
    const clients = result.rows;

    console.log(result.rows);

    return (
        <>
        <div className="without-backbutton">
            <SortSelect options={clientSelectOptions} />
        </div>

            <div className="app-card">
                {clients.length === 0 ? (
                    <div className="text-center py-8">
                        <h2 className="text-lg font-semibold mb-2">
                            No clients yet
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Create your first client to start managing your workload.
                        </p>

                        <Link
                            href="/freelancer/new/client"
                            className="app-button"
                        >
                            + New Client
                        </Link>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-xl font-bold mb-4 underline">Clients</h1>
                        <ul className="app-list">
                            {clients.map((client) => {
                                const status = GetClientStatus(client.job_statuses);

                                return (
                                    <li key={client.id} className="app-card">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0">
                                            <h2 className="font-bold">
                                                {client.company_name}
                                            </h2>

                                            {status.label && (
                                                <p className={status.className}>
                                                    {status.label}
                                                </p>
                                            )}

                                            <div className="flex flex-col gap-2 items-end">
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
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
