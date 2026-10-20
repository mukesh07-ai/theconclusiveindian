"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Radio, FileText, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { getHindiHeaderDate } from "@/lib/dateFormat";

export function TopUtilityBar() {
  const [dateStr, setDateStr] = useState<string>("बुधवार, 21 अक्टूबर 2026");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDateStr(getHindiHeaderDate());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[#18274b] text-white/90 text-xs py-1.5 px-4 border-b border-[#233768]/60 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Date & Location */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5 text-gray-300 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#E52532]" />
            {dateStr || "बुधवार, 21 अक्टूबर 2026"}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">नई दिल्ली संस्करण</span>
        </div>

        {/* Center: Trending Topics */}
        <div className="hidden lg:flex items-center gap-2 overflow-hidden text-[11px]">
          <span className="font-bold text-[#E52532] flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" /> ट्रेंडिंग:
          </span>
          <div className="flex items-center gap-2 truncate">
            {SITE_CONFIG.trendingTopics.map((topic, idx) => (
              <Link
                key={topic.slug}
                href={`/search?q=${encodeURIComponent(topic.name.replace("#", ""))}`}
                className="text-gray-300 hover:text-white transition-colors hover:underline"
              >
                {topic.name}
                {idx < SITE_CONFIG.trendingTopics.length - 1 && (
                  <span className="text-gray-600 ml-2">•</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/search?q=live"
            className="flex items-center gap-1 text-white hover:text-red-400 font-semibold transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-[#E52532] animate-pulse" />
            <span>लाइव टीवी</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            href="/about"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ई-पेपर</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
