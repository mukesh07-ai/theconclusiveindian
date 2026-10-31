import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp, Info } from "lucide-react";
import { getTrendingArticles, getLatestArticles } from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { NewsCard } from "@/components/news/NewsCard";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

export const metadata: Metadata = {
  title: `ट्रेंडिंग समाचार (Trending News) - ${SITE_CONFIG.name}`,
  description: `इस समय देश और सोशल मीडिया पर सर्वाधिक पढ़े और साझा किए जा रहे प्रमुख समाचार एवं संपादकीय विश्लेषण।`,
  alternates: {
    canonical: "/trending",
  },
  openGraph: {
    title: `ट्रेंडिंग समाचार - ${SITE_CONFIG.name}`,
    description: `पाठकों द्वारा सर्वाधिक पढ़े जा रहे समाचार।`,
  },
};

export default async function TrendingNewsPage() {
  const [trendingArticles, latestData] = await Promise.all([
    getTrendingArticles(10),
    getLatestArticles(1, 5),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ट्रेंडिंग समाचार (Trending News)",
    description: "सर्वाधिक पढ़े और साझा किए जा रहे समाचार",
    url: `${SITE_CONFIG.url}/trending`,
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
          name: "ट्रेंडिंग",
          item: `${SITE_CONFIG.url}/trending`,
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
          <span className="font-semibold text-gray-900">ट्रेंडिंग समाचार</span>
        </nav>

        {/* Page Banner */}
        <div className="bg-[#F5F6F8] rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#E52532] text-white flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-[#E52532] uppercase tracking-wider">
                  चर्चित मुद्दे व विश्लेषण
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                ट्रेंडिंग समाचार (Trending Stories)
              </h1>
              <p className="text-sm text-gray-600 max-w-2xl mt-1 leading-relaxed">
                इस समय पाठकों के बीच सर्वाधिक पढ़े, खोजे और सोशल मीडिया पर विमर्श का केंद्र बने मुख्य समाचार।
              </p>
            </div>

            {/* Trending Topics Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-gray-400">ट्रेंडिंग हैशटैग:</span>
              {SITE_CONFIG.trendingTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/search?q=${encodeURIComponent(topic.name.replace("#", ""))}`}
                  className="text-xs font-semibold px-2.5 py-1 bg-white hover:bg-gray-100 text-[#233768] rounded-md border border-gray-300 transition-colors shadow-2xs"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Transparent Metric / Demo Note */}
          <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-start gap-2 text-xs text-gray-500">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>पारदर्शिता प्रकटीकरण (Ranking Note):</strong> वर्तमान रैंकिंग पोर्टल पर पाठकों के व्यूज एवं हालिया सक्रियता के आधार पर प्रदर्शित है। हम किसी भी कृत्रिम अथवा प्रायोजित एल्गोरिदम के स्थान पर केवल वास्तविक पाठक सहभागिता को प्राथमिकता देते हैं।
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Trending Stories (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#233768]">
              <h2 className="text-lg font-bold text-gray-900">
                शीर्ष 10 ट्रेंडिंग रिपोर्ट्स
              </h2>
              <span className="text-xs font-semibold text-[#E52532] bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                सक्रिय विमर्श
              </span>
            </div>

            <div className="space-y-4">
              {trendingArticles.map((art, idx) => (
                <div key={art.id} className="relative">
                  <div className="absolute -left-3 -top-3 w-7 h-7 bg-[#233768] text-white rounded-full flex items-center justify-center text-xs font-black z-10 shadow-sm">
                    {idx + 1}
                  </div>
                  <NewsCard
                    article={art}
                    variant="horizontal"
                    className="bg-white border border-gray-200 hover:border-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Latest Updates Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-200 flex items-center justify-between">
                <span>ताज़ा सुर्खियां</span>
                <Link href="/latest-news" className="text-xs text-[#233768] hover:underline">
                  सभी देखें →
                </Link>
              </h3>
              <div className="space-y-3">
                {latestData.data.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group block space-y-1 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                  >
                    <span className="text-[11px] font-semibold text-[#E52532] block">
                      {article.category.name}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#233768] line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder format="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
