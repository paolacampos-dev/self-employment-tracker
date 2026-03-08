"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
    { name: "Clients", path: "/freelancer/clients", short: "C" },
    { name: "Jobs", path: "/freelancer/jobs", short: "J" },
    { name: "Schedule", path: "/freelancer/schedule", short: "S" },
    { name: "Expenses", path: "/freelancer/expenses", short: "E" },
    { name: "Invoices", path: "/freelancer/invoices", short: "I" },
    { name: "Finance", path: "/freelancer/finance", short: "F" },
]

export default function Sidebar() {

    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    return (
        <aside
            className={`
                min-h-screen bg-neutral-900 transition-all duration-300 shrink-0
                ${collapsed ? "w-10 p-1 sm:w-14 sm:p-2" : "w-32 md:w-48 p-4"}
            `}
        >
            <button
                type="button"
                onClick={() => setCollapsed((v) => !v)}
                className="p-2 text-[var(--bgMilk)] hover:bg-white/10 rounded-md transition"
                aria-label="Toggle sidebar"
            >
                {collapsed ? "»" : "«"}
            </button>

            <nav className="flex flex-col gap-3">
                {menu.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={`font-bold px-2 py-1 rounded transition-all duration-200
                    ${collapsed ? "text-lg text-center" : "text-base md:text-lg"}
                    ${
                    pathname === item.path
                        ? "bg-[rgb(84,70,58)] text-white"
                        : "text-[var(--bdExpr)] hoover:text-white hoover:bg-[var(--bgMocca)]"
                    }`}
                >
                    {collapsed ? item.short : item.name}
                </Link>
                ))}
            </nav>
        </aside>
    )
}