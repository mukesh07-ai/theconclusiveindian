"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Zap, Flame, Pause, Play } from "lucide-react";
import { BreakingNewsItem, Article } from "@/types/news";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface UnifiedTickerItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  type: "breaking" | "trending";
}

export interface BreakingNewsTickerProps {
  items?: BreakingNewsItem[];
  breakingItems?: BreakingNewsItem[];
  trendingItems?: Article[];
  variant?: "standalone" | "masthead" | "mobile-slim";
  className?: string;
}

export function BreakingNewsTicker({
  items,
  breakingItems = [],
  trendingItems = [],
  variant = "standalone",
  className,
}: BreakingNewsTickerProps) {
  const { t, language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  // Combine breaking items and trending items into an alternating, rich ticker feed
  const combinedItems = useMemo<UnifiedTickerItem[]>(() => {
    const rawBreaking = breakingItems.length > 0 ? breakingItems : items || [];
    const result: UnifiedTickerItem[] = [];

    const maxLen = Math.max(rawBreaking.length, trendingItems.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < rawBreaking.length) {
        const b = rawBreaking[i];
        result.push({
          id: `break-${b.id || i}`,
          title: b.title,
          slug: b.slug,
          category: b.category,
          type: "breaking",
        });
      }
      if (i < trendingItems.length) {
        const tr = trendingItems[i];
        result.push({
          id: `trend-${tr.id || i}`,
          title: tr.title,
          slug: tr.slug,
          category: language === "en" ? tr.category?.englishName || "Trending" : tr.category?.name || "ट्रेंडिंग",
          type: "trending",
        });
      }
    }

    return result;
  }, [items, breakingItems, trendingItems, language]);

  if (combinedItems.length === 0) return null;

  // Duplicate items for a seamless, continuous infinite CSS marquee loop
  const duplicatedItems = [...combinedItems, ...combinedItems];

  // Masthead Inline Variant (Occupies empty space next to logo in header)
  if (variant === "masthead") {
    return (
      <div
        aria-label={t("ताज़ा और ट्रेंडिंग समाचार टिकर", "Breaking and Trending News Ticker")}
        className={cn(
          "relative flex items-center h-10 w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors rounded-full border border-gray-200/90 shadow-2xs px-2.5 py-1 select-none overflow-hidden group",
          className
        )}
      >
        {/* Fixed Left Live Badge */}
        <div className="shrink-0 z-10 flex items-center gap-1.5 bg-[#E01F26] text-white px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-2xs mr-2 border border-white/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300" />
          </span>
          <span className="flex items-center gap-1 font-black">
            <Zap className="w-3 h-3 fill-current text-yellow-300" />
            <span>{t("ताज़ा", "Live")}</span>
          </span>
        </div>

        {/* Continuous Scrolling Marquee Viewport */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Left & Right Gradient Shadows for seamless fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 group-hover:from-[#F1F5F9]" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 group-hover:from-[#F1F5F9]" />

          {/* Scrolling Content Track */}
          <div
            className={cn(
              "flex items-center gap-6 text-[13px] font-medium whitespace-nowrap will-change-transform",
              "animate-ticker",
              isPaused && "!animate-none [animation-play-state:paused]"
            )}
            style={{
              animationDuration: `${Math.max(35, combinedItems.length * 5.5)}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedItems.map((item, index) => {
              const isBreaking = item.type === "breaking";

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center gap-2 shrink-0 group/item"
                >
                  {/* Category / Type Chip */}
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0",
                      isBreaking
                        ? "bg-red-100 text-[#E01F26] border border-red-200"
                        : "bg-slate-200/70 text-[#263565] border border-slate-300/60"
                    )}
                  >
                    {isBreaking ? (
                      <>
                        <Zap className="w-2.5 h-2.5 fill-current text-[#E01F26]" />
                        <span>{t("ब्रेकिंग", "Breaking")}</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-2.5 h-2.5 fill-current text-amber-500" />
                        <span>{t("ट्रेंडिंग", "Trending")}</span>
                      </>
                    )}
                  </span>

                  {/* Headline Title */}
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-[#1C2C4E] hover:text-[#E01F26] hover:underline transition-colors font-semibold"
                    title={item.title}
                  >
                    {item.title}
                  </Link>

                  {/* Divider bullet */}
                  <span className="text-gray-300 font-bold ml-3 mr-1 select-none">
                    •
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pause/Play Toggle Button on Right */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
          title={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
          className="shrink-0 ml-1.5 p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors cursor-pointer"
        >
          {isPaused ? <Play className="w-3 h-3 text-[#E01F26]" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    );
  }

  // Mobile Slim Variant (Super compact 28px height, saves maximum space)
  if (variant === "mobile-slim") {
    return (
      <aside
        aria-label={t("ताज़ा समाचार टिकर", "Live News Ticker")}
        className={cn(
          "flex items-center h-7 bg-[#E01F26] text-white text-[11px] px-2 select-none overflow-hidden border-b border-[#b81722]",
          className
        )}
      >
        <div className="shrink-0 z-10 flex items-center gap-1 font-bold bg-[#b81722] px-1.5 py-0.5 rounded text-[10px] mr-1.5 border border-white/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-80" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-300" />
          </span>
          <span className="uppercase">{t("लाइव", "Live")}</span>
        </div>

        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className={cn(
              "flex items-center gap-4 text-[11px] font-medium whitespace-nowrap will-change-transform",
              "animate-ticker",
              isPaused && "!animate-none [animation-play-state:paused]"
            )}
            style={{
              animationDuration: `${Math.max(30, combinedItems.length * 5)}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div key={`m-${item.id}-${index}`} className="inline-flex items-center gap-1.5 shrink-0">
                <Link
                  href={`/news/${item.slug}`}
                  className="hover:underline text-white font-medium"
                  title={item.title}
                >
                  {item.title}
                </Link>
                <span className="text-white/40 ml-2 select-none">•</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  // Standalone Full-Width Variant (Classic Fallback)
  return (
    <aside
      aria-label={t("ब्रेकिंग और ट्रेंडिंग समाचार टिकर", "Breaking and Trending News Ticker")}
      className={cn(
        "w-full bg-[#E01F26] text-white shadow-xs relative overflow-hidden select-none border-y border-[#b81722]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center h-9 sm:h-9.5 px-2 sm:px-4">
        {/* Fixed Left Badge */}
        <div className="shrink-0 z-10 flex items-center gap-1.5 bg-[#b81722] text-white px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-sm mr-2 sm:mr-3 border border-white/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300" />
          </span>
          <span className="hidden xs:inline">
            {t("ताज़ा व ट्रेंडिंग", "Breaking & Trending")}
          </span>
          <span className="xs:hidden">
            {t("ताज़ा", "Live")}
          </span>
        </div>

        {/* Continuous Scrolling Marquee Viewport */}
        <div
          className="flex-1 overflow-hidden relative group cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Subtle Left & Right Gradient Shadows for seamless fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#E01F26] to-transparent z-1" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#E01F26] to-transparent z-1" />

          {/* Scrolling Content Track */}
          <div
            className={cn(
              "flex items-center gap-6 text-xs sm:text-[13px] font-medium whitespace-nowrap will-change-transform",
              "animate-ticker",
              isPaused && "!animate-none [animation-play-state:paused]"
            )}
            style={{
              animationDuration: `${Math.max(35, combinedItems.length * 5.5)}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedItems.map((item, index) => {
              const isBreaking = item.type === "breaking";

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center gap-2 shrink-0 group/item"
                >
                  {/* Category / Type Chip */}
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0",
                      isBreaking
                        ? "bg-black/30 text-yellow-300 border border-yellow-300/30"
                        : "bg-white/20 text-white border border-white/25"
                    )}
                  >
                    {isBreaking ? (
                      <>
                        <Zap className="w-2.5 h-2.5 fill-current text-yellow-300" />
                        <span>{t("ब्रेकिंग", "Breaking")}</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-2.5 h-2.5 fill-current text-amber-200" />
                        <span>{t("ट्रेंडिंग", "Trending")}</span>
                      </>
                    )}
                  </span>

                  {/* Headline Title */}
                  <Link
                    href={`/news/${item.slug}`}
                    className="hover:underline hover:text-yellow-200 transition-colors font-semibold"
                    title={item.title}
                  >
                    {item.title}
                  </Link>

                  {/* Divider bullet */}
                  <span className="text-white/40 font-bold ml-3 mr-1 select-none">
                    •
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pause/Play Toggle Button on Right */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
          title={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
          className="shrink-0 ml-2 p-1 text-white/80 hover:text-white hover:bg-black/20 rounded transition-colors cursor-pointer touch-manipulation"
        >
          {isPaused ? <Play className="w-3 h-3 text-yellow-300" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </aside>
  );
}
