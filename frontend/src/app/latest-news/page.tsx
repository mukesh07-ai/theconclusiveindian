import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Radio, Clock } from "lucide-react";
import {
  getLatestArticles,
  getTrendingArticles,
  getCategories,
} from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { NewsCard } from "@/components/news/NewsCard";
import { TrendingNews } from "@/components/news/TrendingNews";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

export const metadata: Metadata = {
  title: `ताज़ा खबरें (Latest Hindi News) - ${SITE_CONFIG.name}`,
  description: `देश, दुनिया, राजनीति, अर्थव्यवस्था, खेल और तकनीक की ताज़ा ब्रेकिंग न्यूज़ और लाइव अपडेट्स।`,
  alternates: {
    canonical: "/latest-news",
  },
  openGraph: {
    title: `ताज़ा खबरें - ${SITE_CONFIG.name}`,
    description: `द कन्क्लूसिव इंडियन पर देश-दुनिया की हर ताज़ा हलचल।`,
  },
};

export default async function LatestNewsPage() {
  const [latestData, trendingArticles, categories] = await Promise.all([
    getLatestArticles(1, 20),
    getTrendingArticles(5),
    getCategories(),
  ]);

  const articles = latestData.data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ताज़ा समाचार (Latest News)",
    description: "द कन्क्लूसिव इंडियन पर प्रकाशित नवीनतम समाचारों का संग्रह",
    url: `${SITE_CONFIG.url}/latest-news`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "ताज़ा खबरें",
          item: `${SITE_CONFIG.url}/latest-news`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">ताज़ा खबरें</span>
        </nav>

        {/* Page Header */}
        <div className="bg-[#F5F6F8] rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-3 h-3 rounded-full bg-[#E52532] animate-pulse" />
                <span className="text-xs font-bold text-[#E52532] uppercase tracking-wider flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5" /> लाइव न्यूज़ डेस्क
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                ताज़ा समाचार (Latest News)
              </h1>
              <p className="text-sm text-gray-600 max-w-2xl mt-1 leading-relaxed">
                भारत और विश्व भर से नवीनतम राष्ट्रीय, राजनीतिक, आर्थिक और खेल समाचारों की निरंतर कवरेज।
              </p>
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-gray-500">श्रेणी फ़िल्टर:</span>
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="text-xs font-semibold px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 hover:text-[#233768] rounded-md border border-gray-300 transition-colors shadow-2xs"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Latest News List (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#233768]">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E52532]" />
                हालिया प्रकाशित रिपोर्ट (कुल {latestData.total})
              </h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                समय अनुसार क्रमबद्ध
              </span>
            </div>

            <div className="space-y-4">
              {articles.map((art) => (
                <NewsCard
                  key={art.id}
                  article={art}
                  variant="horizontal"
                  className="bg-white border border-gray-200 hover:border-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Trending Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <TrendingNews articles={trendingArticles} />
            <AdPlaceholder format="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
