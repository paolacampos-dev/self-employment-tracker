"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function TaxYearSelect({ options }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleChange(e) {
        const params = new URLSearchParams(searchParams);
            params.set("year", e.target.value);

            router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <select
            onChange={handleChange}
            defaultValue={searchParams.get("year") || "2026/27"}
            className="app-select font-bold"
        >
        {options.map((year) => (
        <option key={year} value={year}>
            {year}
        </option>
        ))}
    </select>
    );
}