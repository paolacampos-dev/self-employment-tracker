"use client";

import { useState } from "react";

export default function ExpensesBreakdownToggle({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    function formatCurrency(amount) {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }).format(Number(amount) || 0);
}

    return (
        <div className="mt-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm font-medium underline cursor-pointer"
            >
                {isOpen ? "Hide breakdown" : "View breakdown"}
            </button>

            {/* Breakdown */}
            {isOpen && (
                <div className="border rounded-xl p-4 mt-3">
                    <ul className="flex flex-col gap-2">
                        {Object.entries(data).map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">
                                {key.replace(/_/g, " ")}
                            </span>
                            <span className="font-medium">
                                {formatCurrency(value)}
                            </span>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
    </div>
    );
}