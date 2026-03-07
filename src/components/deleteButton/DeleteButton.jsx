"use client"
import { useState } from "react";

export default function DeleteButton({ action, id, message }) {
    const [confirming, setConfirming] = useState(false);

    if (!confirming) {
        return (
            <button type="button" onClick={() => setConfirming(true)}>
            Delete
            </button>
        );
    }    
    return (
        <div>
            <p>{message}</p>
            <form action={action}>
                <input type="hidden" name="id" value={id} />
                <button type="submit">Yes, delete</button>
            </form>

            <button type="button" onClick={() => setConfirming(false)}>
            Cancel
            </button>
        </div>
    );
}
