"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import { Article } from "@/types/news";
import { formatHindiDate } from "@/lib/dateFormat";
import { Badge } from "../common/Badge";
import { SocialShare } from "../common/SocialShare";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface ArticleHeaderProps {
  article: Article;
  onFontSizeChange?: (size: "sm" | "base" | "lg") => void;
}

export function ArticleHeader({ article, onFontSizeChange }: ArticleHeaderProps) {
  const [currentFontSize, setCurrentFontSize] = useState<"sm" | "base" | "lg">("base");

  const handleSizeClick = (size: "sm" | "base" | "lg") => {
    setCurrentFontSize(size);
    if (onFontSizeChange) {
      onFontSizeChange(size);
    }
  };

  const articleUrl = `/news/${article.slug}`;

  return (
    <header className="w-full pb-4 border-b border-gray-200 mb-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 flex-wrap">
        <Link href="/" className="hover:text-[#233768] hover:underline">
          होम
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link
          href={`/category/${article.category.slug}`}
          className="hover:text-[#233768] hover:underline font-medium"
        >
          {article.category.name}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400 truncate max-w-[200px] sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Category Badge & Breaking tag */}
      <div className="flex items-center gap-2 mb-3">
        <Link href={`/category/${article.category.slug}`}>
          <Badge variant="breaking" size="md">
            {article.category.name}
          </Badge>
        </Link>
        {article.isBreaking && (
          <Badge variant="live" size="md">
            ब्रेकिंग न्यूज़
          </Badge>
        )}
      </div>

      {/* Primary H1 Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20242C] leading-tight mb-4 tracking-tight">
        {article.title}
      </h1>

      {/* Excerpt / Subheading */}
      {article.excerpt && (
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal mb-5">
          {article.excerpt}
        </p>
      )}

      {/* Author & Publication Timestamps */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-y border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
            <ImageWithFallback
              src={article.author.avatar || ""}
              alt={article.author.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">
              {article.author.name}
            </div>
            <div className="text-[11px] text-gray-500">{article.author.role}</div>
          </div>
        </div>

        <div className="flex flex-col sm:items-end text-[11px] space-y-0.5">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>प्रकाशित: {formatHindiDate(article.publishedAt)}</span>
          </div>
          {article.updatedAt && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>अपडेट: {formatHindiDate(article.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Toolbar: Social Share + Font Resizer */}
      <div className="flex items-center justify-between gap-4 pt-3 flex-wrap">
        <SocialShare
          url={articleUrl}
          title={article.title}
          excerpt={article.excerpt}
          image={article.featuredImage}
        />

        {/* Text Size Resizer */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="font-medium mr-1">फॉन्ट साइज:</span>
          <button
            type="button"
            onClick={() => handleSizeClick("sm")}
            className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
              currentFontSize === "sm"
                ? "bg-[#233768] text-white border-[#233768]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => handleSizeClick("base")}
            className={`px-2 py-0.5 rounded border text-xs font-bold ${
              currentFontSize === "base"
                ? "bg-[#233768] text-white border-[#233768]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            A
          </button>
          <button
            type="button"
            onClick={() => handleSizeClick("lg")}
            className={`px-2 py-0.5 rounded border text-sm font-bold ${
              currentFontSize === "lg"
                ? "bg-[#233768] text-white border-[#233768]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            A+
          </button>
        </div>
      </div>
    </header>
  );
}
