import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { PublicSiteWrapper } from "@/components/layout/PublicSiteWrapper";
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
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
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
    creator: SITE_CONFIG.social.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

  const globalJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: SITE_CONFIG.hindiName,
        url: SITE_CONFIG.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_CONFIG.url}/#logo`,
          url: `${SITE_CONFIG.url}/logo.png`,
          caption: SITE_CONFIG.name,
        },
        sameAs: [
          SITE_CONFIG.social.twitter,
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.youtube,
          SITE_CONFIG.social.whatsapp,
          SITE_CONFIG.social.telegram,
        ],
        publishingPrinciples: `${SITE_CONFIG.url}/editorial-policy`,
        correctionsPolicy: `${SITE_CONFIG.url}/corrections-policy`,
        diversityPolicy: `${SITE_CONFIG.url}/editorial-policy`,
        ethicsPolicy: `${SITE_CONFIG.url}/editorial-policy`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        alternateName: SITE_CONFIG.hindiName,
        description: SITE_CONFIG.description,
        publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
        inLanguage: "hi-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang="hi"
      suppressHydrationWarning
      className={`${notoSansDevanagari.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#20242C]">
        <LanguageProvider>
          <PublicSiteWrapper
            breakingNews={breakingNews}
            trendingArticles={trendingArticles}
          >
            {children}
          </PublicSiteWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
