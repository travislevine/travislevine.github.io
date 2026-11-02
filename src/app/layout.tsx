import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/data/profile";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.headline,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "Travis Levine",
    "AI Automation Engineer",
    "Software Engineer",
    "Next.js",
    "Supabase",
    "Embedded Systems",
    "Sunshine Coast",
    "Portfolio",
  ],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.headline,
    type: "website",
    locale: "en_AU",
  },
  twitter: { card: "summary", title: `${profile.name} — ${profile.title}`, description: profile.headline },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={GeistSans.variable}>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald-400 focus:px-3 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
