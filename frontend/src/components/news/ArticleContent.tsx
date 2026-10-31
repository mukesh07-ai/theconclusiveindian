import Link from "next/link";
import { Camera, ShieldAlert } from "lucide-react";
import { Article } from "@/types/news";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { SocialShare } from "../common/SocialShare";
import { cn } from "@/lib/utils";

interface ArticleContentProps {
  article: Article;
  fontSize?: "sm" | "base" | "lg";
}

function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
}

export function ArticleContent({ article, fontSize = "base" }: ArticleContentProps) {
  const fontClasses = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-loose",
    lg: "text-lg leading-loose",
  };

  return (
    <div className="w-full">
      {/* Featured Image with Caption and Credit */}
      <figure className="mb-8 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
        <div className="relative aspect-16/10 sm:aspect-16/9 w-full">
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>
        {(article.imageCaption || article.imageCredit) && (
          <figcaption className="p-3 bg-[#F5F6F8] border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-1">
            {article.imageCaption && (
              <span className="italic">{article.imageCaption}</span>
            )}
            {article.imageCredit && (
              <span className="flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
                <Camera className="w-3 h-3" /> फोटो: {article.imageCredit}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {/* Quick Summary / Key Takeaways for AI, GEO, and fast reading */}
      {article.excerpt && (
        <div className="mb-6 p-4 rounded-xl bg-[#F5F6F8] border-l-4 border-[#E52532] text-xs sm:text-sm text-gray-800 space-y-1.5 shadow-2xs">
          <span className="font-bold text-[#E52532] uppercase tracking-wider text-[11px] block">
            ★ मुख्य बिंदु (Key Takeaways):
          </span>
          <p className="leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </div>
      )}

      {/* Article Body HTML Content */}
      <div
        className={cn(
          "article-body text-[#20242C] space-y-5 selection:bg-[#233768]/15",
          fontClasses[fontSize]
        )}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
      />

      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            संबंधित विषय (Tags):
          </h4>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag.trim().replace(/\s+/g, "_"))}`}
                className="px-3 py-1 bg-[#F5F6F8] hover:bg-[#233768] hover:text-white text-gray-700 text-xs font-medium rounded-md border border-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* End-of-article Social Share Banner */}
      <div className="mt-8">
        <SocialShare
          url={`/news/${article.slug}`}
          title={article.title}
          excerpt={article.excerpt}
          image={article.featuredImage}
          variant="banner"
        />
      </div>

      {/* Author Bio Box */}
      <div className="mt-8 p-5 bg-[#F5F6F8] rounded-xl border border-gray-200 flex items-start gap-4">
        <Link
          href={`/author/${article.author.slug}`}
          className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0 border-2 border-[#233768]/20 block hover:opacity-90 transition-opacity"
        >
          <ImageWithFallback
            src={article.author.avatar || ""}
            alt={article.author.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </Link>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-bold text-gray-900 hover:text-[#233768]">
              <Link href={`/author/${article.author.slug}`}>
                {article.author.name}
              </Link>
            </h4>
            <span className="text-xs text-[#233768] font-semibold bg-[#233768]/10 px-2 py-0.5 rounded">
              {article.author.role}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
            {article.author.bio}
          </p>
          <div className="mt-2">
            <Link
              href={`/author/${article.author.slug}`}
              className="text-[11px] font-bold text-[#233768] hover:underline"
            >
              {article.author.name} के सभी लेख देखें →
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Disclaimer */}
      <div className="mt-6 p-4 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>अस्वीकरण (Disclaimer):</strong> इस समाचार रिपोर्ट में प्रकाशित तथ्य और विश्लेषण संपादन डेस्क की निष्पक्षता और सत्यापन नीति के तहत संकलित किए गए हैं। किसी भी सुधार या सुझाव के लिए आप हमारी संपादकीय टीम से <Link href="/contact" className="underline font-semibold">संपर्क</Link> कर सकते हैं।
        </p>
      </div>
    </div>
  );
}
