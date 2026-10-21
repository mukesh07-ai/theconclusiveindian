import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { Article } from "@/types/news";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { Badge } from "../common/Badge";
import { SocialShare } from "../common/SocialShare";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: Article;
  variant?: "standard" | "horizontal" | "compact" | "overlay";
  className?: string;
  showExcerpt?: boolean;
}

export function NewsCard({
  article,
  variant = "standard",
  className,
  showExcerpt = true,
}: NewsCardProps) {
  const timeAgo = formatRelativeTimeHindi(article.publishedAt);

  if (variant === "compact") {
    return (
      <article className={cn("flex gap-3 group items-start py-2.5", className)}>
        <Link
          href={`/news/${article.slug}`}
          className="relative w-20 h-16 sm:w-24 sm:h-18 rounded overflow-hidden shrink-0 bg-gray-100"
        >
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            href={`/category/${article.category.slug}`}
            className="text-[11px] font-bold text-[#E52532] hover:underline uppercase tracking-wide inline-block mb-1"
          >
            {article.category.name}
          </Link>
          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#233768] line-clamp-2 transition-colors">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h4>
          <span className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {timeAgo}
          </span>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "flex flex-col sm:flex-row gap-4 group p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50/50 transition-all",
          className
        )}
      >
        <Link
          href={`/news/${article.slug}`}
          className="relative w-full sm:w-48 md:w-56 h-40 sm:h-32 rounded-lg overflow-hidden shrink-0 bg-gray-100 shadow-2xs"
        >
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge size="sm" variant="primary">
              {article.category.name}
            </Badge>
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
            <span className="font-medium text-gray-700">{article.author.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {timeAgo}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#233768] line-clamp-2 transition-colors mb-1.5">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
          {showExcerpt && (
            <p className="text-xs text-gray-600 line-clamp-2 hidden sm:block">
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    );
  }

  if (variant === "overlay") {
    return (
      <article
        className={cn(
          "relative rounded-lg overflow-hidden group shadow-sm bg-gray-900 min-h-[220px]",
          className
        )}
      >
        <ImageWithFallback
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
          <div className="mb-2">
            <Badge size="sm" variant="breaking">
              {article.category.name}
            </Badge>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:underline line-clamp-2 transition-all">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-gray-300 mt-2">
            <span>{timeAgo}</span>
            {article.viewCount && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {article.viewCount.toLocaleString("hi-IN")}
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article
      className={cn(
        "flex flex-col group rounded-lg overflow-hidden border border-gray-100 bg-white shadow-2xs hover:shadow-md transition-all",
        className
      )}
    >
      <Link
        href={`/news/${article.slug}`}
        className="relative w-full aspect-16/10 overflow-hidden bg-gray-100"
      >
        <ImageWithFallback
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5">
          <Badge size="sm" variant="primary">
            {article.category.name}
          </Badge>
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="font-medium text-gray-700">{article.author.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {timeAgo}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#233768] line-clamp-2 transition-colors mb-2">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
          {showExcerpt && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="pt-2.5 mt-2 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={`/news/${article.slug}`}
            className="text-[11px] font-bold text-[#E01F26] hover:underline"
          >
            पढ़ें →
          </Link>
          <SocialShare
            url={`/news/${article.slug}`}
            title={article.title}
            excerpt={article.excerpt}
            image={article.featuredImage}
            variant="compact"
          />
        </div>
      </div>
    </article>
  );
}
