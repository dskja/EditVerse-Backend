import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EditVerse",
  description: "Showcase your best edits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full flex flex-col bg-zinc-950 text-zinc-50 overflow-hidden">
        <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              EditVerse
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium drop-shadow-md">
              <Link href="/" className="transition-colors hover:text-white text-zinc-300">
                Home
              </Link>
              <Link href="/upload" className="transition-colors hover:text-white text-zinc-300">
                Upload
              </Link>
              <Link href="/profile" className="transition-colors hover:text-white text-zinc-300">
                Profile
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1 w-full h-full relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
