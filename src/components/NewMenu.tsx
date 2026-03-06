"use client";

import Link from "next/link";
// useRef leaves you manipulate the DOM with the ref content
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NewMenu() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const isNewRoute = pathname.startsWith("/freelancer/new") || open;

    const newItems = [
        { name: "Client", path: "client" },
        { name: "Job", path: "job" },
        { name: "Expense", path: "expense" },
        { name: "Invoice", path: "invoice" },
        { name: "Event", path: "event" },
    ];

    // contains() is a DOM method ==> does this element contain another element inside it? =. returns true or false
    // e.taget =>  the click event (element that the user clicked) as Node just for Tsx to understand it 
    // if (click is outside the dropdown)close the menu which is setOpen(false)  or ==> contains()is true => !true = false => menu stays open
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
            }
            document.addEventListener("mousedown", onDocClick);
            return () => document.removeEventListener("mousedown", onDocClick);
        }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`px-3 py-1 rounded-md font-bold ${
                    isNewRoute
                        ? "bg-[var(--bgExpr)] border border-[var(--Sun)] text-[var(--bgMilk)]"
                        : "text-[var(--bdExpr)]"
                    }`}
            >
            New
            </button>

            {/* {open && (...) conditional rendering: render this only is open is true} */}
            {open && (
            <div className="absolute left-0 mt-2 w-56 rounded-md border bg-white shadow">
                {newItems.map((item) => (
                    <Link
                        key={item.path}
                        href={`/freelancer/new/${item.path}`}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                    New {item.name}
                    </Link>
                ))}
            </div>
            )}
        </div>
    );
}