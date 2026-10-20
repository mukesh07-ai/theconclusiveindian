import Link from "next/link";
import { Clock, User, Eye } from "lucide-react";
import { Article } from "@/types/news";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { Badge } from "../common/Badge";

interface FeaturedStoryLeadProps {
  article: Article;
}

export function FeaturedStoryLead({ article }: FeaturedStoryLeadProps) {
  const timeAgo = formatRelativeTimeHindi(article.publishedAt);

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Mobile view: Image with bottom dark gradient overlay containing badge and headline */}
      <div className="md:hidden relative aspect-16/10 w-full overflow-hidden bg-gray-900">
        <Link href={`/news/${article.slug}`}>
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="breaking" size="sm">
                {article.category.name}
              </Badge>
              {article.isBreaking && (
                <span className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1">
                  ● बड़ी खबर
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white line-clamp-3 leading-snug drop-shadow-xs">
              {article.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-gray-300 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-400" /> {timeAgo}
              </span>
              <span>•</span>
              <span>{article.author.name}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Desktop view: High-res hero image + editorial content below */}
      <div className="hidden md:block">
        <Link
          href={`/news/${article.slug}`}
          className="relative block aspect-16/9 w-full overflow-hidden bg-gray-100"
        >
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="breaking" size="md">
              {article.category.name}
            </Badge>
            {article.isBreaking && (
              <Badge variant="live" size="md">
                लाइव अपडेट
              </Badge>
            )}
          </div>
        </Link>

        <div className="p-5 lg:p-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold text-gray-800">
                <User className="w-3.5 h-3.5 text-[#233768]" /> {article.author.name}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="w-3.5 h-3.5" /> {timeAgo}
              </span>
              {article.readTimeMinutes && (
                <>
                  <span>•</span>
                  <span>{article.readTimeMinutes} मिनट पठन</span>
                </>
              )}
            </div>
            {article.viewCount && (
              <span className="hidden lg:flex items-center gap-1 text-gray-500">
                <Eye className="w-3.5 h-3.5" /> {article.viewCount.toLocaleString("hi-IN")}
              </span>
            )}
          </div>

          <h2 className="text-xl lg:text-2xl xl:text-3xl font-extrabold text-[#20242C] group-hover:text-[#233768] leading-tight mb-3 transition-colors">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E52532] hover:text-[#b81722] uppercase tracking-wider"
            >
              विस्तार से पढ़ें →
            </Link>
            <div className="flex items-center gap-2">
              {article.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-gray-500 hover:text-[#233768]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
