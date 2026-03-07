"use client";

import DeleteButton from "./DeleteButton";
import { DeleteClient } from "@/actions/delete/deleteClient";

export default function DeleteClientButton({ id }) {
    return (
        <DeleteButton
            action={DeleteClient}
            id={id}
            message="Are you sure you want to delete this client?"
        />
    );
}