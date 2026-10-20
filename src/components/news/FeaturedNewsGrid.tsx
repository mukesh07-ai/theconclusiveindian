import Link from "next/link";
import { Zap, ChevronRight, Clock } from "lucide-react";
import { Article } from "@/types/news";
import { FeaturedStoryLead } from "./FeaturedStoryLead";
import { NewsCard } from "./NewsCard";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";

interface FeaturedNewsGridProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  quickUpdates: Article[];
}

export function FeaturedNewsGrid({
  leadArticle,
  secondaryArticles,
  quickUpdates,
}: FeaturedNewsGridProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Lead Story (Left 7 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <FeaturedStoryLead article={leadArticle} />
        </div>

        {/* Secondary Featured Stories + Quick Bullet Feed (Right 5 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
          {/* Top 2 Secondary Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {secondaryArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="horizontal"
                showExcerpt={false}
                className="bg-white border border-gray-200"
              />
            ))}
          </div>

          {/* Quick News Highlights Widget */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <h3 className="text-sm font-bold text-[#233768] flex items-center gap-1.5 uppercase tracking-wide">
                <Zap className="w-4 h-4 text-[#E52532] fill-current" />
                ताज़ा फटाफट (Quick Briefs)
              </h3>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="divide-y divide-gray-100">
              {quickUpdates.slice(0, 4).map((item) => (
                <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 group">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-bold text-[#E52532] uppercase">
                      {item.category.name}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <Clock className="w-2.5 h-2.5" />
                      {formatRelativeTimeHindi(item.publishedAt)}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900 group-hover:text-[#233768] line-clamp-2 transition-colors">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h4>
                </div>
              ))}
            </div>

            <div className="pt-3 mt-2 border-t border-gray-100">
              <Link
                href="/category/national"
                className="text-xs font-bold text-[#233768] hover:text-[#E52532] flex items-center justify-end gap-1 transition-colors"
              >
                सभी ताज़ा अपडेट देखें <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
