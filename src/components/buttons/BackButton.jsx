import Link from "next/link";

export default function BackButton({ href })    {
    return(
        <div className="back-container px-7 sm:px-15">
            <Link href={href} className="back-button ">
            ←
            </Link>
        </div>
    )
}