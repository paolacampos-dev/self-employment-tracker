"use client"

import Image from "next/image";
import logoImg from "@/../public/LOGO.png";
import { SignInButton, SignedIn, SignUpButton, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NewMenu from "@/components/NewMenu";


export default function Header()    {
    const pathname = usePathname();
    return(
        <>
        <header className="sticky top-0 z-50 w-full px-6 py-5 bg-border-b border-[var(--bgExpr)]">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* left */}
                <div className="flex flex-col itmes-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <Link
                        href="/freelancer"
                        className="inline-block transition-transform duration-200 ease-out hover:scale-[1.03]"
                    >
                        <Image
                            src={logoImg}
                            alt="An orange open book with a dollar sign"
                            width={60}
                            height={60}
                            className="w-12 sm:w-14"
                            priority
                        />
                    </Link>

                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-xs sm:text-lg text-[var(--bgExpr)]">
                        SelfTrack
                        </span>
                        <span className="hidden sm:block text-xs text-[var(--bgExpr)]/80">
                        Self-employment tracker
                        </span>
                    </div>
                </div>

                {/* center */}
                <SignedIn>
                    <nav className="flex items-center gap-3">
                        <Link
                            href="/live"
                            className={`px-3 py-1 rounded-md font-semibold ${
                                            pathname === "/live"
                                            ? "bg-[var(--bgExpr)] border border-[var(--Sun)] text-[var(--bgMilk)] font-bold"
                                            : "text-[var(--bdExpr)]"
                                    }`}
                        > 
                        Live
                        </Link>

                        <NewMenu />
                    </nav>
                </SignedIn>

                {/* right */}
                <div className="flex items-center gap-2">
                    <SignedOut>
                        <SignInButton>
                            <button className="text-sm font-semibold text-[var(--bgLatte)] hover:text-[rgb(var(--gold))] px-3 py-1 rounded-md transition">
                            Sign in
                            </button>
                        </SignInButton>

                        <SignUpButton>
                            <button className="text-sm font-semibold bg-[#ead7c1] text-[var(--bgExpr)] border border-[var(--Sun)] rounded-md px-3 py-1 hover:bg-[rgb(84,70,58)] hover:text-white transition">
                            Sign up
                            </button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </div>
        </header>
        </>
    )
}