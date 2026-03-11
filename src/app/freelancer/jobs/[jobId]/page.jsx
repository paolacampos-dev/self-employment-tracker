import { db } from "@/utils/dbConnection";
import DeleteJob from "@/actions/delete/deleteJob";
import CrudActions from "@/components/CrudActions";
import { formatDateForDisplay } from "@/utils/dateHelpers";
import BackButton from "../../../../components/buttons/BackButton";


export default async function JobId({ params }) {
    const { jobId } = await params;

    const query = await db.query(
        `SELECT jobs.*, clients.company_name
        FROM jobs
        JOIN clients ON jobs.client_id = clients.id
        WHERE jobs.id = $1`,
        [jobId]
    );

    const data = query.rows[0];
    console.log(data)

    return (
    <>
        <div className="container-app">
            <BackButton href={"/freelancer/jobs"} />

            <div className="px-6 py-0 max-w-xl mx-auto">
                <div className="app-card mt-0">
                    <div className="app-card-content">
                        <h1 className="font-semibold text-sm text-gray-500 underline">{data.company_name}</h1>
                        <h2 className="text-xl font-bold">{data.title}</h2>
                        <h3 className="italic">{data.job_details}</h3>
                        <h4  className={`description-details status ${
                                data.status === "live"
                                ? "text-green-600 font-semibold"
                                : data.status === "in_progress"
                                ? "text-blue-600 font-semibold"
                                : data.status === "completed"
                                ? "text-gray-600 font-semibold"
                                : data.status === "cancelled"
                                ? "text-red-600 font-semibold"
                                : ""
                            }`}
                        >
                        {data.status.replace("_", " ")}</h4>
                        <hr className="card-divider"></hr>

                        <div className="app-details">
                            <p className="font-bold">Deadline: {formatDateForDisplay(data.deadline)}</p>
                            <p>Started: {formatDateForDisplay(data.start_date)}</p>
                            <p>{data.hours_expected}</p>
                            <p>{data.hours_worked}</p>
                            <p>{data.hourly_rate}</p>
                            <p>{data.price}</p>
                        </div> 

                        <CrudActions
                            editHref={`/freelancer/jobs/${data.id}/edit`}
                            deleteAction={DeleteJob}
                            id={data.id}
                            message="Are you sure you want to delete this job?"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
