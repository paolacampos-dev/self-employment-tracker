
//-------------------Clients----------------------//
export const clientSortOptions = {
    company_name_asc: "clients.company_name ASC NULLS LAST",
    company_name_desc: "clients.company_name DESC NULLS LAST",
    /*jobStatusPriorityAsc,
    jobStatusReverse,*/
}

export const clientSelectOptions =  [
    { value: "company_name_asc", label:"Company A-Z"},
    { value: "company_name_desc", label:"Company Z-A"},
    /*{ value: "status_priority", label: "Status priority" },
    { value: "status_reverse", label: "Status reverse" },*/
]

export const defaultClientSort = "clients.company_name ASC NULLS LAST";


// ----------------Jobs -------------------------//

export const jobSortOptions = {
    deadline_asc: "jobs.deadline ASC NULLS LAST",
    deadline_desc: "jobs.deadline DESC NULLS LAST",
    company_asc: "clients.company_name ASC",
    company_desc: "clients.company_name DESC",
    title_asc: "jobs.title ASC",
    title_desc: "jobs.title DESC",
    jobStatusPriorityAsc,
    jobStatusReverse,
};

export const jobsSelectOptions = [
    { value: "deadline_asc", label: "Deadline ↑" },
    { value: "deadline_desc", label: "Deadline ↓" },
    { value: "company_asc", label: "Company A-Z" },
    { value: "company_desc", label: "Company Z-A" },
    { value: "status_priority", label: "Status priority" },
    { value: "status_reverse", label: "Status reverse" },
    { value: "title_asc", label: "Title A-Z" },
    { value: "title_desc", label: "Title Z-A" },
];

export const defaultJobSort = "jobs.title ASC";


//----------Clients/Jobs------------------------//
export const clientJobsSortOptions = {
    deadline_asc: "jobs.deadline ASC NULLS LAST",
    deadline_desc: "jobs.deadline DESC NULLS LAST",
    title_asc: "jobs.title ASC",
    title_desc: "jobs.title DESC",
    jobStatusPriorityAsc,
    jobStatusReverse,
};

export const clientJobsSelectOptions = [
    { value: "deadline_asc", label: "Deadline ↑" },
    { value: "deadline_desc", label: "Deadline ↓" },
    { value: "status_priority", label: "Status priority" },
    { value: "status_reverse", label: "Status reverse" },
    { value: "title_asc", label: "Title A-Z" },
    { value: "title_desc", label: "Title Z-A" },
];

export const defaultClientJobsSort = "Status priority"


//------ Expenses----------//
export const expensesSortOptions = {
    deadline_asc: "jobs.deadline ASC NULLS LAST",
    deadline_desc: "jobs.deadline DESC NULLS LAST",
    title_asc: "jobs.title ASC",
    title_desc: "jobs.title DESC",
    jobStatusPriorityAsc,
    jobStatusReverse,
};

export const expensesSelectOptions = [
    { value: "deadline_asc", label: "Deadline ↑" },
    { value: "deadline_desc", label: "Deadline ↓" },
    { value: "status_priority", label: "Status priority" },
    { value: "status_reverse", label: "Status reverse" },
    { value: "title_asc", label: "Title A-Z" },
    { value: "title_desc", label: "Title Z-A" },
];

export const defaultExpensesbSort = "jobs.title ASC";


// ---------------Invoices -----//


