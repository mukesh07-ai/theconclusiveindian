import { Article } from "@/types/news";
import { TrendingNews } from "./TrendingNews";
import { AdPlaceholder } from "../common/AdPlaceholder";
import { NewsCard } from "./NewsCard";

interface ArticleSidebarProps {
  trendingArticles: Article[];
  latestArticles: Article[];
}

export function ArticleSidebar({
  trendingArticles,
  latestArticles,
}: ArticleSidebarProps) {
  return (
    <aside className="w-full space-y-6">
      {/* Advertisement MPU */}
      <AdPlaceholder format="sidebar" />

      {/* Trending Stories */}
      <TrendingNews articles={trendingArticles} />

      {/* Recommended Reads */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
        <h3 className="text-sm font-extrabold text-[#20242C] pb-3 border-b border-gray-200 mb-3 uppercase tracking-wide">
          अन्य प्रमुख खबरें
        </h3>
        <div className="divide-y divide-gray-100">
          {latestArticles.slice(0, 4).map((art) => (
            <NewsCard
              key={art.id}
              article={art}
              variant="compact"
              className="py-2.5"
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
