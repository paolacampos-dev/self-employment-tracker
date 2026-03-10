"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortJobsSelect() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "";

    function handleChange(event) {
        const value = event.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
        params.set("sort", value);
        } else {
        params.delete("sort");
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="mb-7 text-right">
            <label htmlFor="sort" className="mr-2 font-semibold">
            Sort by:
            </label>

            <select
                id="sort"
                name="sort"
                value={currentSort}
                onChange={handleChange}
                className="border rounded px-2 py-1"
            >
                <option value="">Default</option>
                <option value="deadline_asc">Deadline ↑</option>
                <option value="deadline_desc">Deadline ↓</option>
                <option value="company_asc">Company A–Z</option>
                <option value="company_desc">Company Z–A</option>
                <option value="status_asc">Status A–Z</option>
                <option value="status_desc">Status Z–A</option>
                <option value="title_asc">Title A–Z</option>
                <option value="title_desc">Title Z–A</option>
        </select>
    </div>
    );
}