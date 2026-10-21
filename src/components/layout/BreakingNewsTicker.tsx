"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
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

const CATEGORY_MAP: Record<string, { hi: string; en: string }> = {
  राजनीति: { hi: "राजनीति", en: "Politics" },
  व्यापार: { hi: "व्यापार", en: "Business" },
  टेक्नोलॉजी: { hi: "टेक्नोलॉजी", en: "Tech" },
  खेल: { hi: "खेल", en: "Sports" },
  कृषि: { hi: "कृषि", en: "Agriculture" },
  मनोरंजन: { hi: "मनोरंजन", en: "Cinema" },
  राष्ट्रीय: { hi: "राष्ट्रीय", en: "National" },
  अंतर्राष्ट्रीय: { hi: "अंतर्राष्ट्रीय", en: "World" },
};

export function BreakingNewsTicker({
  items,
  breakingItems = [],
  trendingItems = [],
  variant = "standalone",
  className,
}: BreakingNewsTickerProps) {
  const { t } = useLanguage();
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
          category: tr.category?.name || "ट्रेंडिंग",
          type: "trending",
        });
      }
    }

    return result;
  }, [items, breakingItems, trendingItems]);

  if (combinedItems.length === 0) return null;

  // Duplicate items for a seamless, continuous infinite CSS marquee loop
  const duplicatedItems = [...combinedItems, ...combinedItems];

  const getCategoryLabel = (rawCategory?: string, isBreaking = false) => {
    if (!rawCategory) {
      return isBreaking ? t("ब्रेकिंग", "Breaking") : t("ट्रेंडिंग", "Trending");
    }
    const mapped = CATEGORY_MAP[rawCategory];
    if (mapped) {
      return t(mapped.hi, mapped.en);
    }
    return rawCategory;
  };

  // Masthead Inline Variant (Occupies empty space next to logo in desktop header)
  if (variant === "masthead") {
    return (
      <div
        aria-label={t("ताज़ा और ट्रेंडिंग समाचार टिकर", "Breaking and Trending News Ticker")}
        suppressHydrationWarning
        className={cn(
          "relative flex items-center h-9 sm:h-9.5 w-full bg-[#F8FAFC] hover:bg-slate-100/90 transition-all duration-200 rounded-lg border border-slate-200/90 hover:border-slate-300/90 shadow-2xs px-2.5 select-none overflow-hidden group",
          className
        )}
      >
        {/* Left Fixed Minimalist Live Badge */}
        <div className="shrink-0 z-20 flex items-center bg-[#F8FAFC] group-hover:bg-slate-100/90 transition-colors pr-1.5">
          <div className="flex items-center gap-1.5 bg-[#E01F26] text-white px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span suppressHydrationWarning className="leading-none">{t("लाइव", "LIVE")}</span>
          </div>
          <div className="h-3.5 w-px bg-slate-300/80 shrink-0 mx-2.5 select-none" />
        </div>

        {/* Continuous Scrolling Marquee Viewport */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Smooth Left & Right Gradient Shadows for seamless fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 group-hover:from-slate-100/90 group-hover:via-slate-100/70 to-transparent z-10 transition-colors" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 group-hover:from-slate-100/90 group-hover:via-slate-100/70 to-transparent z-10 transition-colors" />

          {/* Scrolling Content Track */}
          <div
            className={cn(
              "flex items-center text-[13px] font-medium whitespace-nowrap will-change-transform",
              "animate-ticker",
              isPaused && "!animate-none [animation-play-state:paused]"
            )}
            style={{
              animationDuration: `${Math.max(35, combinedItems.length * 6)}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedItems.map((item, index) => {
              const isBreaking = item.type === "breaking";
              const catLabel = getCategoryLabel(item.category, isBreaking);

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center shrink-0 group/item"
                >
                  {/* Subtle Category Micro-Tag */}
                  <span
                    suppressHydrationWarning
                    className={cn(
                      "text-[10px] font-bold tracking-wider uppercase shrink-0 transition-colors select-none px-1.5 py-0.5 rounded",
                      isBreaking
                        ? "bg-red-50 text-[#E01F26] border border-red-200/60"
                        : "bg-slate-200/50 text-slate-600 border border-slate-300/50"
                    )}
                  >
                    {catLabel}
                  </span>

                  {/* Headline Title */}
                  <Link
                    href={`/news/${item.slug}`}
                    className="ml-2 text-[12.5px] font-medium text-slate-800 group-hover/item:text-[#E01F26] transition-colors leading-none tracking-normal"
                    title={item.title}
                  >
                    {item.title}
                  </Link>

                  {/* Elegant Dot Separator between stories */}
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-5 shrink-0 select-none group-hover/item:bg-[#E01F26]/40 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimalist Pause/Play Control on Right */}
        <div className="shrink-0 z-20 flex items-center bg-[#F8FAFC] group-hover:bg-slate-100/90 transition-colors pl-1.5">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
            title={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
            suppressHydrationWarning
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3 h-3 text-[#E01F26] fill-current" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    );
  }

  // Mobile Slim Variant (Sleek 28px height, modern deep navy aesthetic)
  if (variant === "mobile-slim") {
    return (
      <aside
        aria-label={t("ताज़ा समाचार टिकर", "Live News Ticker")}
        suppressHydrationWarning
        className={cn(
          "flex items-center h-7 bg-[#1c274c] text-white text-[11px] px-2.5 select-none overflow-hidden border-b border-[#141d38]",
          className
        )}
      >
        {/* Left Mobile Live Badge */}
        <div className="shrink-0 z-20 flex items-center bg-[#1c274c] pr-1.5">
          <div className="flex items-center gap-1 bg-[#E01F26] text-white px-1.5 py-0.5 rounded text-[9.5px] font-bold tracking-wider uppercase shadow-2xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span suppressHydrationWarning className="leading-none">{t("लाइव", "Live")}</span>
          </div>
        </div>

        {/* Marquee Viewport */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#1c274c] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-[#1c274c] to-transparent z-10" />

          <div
            className={cn(
              "flex items-center gap-2 text-[11px] whitespace-nowrap will-change-transform",
              "animate-ticker",
              isPaused && "!animate-none [animation-play-state:paused]"
            )}
            style={{
              animationDuration: `${Math.max(30, combinedItems.length * 5)}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedItems.map((item, index) => {
              const isBreaking = item.type === "breaking";
              const catLabel = getCategoryLabel(item.category, isBreaking);

              return (
                <div key={`m-${item.id}-${index}`} className="inline-flex items-center shrink-0">
                  <span
                    suppressHydrationWarning
                    className="text-[#fca5a5] font-semibold text-[10px] uppercase tracking-wider"
                  >
                    {catLabel}
                  </span>
                  <span className="text-white/40 text-[10px] mx-1">:</span>
                  <Link
                    href={`/news/${item.slug}`}
                    className="hover:underline text-white/95 font-normal"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-white/30 mx-2.5 shrink-0 select-none" />
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  // Standalone Full-Width Variant (Clean & Modern Editorial Fallback)
  return (
    <aside
      aria-label={t("ब्रेकिंग और ट्रेंडिंग समाचार टिकर", "Breaking and Trending News Ticker")}
      className={cn(
        "w-full bg-[#E01F26] text-white shadow-xs relative overflow-hidden select-none border-y border-[#b81722]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center h-9 sm:h-9.5 px-3 sm:px-4">
        {/* Fixed Left Badge */}
        <div className="shrink-0 z-20 flex items-center bg-[#E01F26] pr-2">
          <div className="flex items-center gap-1.5 bg-[#b81722] text-white px-2.5 py-0.5 rounded text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase shadow-xs border border-white/15">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span suppressHydrationWarning>{t("लाइव अपडेट्स", "Live Updates")}</span>
          </div>
          <div className="h-3.5 w-px bg-white/20 shrink-0 mx-2.5 select-none" />
        </div>

        {/* Continuous Scrolling Marquee Viewport */}
        <div
          className="flex-1 overflow-hidden relative group cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#E01F26] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#E01F26] to-transparent z-10" />

          {/* Scrolling Content Track */}
          <div
            className={cn(
              "flex items-center gap-2 text-xs sm:text-[13px] font-medium whitespace-nowrap will-change-transform",
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
              const catLabel = getCategoryLabel(item.category, isBreaking);

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center shrink-0 group/item"
                >
                  <span
                    suppressHydrationWarning
                    className="text-amber-200 font-bold text-[10.5px] uppercase tracking-wider"
                  >
                    {catLabel}
                  </span>
                  <span className="text-white/40 mx-1.5 select-none">:</span>
                  <Link
                    href={`/news/${item.slug}`}
                    className="hover:underline text-white font-medium hover:text-white/90 transition-colors"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 mx-3.5 shrink-0 select-none" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pause/Play Toggle Button on Right */}
        <div className="shrink-0 z-20 flex items-center bg-[#E01F26] pl-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
            title={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
            suppressHydrationWarning
            className="p-1 text-white/80 hover:text-white hover:bg-black/20 rounded transition-colors cursor-pointer touch-manipulation"
          >
            {isPaused ? <Play className="w-3 h-3 text-white fill-current" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </aside>
  );
}

