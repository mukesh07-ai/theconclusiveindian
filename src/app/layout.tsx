import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getBreakingNews } from "@/lib/api";

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "हिंदी समाचार",
    "Hindi News",
    "The Conclusive Indian",
    "ताज़ा ख़बरें",
    "राजनीति",
    "भारत",
    "व्यापार समाचार",
    "क्रिकेट",
    "मनोरंजन",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breakingNews = await getBreakingNews();

  return (
    <html
      lang="hi"
      className={`${notoSansDevanagari.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#20242C]">
        <Suspense fallback={<div className="h-24 bg-white border-b border-gray-200" />}>
          <SiteHeader />
        </Suspense>
        <BreakingNewsTicker items={breakingNews} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
