import Sidebar from "@/components/layout/Sidebar";

export default function FreelancerLayout({ children }) {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 px-0 sm:px-6 min-w-0">
                    {children}
                </main>
            </div>
        </>
    );
}