import BackButton from "@/components/buttons/BackButton";

export default function CardSection({
    children,
    useCard = true,
    useContent = true,
}) {
    if (!useCard) return children;

    return (
        <div className="app-card">
            {useContent ? (
                <div className="app-card-content">
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
}