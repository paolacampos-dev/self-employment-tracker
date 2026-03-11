"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ options }) {
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
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}        
        </select>
    </div>
    );
}