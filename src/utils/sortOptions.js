import { jobStatusPriorityAsc, jobStatusReverse } from "./statusOptions"

//-------------------Clients----------------------//
export const clientSortOptions = {
    company_name_asc: "clients.company_name ASC NULLS LAST",
    company_name_desc: "clients.company_name DESC NULLS LAST",
}
export const defaultClientSort = "clients.company_name ASC NULLS LAST";

export const clientSelectOptions =  [
    { value: "company_name_asc", label:"Company A-Z"},
    { value: "company_name_desc", label:"Company Z-A"},
]


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
export const defaultJobSort = "jobs.title ASC";

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


//----------Clients/Jobs------------------------//
export const clientJobsSortOptions = {
    deadline_asc: "jobs.deadline ASC NULLS LAST",
    deadline_desc: "jobs.deadline DESC NULLS LAST",
    title_asc: "jobs.title ASC",
    title_desc: "jobs.title DESC",
    jobStatusPriorityAsc,
    jobStatusReverse,
};
export const defaultClientJobsSort = "Status priority"

export const clientJobsSelectOptions = [
    { value: "deadline_asc", label: "Deadline ↑" },
    { value: "deadline_desc", label: "Deadline ↓" },
    { value: "status_priority", label: "Status priority" },
    { value: "status_reverse", label: "Status reverse" },
    { value: "title_asc", label: "Title A-Z" },
    { value: "title_desc", label: "Title Z-A" },
];


//------ Expenses----------//
export const expensesSortOptions = {
    deadline_asc: "jobs.deadline ASC NULLS LAST",
    deadline_desc: "jobs.deadline DESC NULLS LAST",
    title_asc: "jobs.title ASC",
    title_desc: "jobs.title DESC",
    jobStatusPriorityAsc,
    jobStatusReverse,
};
export const defaultExpensesbSort = "jobs.title ASC";

export const expensesSelectOptions = [
    { value: "deadline_asc", label: "Deadline ↑" },
    { value: "deadline_desc", label: "Deadline ↓" },
    { value: "status_priority", label: "Status priority" },
    { value: "status_reverse", label: "Status reverse" },
    { value: "title_asc", label: "Title A-Z" },
    { value: "title_desc", label: "Title Z-A" },
];


// ---------------Invoices -----//
export const invoiceSortOptions = {
    company_asc: "clients.company_name ASC",
    company_desc: "clients.company_name DESC",
    date_desc: "invoices.date_issued DESC NULLS LAST",
    date_asc: "invoices.date_issued ASC NULLS LAST",
    status_asc: "invoices.status ASC",
};
export const defaultInvoicesSort = "invoices.date_issued ASC NULLS LAST"

export const invoiceSelectOptions = [
    { value: "company_asc", label: "Company (A-Z)" },
    { value: "company_desc", label: "Company (Z-A)" },
    { value: "date_desc", label: "Newest first" },
    { value: "date_asc", label: "Oldest first" },
];
