import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingCallButton } from "@/components/common/FloatingCallButton";
import { getBreakingNews, getTrendingArticles } from "@/lib/api";
import { LanguageProvider } from "@/context/LanguageContext";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`,
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
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
  const [breakingNews, trendingArticles] = await Promise.all([
    getBreakingNews(),
    getTrendingArticles(8),
  ]);

  return (
    <html
      lang="hi"
      suppressHydrationWarning
      className={`${notoSansDevanagari.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#20242C]">
        <LanguageProvider>
          <SiteHeader breakingNews={breakingNews} trendingArticles={trendingArticles} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingCallButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
