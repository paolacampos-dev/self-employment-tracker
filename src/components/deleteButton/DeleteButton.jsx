/*"use client"
import { useState } from "react";

export default function DeleteButton({ action, id, message }) {
    const [confirming, setConfirming] = useState(false);

    return(
        <div className="delete-btn-wrapper">
            {!confirming ? (
                <button 
                type="button" 
                onClick={() => setConfirming(true)} 
                className="app-button"
                >
                Delete
                </button>
        ) : (
            <div className="delete-confirmation border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                <p>{message}</p>
                <div className="delete-confirm-actions flex flex-col items-center text-center">
                    <form action={action}>
                        <input type="hidden" name="id" value={id} />
                        <button type="submit" className="app-button" >Yes, delete</button>
                    </form>

                    <button type="button" onClick={() => setConfirming(false)} className="app-button ml-5">
                    Cancel
                    </button>
                </div>
            </div>
        )}
        </div>
    );
}*/
