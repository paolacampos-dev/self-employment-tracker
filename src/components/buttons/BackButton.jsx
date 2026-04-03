import Link from "next/link";

export default function BackButton({ href, className="" })    {
    console.log("BackButton href:", href);
    return(
        <div className={`back-container ${className || ""}`}>
            <Link href={href} className="back-button">
            ←
            </Link>
        </div>
    );
}

