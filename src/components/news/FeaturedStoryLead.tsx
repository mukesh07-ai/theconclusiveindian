import Link from "next/link";
import { Clock, User, Eye, ChevronRight } from "lucide-react";
import { Article } from "@/types/news";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { Badge } from "../common/Badge";
import { SocialShare } from "../common/SocialShare";

interface FeaturedStoryLeadProps {
  article: Article;
}

export function FeaturedStoryLead({ article }: FeaturedStoryLeadProps) {
  const timeAgo = formatRelativeTimeHindi(article.publishedAt);

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Mobile view: Matches reference screenshot with top category badge and bottom overlay */}
      <div className="md:hidden">
        <Link
          href={`/news/${article.slug}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-gray-900 rounded-xl"
        >
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 750px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Top Corner Category Badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="bg-[#E01F26] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wide">
              {article.category.name}
            </span>
            {article.isBreaking && (
              <span className="bg-yellow-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                बड़ी खबर
              </span>
            )}
          </div>

          {/* Bottom Dark Gradient Overlay with Headline */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-3.5 sm:p-4 z-10">
            <div className="flex items-end justify-between gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white line-clamp-3 leading-snug drop-shadow-md">
                {article.title}
              </h2>
              <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 mb-0.5 group-hover:bg-[#E01F26] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
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
            <div className="flex items-center gap-3">
              <SocialShare
                url={`/news/${article.slug}`}
                title={article.title}
                excerpt={article.excerpt}
                image={article.featuredImage}
                variant="compact"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
