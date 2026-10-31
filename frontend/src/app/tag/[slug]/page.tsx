import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Tag, TrendingUp } from "lucide-react";
import {
  getAllTags,
  getArticlesByTag,
  getTrendingArticles,
} from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { NewsCard } from "@/components/news/NewsCard";
import { TrendingNews } from "@/components/news/TrendingNews";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug).replace(/_/g, " ");

  const title = `#${decodedTag} - समाचार, विश्लेषण व विचार | ${SITE_CONFIG.name}`;
  const description = `${SITE_CONFIG.name} पर #${decodedTag} से संबंधित सभी ताज़ा समाचार, विशेष रिपोर्ट और गहन विश्लेषण।`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tag/${slug}`,
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug).replace(/_/g, " ");

  const [articlesData, trendingArticles, allTags] = await Promise.all([
    getArticlesByTag(slug, 1, 15),
    getTrendingArticles(5),
    getAllTags(),
  ]);

  const articles = articlesData.data;

  if (articles.length === 0 && !allTags.some((t) => t.slug === slug)) {
    notFound();
  }

  const otherTags = allTags
    .filter((t) => t.slug !== slug)
    .slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `#${decodedTag} समाचार`,
    description: `#${decodedTag} विषय से संबंधित खबरें`,
    url: `${SITE_CONFIG.url}/tag/${slug}`,
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
          name: `टैग: #${decodedTag}`,
          item: `${SITE_CONFIG.url}/tag/${slug}`,
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
          <span className="text-gray-400">टैग संग्रह</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">#{decodedTag}</span>
        </nav>

        {/* Tag Header Banner */}
        <div className="bg-[#F5F6F8] rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#E52532] text-white flex items-center justify-center font-bold">
                  <Tag className="w-4 h-4" />
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                  #{decodedTag}
                </h1>
              </div>
              <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                इस विषय से संबंधित सभी प्रकाशित समाचार, संपादकीय समीक्षाएं और ज़मीनी रिपोर्ट।
              </p>
            </div>

            {/* Other Popular Tags Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#E52532]" /> अन्य चर्चित टैग:
              </span>
              {otherTags.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tag/${t.slug}`}
                  className="text-xs font-semibold px-3 py-1 bg-white hover:bg-gray-100 text-gray-700 hover:text-[#233768] rounded-full border border-gray-300 transition-colors shadow-2xs"
                >
                  #{t.tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tag Articles (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#233768]">
              <h2 className="text-lg font-bold text-gray-900">
                प्रकाशित रिपोर्ट (कुल {articlesData.total})
              </h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                पृष्ठ 1 / 1
              </span>
            </div>

            {articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((art) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    variant="horizontal"
                    className="bg-white border border-gray-200"
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200 text-gray-500 text-sm">
                वर्तमान में इस टैग के अंतर्गत कोई अन्य लेख उपलब्ध नहीं है।
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <TrendingNews articles={trendingArticles} />
            <AdPlaceholder format="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
