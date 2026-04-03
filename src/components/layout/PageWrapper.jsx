import BackButton from "@/components/buttons/BackButton";

export default function PageWrapper({
    children,
    backHref,
    sort,
    wrapperClass = "px-6 max-w-xl mx-auto",
}) {
    return (
        <div className={wrapperClass}>
            {sort && (
                <div className="pt-2 sm:pt-6 mb-2 text-right">
                    {sort}
                </div>
            )}

                {backHref && (
                    <div className={`${sort ? "mb-2" : "mt-2 sm:mt-10 mb-2"} sm:-translate-x-2`}>
                        <BackButton href={backHref} />
                    </div>
                )}
                    {children}
        </div>
    );
}