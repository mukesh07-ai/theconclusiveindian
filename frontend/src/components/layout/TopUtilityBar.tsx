"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Radio, FileText, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { getHindiHeaderDate, getEnglishHeaderDate } from "@/lib/dateFormat";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/common/LanguageSelector";

export function TopUtilityBar() {
  const { language, t } = useLanguage();
  const [dateStr, setDateStr] = useState<string>("बुधवार, 21 अक्टूबर 2026");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDateStr(language === "en" ? getEnglishHeaderDate() : getHindiHeaderDate());
    }, 0);
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div className="w-full bg-[#18274b] text-white/90 text-xs py-1 px-4 border-b border-[#233768]/60 hidden md:block select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Date & Edition */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="flex items-center gap-1.5 text-gray-300 font-medium" suppressHydrationWarning>
            <Calendar className="w-3.5 h-3.5 text-[#E52532]" />
            {dateStr}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300" suppressHydrationWarning>
            {t("नई दिल्ली संस्करण", "New Delhi Edition")}
          </span>
        </div>

        {/* Center: Trending Topics */}
        <div className="hidden lg:flex items-center gap-2 overflow-hidden text-[11px]">
          <span className="font-bold text-[#E52532] flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
            <span suppressHydrationWarning>{t("ट्रेंडिंग:", "Trending:")}</span>
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

        {/* Right: Quick Links + Language Selector */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <a
            href={SITE_CONFIG.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            title={t("द कन्क्लूसिव इंडियन व्हाट्सएप चैनल से जुड़ें", "Join The Conclusive Indian WhatsApp Channel")}
            aria-label={t("व्हाट्सएप चैनल", "WhatsApp Channel")}
          >
            <svg className="w-3.5 h-3.5 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span suppressHydrationWarning>{t("व्हाट्सएप", "WhatsApp")}</span>
          </a>
          <span className="text-gray-600">|</span>
          <Link
            href="/search?q=live"
            className="flex items-center gap-1 text-white hover:text-red-400 font-semibold transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-[#E52532] animate-pulse" />
            <span suppressHydrationWarning>{t("लाइव टीवी", "Live TV")}</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            href="/about"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span suppressHydrationWarning>{t("ई-पेपर", "E-Paper")}</span>
          </Link>
          <span className="text-gray-600">|</span>
          {/* Language Selector Pill */}
          <LanguageSelector variant="pill" />
        </div>
      </div>
    </div>
  );
}
