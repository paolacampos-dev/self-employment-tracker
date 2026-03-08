import { db } from "@/utils/dbConnection";
import DeleteJob from "@/actions/delete/deleteJob";
import CrudActions from "@/components/CrudActions";

export default async function JobId({ params }) {
    const { jobId } = await params;

    const query = await db.query(`SELECT * FROM jobs WHERE id = $1`, 
        [
        jobId,
        ]);

    const data = query.rows[0];

    return (
    <>
        <div className="px-6 py-6 max-w-xl mx-auto">
            <div className="app-card">
                <div className="app-card-content">
                    <h1 className="text-xl">{data.title}</h1>
                    <h2>{data.job_details}</h2>
                    <h3>{data.status}</h3>
                    <h4 className="description-details">{data.deadline}</h4>
                    <hr className="card-divider"></hr>

                    <div className="app-details">
                        <p>{data.start_date}</p>
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
    </>
    );
}
