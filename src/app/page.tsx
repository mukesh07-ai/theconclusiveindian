import {
  getFeaturedArticles,
  getLatestArticles,
  getTrendingArticles,
  getArticlesByCategory,
  getVideoStories,
  getPhotoStories,
  getOpinionArticles,
  getCategories,
} from "@/lib/api";
import { FeaturedNewsGrid } from "@/components/news/FeaturedNewsGrid";
import { LatestNewsList } from "@/components/news/LatestNewsList";
import { TrendingNews } from "@/components/news/TrendingNews";
import { CategoryNewsSection } from "@/components/news/CategoryNewsSection";
import { VideoNewsSection } from "@/components/news/VideoNewsSection";
import { PhotoGallerySection } from "@/components/news/PhotoGallerySection";
import { OpinionSection } from "@/components/news/OpinionSection";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

export default async function HomePage() {
  const [
    featuredData,
    latestData,
    trendingArticles,
    politicsData,
    businessData,
    sportsData,
    techData,
    stateData,
    videoStories,
    photoStories,
    opinionArticles,
    categories,
  ] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(1, 6),
    getTrendingArticles(5),
    getArticlesByCategory("politics", 1, 4),
    getArticlesByCategory("business", 1, 4),
    getArticlesByCategory("sports", 1, 4),
    getArticlesByCategory("tech", 1, 4),
    getArticlesByCategory("state", 1, 4),
    getVideoStories(),
    getPhotoStories(),
    getOpinionArticles(),
    getCategories(),
  ]);

  const politicsCategory = categories.find((c) => c.slug === "politics") || categories[1];
  const businessCategory = categories.find((c) => c.slug === "business") || categories[4];
  const sportsCategory = categories.find((c) => c.slug === "sports") || categories[5];
  const techCategory = categories.find((c) => c.slug === "tech") || categories[7];
  const stateCategory = categories.find((c) => c.slug === "state") || categories[2];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-6 space-y-6 sm:space-y-8">
      {/* SECTION A: Hero Featured Stories Grid */}
      <section aria-label="मुख्य समाचार">
        <FeaturedNewsGrid
          leadArticle={featuredData.lead}
          secondaryArticles={featuredData.secondary}
          quickUpdates={latestData.data}
        />
      </section>

      {/* Top Banner Advertisement */}
      <div className="py-2">
        <AdPlaceholder format="leaderboard" />
      </div>

      {/* SECTION B & C: Latest News with Trending Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Latest News (8 Cols) */}
        <div className="lg:col-span-8">
          <LatestNewsList
            initialArticles={latestData.data}
            initialHasMore={latestData.hasMore}
          />
        </div>

        {/* Trending Stories Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <TrendingNews articles={trendingArticles} />
          <AdPlaceholder format="sidebar" />
        </div>
      </div>

      {/* SECTION D1: Politics (राजनीति) */}
      <CategoryNewsSection
        category={politicsCategory}
        articles={politicsData.data}
        layout="split"
        accentColor="#E52532"
      />

      {/* SECTION E: Video News Bulletin */}
      <VideoNewsSection videos={videoStories} />

      {/* SECTION D2: Business (व्यापार व अर्थव्यवस्था) */}
      <CategoryNewsSection
        category={businessCategory}
        articles={businessData.data}
        layout="grid"
        accentColor="#233768"
      />

      {/* In-feed Ad Banner */}
      <div className="py-2">
        <AdPlaceholder format="in-feed" />
      </div>

      {/* SECTION F: Opinion & Analysis (संपादकीय व विचार) */}
      <OpinionSection opinions={opinionArticles} />

      {/* SECTION D3: Sports (खेल जगत) & Tech (टेक्नोलॉजी) in 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CategoryNewsSection
            category={sportsCategory}
            articles={sportsData.data}
            layout="split"
            accentColor="#16a34a"
          />
        </div>
        <div>
          <CategoryNewsSection
            category={techCategory}
            articles={techData.data}
            layout="split"
            accentColor="#7c3aed"
          />
        </div>
      </div>

      {/* SECTION D4: State News (राज्य समाचार) */}
      <CategoryNewsSection
        category={stateCategory}
        articles={stateData.data}
        layout="grid"
        accentColor="#ea580c"
      />

      {/* SECTION E2: Photo Gallery Stories */}
      <PhotoGallerySection photos={photoStories} />
    </div>
  );
}
