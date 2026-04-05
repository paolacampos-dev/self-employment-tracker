import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Presentation from "@/components/Presentation";

export default async function HomePage() {
    const { userId } = await auth();

    if (userId) {
        redirect("/freelancer");
    }

    return (
        <div className="px-4 sm:px6 lg:px-8">
            <Presentation />
        </div>
    )
}