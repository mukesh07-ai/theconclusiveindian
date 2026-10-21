import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Category, Article } from "@/types/news";
import { NewsCard } from "./NewsCard";
import { cn } from "@/lib/utils";

interface CategoryNewsSectionProps {
  category: Category;
  articles: Article[];
  layout?: "split" | "grid";
  accentColor?: string;
  className?: string;
}

export function CategoryNewsSection({
  category,
  articles,
  layout = "split",
  accentColor = "#233768",
  className,
}: CategoryNewsSectionProps) {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className={cn("w-full py-4", className)}>
      {/* Category Section Header */}
      <div className="flex items-center justify-between pb-2.5 border-b-2 border-gray-200 mb-5">
        <div className="flex items-baseline gap-2">
          <div
            className="w-1.5 h-5 rounded-xs"
            style={{ backgroundColor: accentColor }}
          />
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            {category.name}
          </h2>
          <span className="text-xs font-semibold text-gray-400 hidden sm:inline-block">
            / {category.englishName}
          </span>
        </div>

        <Link
          href={`/category/${category.slug}`}
          className="text-xs font-bold text-[#233768] hover:text-[#E52532] flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          सभी खबरें देखें <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Layout Option 1: Split (1 large + 3 side items) */}
      {layout === "split" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            <NewsCard article={leadArticle} variant="standard" />
          </div>
          <div className="lg:col-span-5 flex flex-col divide-y divide-gray-100 bg-white rounded-lg p-3 border border-gray-100 shadow-2xs">
            {sideArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="compact"
                className="py-2.5"
              />
            ))}
          </div>
        </div>
      )}

      {/* Layout Option 2: 3-column / 4-column balanced grid */}
      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      )}
    </section>
  );
}
