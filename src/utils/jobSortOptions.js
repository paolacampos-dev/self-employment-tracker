export const jobSortOptions = {
    deadline_asc: "jobs.deadline ASC NULLS LAST",
    deadline_desc: "jobs.deadline DESC NULLS LAST",
    company_asc: "clients.company_name ASC",
    company_desc: "clients.company_name DESC",
    title_asc: "jobs.title ASC",
    title_desc: "jobs.title DESC",
    status_priority: `
        CASE
            WHEN jobs.status = 'live' THEN 1
            WHEN jobs.status = 'in_progress' THEN 2
            WHEN jobs.status = 'completed' THEN 3
            WHEN jobs.status = 'cancelled' THEN 4
            ELSE 5
        END
        `
};

export const defaultJobSort = "jobs.title ASC";