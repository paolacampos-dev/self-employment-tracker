"use client";

import { useState } from "react";
import Link from "next/link";

export default function CrudActions({ editHref, deleteAction, id, message }) {
    const [confirming, setConfirming] = useState(false);

    return (
        <div className="crud-wrapper">
        {!confirming ? (
            <div className="crud-actions flex gap-3 justify-center flex-wrap mt-4">
                <Link href={editHref} className="app-button">
                Edit
                </Link>

                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="app-button app-button-danger"
                >
                Delete
                </button>
            </div>
            ) : (
            <div className="delete-confirmation border border-red-300 bg-red-50 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                <p className="text-red-600 font-bold">{message}</p>

                <div className="delete-confirm-actions flex flex-col items-center gap-2">
                    <form action={deleteAction}>
                        <input type="hidden" name="id" value={id} />
                        <button type="submit" className="app-button app-button-danger">
                        Yes, delete
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        className="app-button app-button-cancel"
                    >
                    Cancel
                    </button>
                </div>
            </div>
            )}
        </div>
    );
}