export default function GetClientStatus(jobs)   {
    if(!jobs || jobs.length === 0) {
            return {
                label: "",
                className: "",
            }  // to return an object needs to be wrapped with {}
    }

    const jobStatus = jobs;

    const hasLive = jobStatus.includes("live");
    const hasProgress = jobStatus.includes("in_progress");
    const hasCompleted = jobStatus.includes("completed");
    const hasCancelled = jobStatus.includes("cancelled");

    if (hasLive && hasProgress) {
        return{
            label: "Live / in Progress", 
            className: "text-green-600 font-semibold",
        }
    }

    if (hasLive) {
        return {
            label: "In Live",
            className: "text-green-600 font-semibold",
        };
    }

    if (hasProgress) {
        return {
            label: "In progress",
            className: "text-blue-600 font-semibold",
        };
    }

    if (hasCompleted) {
        return {
            label: "Completed",
            className: "text-gray-600",
        };
    }

    if (hasCancelled) {
        return {
            label: "Cancelled",
            className: "text-red-600",
        };
    }

    return{
        label: "",
        className: "",
    }
}
