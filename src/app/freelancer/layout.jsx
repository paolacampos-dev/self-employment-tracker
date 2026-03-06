import Sidebar from "@/components/Sidebar";

export default function FreelancerLayout({ children }) {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 py-1 px-0 sm:px-6 sm:py-6 min-w-0">
                    {children}
                </main>
            </div>
        </>
    );
}