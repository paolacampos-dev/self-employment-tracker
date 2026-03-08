import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SelfTrack — Freelance Income & Tax Tracker",
    template: "%s | SelfTrack",
  },
  description:
    "Track clients, income, expenses, and tax estimates in one simple dashboard built for freelancers.",
  openGraph: {
    title: "SelfTrack — Freelance Income & Tax Tracker",
    description:
      "Track clients, income, expenses, and tax estimates in one simple dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <div className="main-container">{children}</div>
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
