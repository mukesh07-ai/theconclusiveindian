"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Zap } from "lucide-react";
import { BreakingNewsItem } from "@/types/news";

interface BreakingNewsTickerProps {
  items: BreakingNewsItem[];
}

export function BreakingNewsTicker({ items }: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section
      aria-label="ब्रेकिंग न्यूज़ पट्टी"
      className="w-full bg-[#E52532] text-white shadow-inner relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center px-2 sm:px-4 py-2 sm:py-2.5 gap-2 sm:gap-4">
        {/* Label Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-[#b81722] text-white px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase shadow-2xs select-none">
          <Zap className="w-3.5 h-3.5 fill-current text-yellow-300 animate-pulse" />
          <span>ब्रेकिंग न्यूज़</span>
        </div>

        {/* Headline Link */}
        <div
          className="flex-1 min-w-0 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-bold bg-black/20 px-1.5 py-0.5 rounded text-white/90 shrink-0">
              {currentItem.category}
            </span>
            <Link
              href={`/news/${currentItem.slug}`}
              className="text-xs sm:text-sm font-semibold truncate hover:underline text-white block transition-all"
              title={currentItem.title}
            >
              {currentItem.title}
            </Link>
          </div>
        </div>

        {/* Controls & Counter */}
        <div className="shrink-0 flex items-center gap-1 text-white/80 select-none">
          <span className="text-[11px] font-medium hidden md:inline-block mr-1">
            {currentIndex + 1}/{total}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="पिछली ब्रेकिंग न्यूज़"
            className="p-1 hover:bg-black/20 rounded transition-colors text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? "प्ले करें" : "रोकें"}
            className="p-1 hover:bg-black/20 rounded transition-colors text-white"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="अगली ब्रेकिंग न्यूज़"
            className="p-1 hover:bg-black/20 rounded transition-colors text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
