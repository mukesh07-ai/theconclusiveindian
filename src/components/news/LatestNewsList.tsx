"use client";

import { useState } from "react";
import { RefreshCw, ChevronRight } from "lucide-react";
import { Article } from "@/types/news";
import { getLatestArticles } from "@/lib/api";
import { NewsCard } from "./NewsCard";

interface LatestNewsListProps {
  initialArticles: Article[];
  initialHasMore: boolean;
}

export function LatestNewsList({
  initialArticles,
  initialHasMore,
}: LatestNewsListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const res = await getLatestArticles(nextPage, 6);
      setArticles((prev) => [...prev, ...res.data]);
      setPage(nextPage);
      setHasMore(res.hasMore);
    } catch {
      // Handle gracefully
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#233768] mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#E52532] rounded-xs" />
          <h2 className="text-xl sm:text-2xl font-black text-[#20242C] tracking-tight">
            ताज़ा ख़बरें (Latest News)
          </h2>
        </div>
        <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block">
          हर पल की ताज़ा रिपोर्ट
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            variant="standard"
            className="h-full"
          />
        ))}
      </div>

      {/* Interactive Load More Button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-[#233768] hover:text-[#E52532] font-bold text-sm rounded-lg border-2 border-[#233768]/20 hover:border-[#E52532] transition-all shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#E52532]" />
                लोड हो रहा है...
              </>
            ) : (
              <>
                और खबरें लोड करें (Load More)
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
