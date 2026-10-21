import Link from "next/link";
import { TrendingUp, Clock } from "lucide-react";
import { Article } from "@/types/news";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";
import { cn } from "@/lib/utils";

interface TrendingNewsProps {
  articles: Article[];
  className?: string;
}

export function TrendingNews({ articles, className }: TrendingNewsProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-5 shadow-xs",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
        <h3 className="text-base font-extrabold text-[#20242C] flex items-center gap-2 uppercase tracking-wide">
          <TrendingUp className="w-5 h-5 text-[#E52532]" />
          ट्रेंडिंग खबरें (Trending Stories)
        </h3>
        <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          सर्वाधिक चर्चित
        </span>
      </div>

      {/* Numbered List */}
      <div className="divide-y divide-gray-100">
        {articles.map((article, index) => {
          const rank = (index + 1).toString().padStart(2, "0");
          const isTop3 = index < 3;

          return (
            <article key={article.id} className="py-3.5 first:pt-1 last:pb-1 group">
              <div className="flex items-start gap-3.5">
                {/* Big Number rank */}
                <span
                  className={cn(
                    "text-2xl font-black shrink-0 w-8 leading-none mt-0.5",
                    isTop3 ? "text-[#E52532]" : "text-gray-300"
                  )}
                >
                  {rank}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/category/${article.category.slug}`}
                      className="text-[11px] font-bold text-[#233768] hover:underline uppercase"
                    >
                      {article.category.name}
                    </Link>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatRelativeTimeHindi(article.publishedAt)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#233768] line-clamp-2 leading-snug transition-colors">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h4>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
