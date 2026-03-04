import Sidebar from "@/components/Sidebar";

export default function FreelancerLayout({ children }) {
    return (
        <>
                <div className="flex">
                <aside className="w-64 shrink-0">
                    <Sidebar />
                </aside>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </>
    );
}