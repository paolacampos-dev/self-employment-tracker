import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "/globals.css";
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
  metabase: new URL("htpps://selftrack.paolacampos.dev"),
  title: "SelfTrack — Freelance Income & Tax Tracker",
  description: "Freelance Management app for tracking clients, jobs, income & Tax",
  icons: {
    icon: "/favicon.png"
  },
  openGraph: {
    title: "SelfTrack — Freelance Income & Tax Tracker",
    description:
      "Freelance Management app for tracking clients, jobs, income & Tax",
    images:   [
      {
        url: "/favicon.png", 
        width: 512, 
        height: 512,
        alt: "Paola Campos - dev Logo",
      },
    ],
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
