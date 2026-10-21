import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import {
  getCategoryBySlug,
  getArticlesByCategory,
  getTrendingArticles,
  getCategories,
} from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { NewsCard } from "@/components/news/NewsCard";
import { FeaturedStoryLead } from "@/components/news/FeaturedStoryLead";
import { TrendingNews } from "@/components/news/TrendingNews";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "श्रेणी नहीं मिली",
    };
  }

  return {
    title: `${category.name} समाचार (${category.englishName} News) - ${SITE_CONFIG.name}`,
    description: category.description || `${category.name} से जुड़े सभी ताज़ा समाचार`,
    openGraph: {
      title: `${category.name} - ${SITE_CONFIG.name}`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [articlesData, trendingArticles, allCategories] = await Promise.all([
    getArticlesByCategory(slug, 1, 12),
    getTrendingArticles(5),
    getCategories(),
  ]);

  const articles = articlesData.data;
  const leadArticle = articles[0];
  const gridArticles = articles.slice(1);
  const otherCategories = allCategories.filter((c) => c.slug !== slug).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#233768] hover:underline">
          होम
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">{category.name}</span>
      </nav>

      {/* Category Banner */}
      <div className="bg-[#F5F6F8] p-6 sm:p-8 rounded-2xl border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-7 bg-[#E52532] rounded-xs" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                {category.name} समाचार
              </h1>
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider hidden sm:inline-block">
                ({category.englishName})
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Related Categories Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> अन्य श्रेणियां:
            </span>
            {otherCategories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="text-xs font-semibold px-3 py-1 bg-white hover:bg-gray-100 text-gray-700 hover:text-[#233768] rounded-full border border-gray-300 transition-colors shadow-2xs"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Featured Story in this category */}
          {leadArticle && (
            <div>
              <div className="text-xs font-bold text-[#E52532] uppercase tracking-wider mb-2">
                ★ {category.name} की बड़ी खबर
              </div>
              <FeaturedStoryLead article={leadArticle} />
            </div>
          )}

          {/* Ad Banner */}
          <AdPlaceholder format="in-feed" />

          {/* Recent Articles Grid */}
          {gridArticles.length > 0 ? (
            <div>
              <h2 className="text-xl font-black text-gray-900 pb-3 border-b-2 border-gray-200 mb-6">
                हालिया खबरें ({category.name})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gridArticles.map((art) => (
                  <NewsCard key={art.id} article={art} variant="standard" />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500 text-sm">
                इस श्रेणी में वर्तमान में कोई अन्य लेख उपलब्ध नहीं है।
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <TrendingNews articles={trendingArticles} />
          <AdPlaceholder format="sidebar" />
        </div>
      </div>
    </div>
  );
}
