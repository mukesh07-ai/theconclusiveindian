"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { BreakingNewsItem, Article } from "@/types/news";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface UnifiedTickerItem {
  id: string;
  tickerKey: string;
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

const DEFAULT_BREAKING_ITEMS: BreakingNewsItem[] = [];
const DEFAULT_TRENDING_ITEMS: Article[] = [];

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

function getCategoryLabel(
  rawCategory: string | undefined,
  isBreaking: boolean,
  t: (hiText: string, enText: string) => string
): string {
  if (!rawCategory) {
    return isBreaking ? t("ब्रेकिंग", "Breaking") : t("ट्रेंडिंग", "Trending");
  }
  const mapped = CATEGORY_MAP[rawCategory];
  if (mapped) {
    return t(mapped.hi, mapped.en);
  }
  return rawCategory;
}

interface VariantTickerProps {
  items: UnifiedTickerItem[];
  baseCount: number;
  className?: string;
  t: (hiText: string, enText: string) => string;
}

function MastheadTicker({ items, baseCount, className, t }: VariantTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      aria-label={t("ताज़ा और ट्रेंडिंग समाचार टिकर", "Breaking and Trending News Ticker")}
      suppressHydrationWarning
      className={cn(
        "relative flex items-center h-9 sm:h-9.5 w-full bg-gradient-to-r from-[#0d172e] via-[#17264a] to-[#0d172e] rounded-lg border-t-2 border-t-[#E01F26] border-x border-b border-[#253765] shadow-xs px-2.5 select-none overflow-hidden group",
        className
      )}
    >
      {/* Left Fixed Broadcast Live Badge */}
      <div className="shrink-0 z-20 flex items-center bg-[#0d172e] group-hover:bg-[#111e3c] transition-colors pr-1.5">
        <div className="flex items-center gap-1.5 bg-[#E01F26] text-white px-2 py-0.5 rounded text-[10px] sm:text-[10.5px] font-black tracking-wider uppercase shadow-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <span suppressHydrationWarning className="leading-none">{t("लाइव", "LIVE")}</span>
        </div>
        <div className="h-3.5 w-px bg-white/20 shrink-0 mx-2.5 select-none" />
      </div>

      {/* Continuous Scrolling Marquee Viewport */}
      <div
        className="flex-1 overflow-hidden relative cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0d172e] via-[#0d172e]/80 to-transparent z-10 transition-colors" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#0d172e] via-[#0d172e]/80 to-transparent z-10 transition-colors" />

        <div
          className={cn(
            "flex items-center text-[13px] font-medium whitespace-nowrap will-change-transform",
            "animate-ticker",
            isPaused && "!animate-none [animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${Math.max(35, baseCount * 6)}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {items.map((item) => {
            const isBreaking = item.type === "breaking";
            const catLabel = getCategoryLabel(item.category, isBreaking, t);

            return (
              <div
                key={item.tickerKey}
                className="inline-flex items-center shrink-0 group/item"
              >
                <span
                  suppressHydrationWarning
                  className={cn(
                    "text-[10px] font-bold tracking-wider uppercase shrink-0 transition-colors select-none px-1.5 py-0.5 rounded",
                    isBreaking
                      ? "bg-[#281822] text-[#f87171] border border-red-500/40"
                      : "bg-[#1c2c54] text-[#FDE047] border border-yellow-400/30"
                  )}
                >
                  {catLabel}
                </span>

                <Link
                  href={`/news/${item.slug}`}
                  className="ml-2 text-[12.5px] font-medium text-white/95 group-hover/item:text-[#fca5a5] transition-colors leading-none tracking-normal"
                  title={item.title}
                >
                  {item.title}
                </Link>

                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mx-4 shrink-0 select-none group-hover/item:bg-[#E01F26] transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pause/Play Control */}
      <div className="shrink-0 z-20 flex items-center bg-[#0d172e] group-hover:bg-[#111e3c] transition-colors pl-1.5">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
          title={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
          suppressHydrationWarning
          className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
        >
          {isPaused ? <Play className="w-3 h-3 text-[#f87171] fill-current" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}

function MobileSlimTicker({ items, baseCount, className, t }: VariantTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <aside
      aria-label={t("ताज़ा समाचार टिकर", "Live News Ticker")}
      suppressHydrationWarning
      className={cn(
        "flex items-center h-7 bg-gradient-to-r from-[#0b1226] via-[#141e3d] to-[#0b1226] text-white text-[11px] px-2.5 select-none overflow-hidden border-b border-[#21305c]",
        className
      )}
    >
      <div className="shrink-0 z-20 flex items-center bg-[#0b1226] pr-1.5">
        <div className="flex items-center gap-1 bg-[#E01F26] text-white px-1.5 py-0.5 rounded text-[9.5px] font-bold tracking-wider uppercase shadow-2xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <span suppressHydrationWarning className="leading-none">{t("लाइव", "Live")}</span>
        </div>
      </div>

      <div
        className="flex-1 overflow-hidden relative cursor-pointer"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#0b1226] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-[#0b1226] to-transparent z-10" />

        <div
          className={cn(
            "flex items-center gap-2 text-[11px] whitespace-nowrap will-change-transform",
            "animate-ticker",
            isPaused && "!animate-none [animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${Math.max(30, baseCount * 5)}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {items.map((item) => {
            const isBreaking = item.type === "breaking";
            const catLabel = getCategoryLabel(item.category, isBreaking, t);

            return (
              <div key={item.tickerKey} className="inline-flex items-center shrink-0">
                <span
                  suppressHydrationWarning
                  className="text-[#FDE047] font-bold text-[10px] uppercase tracking-wider"
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

function StandaloneTicker({ items, baseCount, className, t }: VariantTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <aside
      aria-label={t("ब्रेकिंग और ट्रेंडिंग समाचार टिकर", "Breaking and Trending News Ticker")}
      className={cn(
        "w-full bg-gradient-to-r from-[#991319] via-[#d31923] to-[#991319] text-white shadow-xs relative overflow-hidden select-none border-y border-[#7f0f15]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center h-9 sm:h-9.5 px-3 sm:px-4">
        <div className="shrink-0 z-20 flex items-center bg-transparent pr-2">
          <div className="flex items-center gap-1.5 bg-[#780e13] text-white px-2.5 py-0.5 rounded text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase shadow-xs border border-white/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span suppressHydrationWarning>{t("लाइव अपडेट्स", "Live Updates")}</span>
          </div>
          <div className="h-3.5 w-px bg-white/20 shrink-0 mx-2.5 select-none" />
        </div>

        <div
          className="flex-1 overflow-hidden relative group cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#991319] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#991319] to-transparent z-10" />

          <div
            className={cn(
              "flex items-center gap-2 text-xs sm:text-[13px] font-medium whitespace-nowrap will-change-transform",
              "animate-ticker",
              isPaused && "!animate-none [animation-play-state:paused]"
            )}
            style={{
              animationDuration: `${Math.max(35, baseCount * 5.5)}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {items.map((item) => {
              const isBreaking = item.type === "breaking";
              const catLabel = getCategoryLabel(item.category, isBreaking, t);

              return (
                <div
                  key={item.tickerKey}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 mx-3 shrink-0 select-none group-hover/item:bg-white transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 z-20 flex items-center pl-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
            title={isPaused ? t("टिकर प्ले करें", "Play ticker") : t("टिकर रोकें", "Pause ticker")}
            suppressHydrationWarning
            className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/20 rounded-md transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-300 fill-current" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export function BreakingNewsTicker({
  items,
  breakingItems = DEFAULT_BREAKING_ITEMS,
  trendingItems = DEFAULT_TRENDING_ITEMS,
  variant = "standalone",
  className,
}: BreakingNewsTickerProps) {
  const { t } = useLanguage();

  const combinedItems = useMemo<UnifiedTickerItem[]>(() => {
    const rawBreaking = breakingItems.length > 0 ? breakingItems : items || [];
    const result: UnifiedTickerItem[] = [];

    const maxLen = Math.max(rawBreaking.length, trendingItems.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < rawBreaking.length) {
        const b = rawBreaking[i];
        result.push({
          id: `break-${b.id || i}`,
          tickerKey: `b-${b.id || i}`,
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
          tickerKey: `t-${tr.id || i}`,
          title: tr.title,
          slug: tr.slug,
          category: tr.category?.name || "ट्रेंडिंग",
          type: "trending",
        });
      }
    }

    return result;
  }, [items, breakingItems, trendingItems]);

  const duplicatedItems = useMemo<UnifiedTickerItem[]>(() => {
    if (combinedItems.length === 0) return [];
    return [
      ...combinedItems.map((item) => ({ ...item, tickerKey: `track1-${item.id}` })),
      ...combinedItems.map((item) => ({ ...item, tickerKey: `track2-${item.id}` })),
    ];
  }, [combinedItems]);

  if (duplicatedItems.length === 0) return null;

  if (variant === "masthead") {
    return (
      <MastheadTicker
        items={duplicatedItems}
        baseCount={combinedItems.length}
        className={className}
        t={t}
      />
    );
  }

  if (variant === "mobile-slim") {
    return (
      <MobileSlimTicker
        items={duplicatedItems}
        baseCount={combinedItems.length}
        className={className}
        t={t}
      />
    );
  }

  return (
    <StandaloneTicker
      items={duplicatedItems}
      baseCount={combinedItems.length}
      className={className}
      t={t}
    />
  );
}
