import Link from "next/link";
import { Feather, Clock } from "lucide-react";
import { OpinionArticle } from "@/types/news";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface OpinionSectionProps {
  opinions: OpinionArticle[];
}

export function OpinionSection({ opinions }: OpinionSectionProps) {
  if (!opinions || opinions.length === 0) return null;

  return (
    <section className="w-full bg-[#F5F6F8] rounded-xl p-6 border border-gray-200/80 my-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-300 mb-6">
        <div className="flex items-center gap-2">
          <Feather className="w-5 h-5 text-[#233768]" />
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            संपादकीय व विचार (Opinion & Analysis)
          </h2>
        </div>
        <span className="text-xs font-semibold text-gray-500">गहन दृष्टिकोण और समीक्षा</span>
      </div>

      {/* Grid of opinions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opinions.map((op) => (
          <article
            key={op.id}
            className="bg-white rounded-lg p-5 border border-gray-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              {/* Author badge */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                  <ImageWithFallback
                    src={op.author.avatar || ""}
                    alt={op.author.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#233768] transition-colors">
                    {op.author.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 line-clamp-1">
                    {op.author.role}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#233768] line-clamp-2 leading-snug mb-2 transition-colors">
                <Link href={`/news/${op.slug}`}>&ldquo;{op.title}&rdquo;</Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {op.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {op.readTimeMinutes} मिनट पठन
              </span>
              <Link
                href={`/news/${op.slug}`}
                className="font-bold text-[#E52532] hover:underline"
              >
                पूरा लेख पढ़ें →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
