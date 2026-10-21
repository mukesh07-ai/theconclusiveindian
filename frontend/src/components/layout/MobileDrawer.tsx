"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  ChevronRight,
  ChevronDown,
  Search,
  FileText,
  Info,
  PhoneCall,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteLogo } from "../common/SiteLogo";
import { INDIA_LOCATIONS } from "@/data/indiaLocations";
import { LanguageSelector } from "../common/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMounted } from "@/lib/useIsMounted";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenLocation?: () => void;
}

export function MobileDrawer({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenLocation,
}: MobileDrawerProps) {
  const isMounted = useIsMounted();
  const [isStatesExpanded, setIsStatesExpanded] = useState(false);
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const mountedAtRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      mountedAtRef.current = Date.now();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = () => {
    // Prevent mobile touch ghost/fallthrough clicks from immediately dismissing the drawer
    if (Date.now() - mountedAtRef.current < 350) {
      return;
    }
    onClose();
  };

  if (!isMounted || !isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-[99999] flex"
      role="dialog"
      aria-modal="true"
      aria-label={t("मुख्य नेविगेशन मेनू", "Main Navigation Menu")}
    >
      {/* Backdrop with ghost-tap protection */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleBackdropClick}
      />

      {/* Drawer content: Full dvh on mobile, touch friendly */}
      <div
        className="relative w-[85vw] max-w-xs bg-white h-[100dvh] shadow-2xl flex flex-col z-10 overflow-y-auto overscroll-contain animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-3.5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <SiteLogo variant="mobile" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("मेनू बंद करें", "Close menu")}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation active:scale-95"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Language Selector Section */}
        <div className="px-3 pt-3 pb-1 border-b border-gray-100 shrink-0">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-0.5">
            {t("भाषा चुनें (Language)", "Select Language (भाषा)")}
          </div>
          <LanguageSelector variant="drawer" />
        </div>

        {/* Quick Search Button in Drawer */}
        <div className="p-3 border-b border-gray-100 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-xs sm:text-sm text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer touch-manipulation active:scale-98"
          >
            <Search className="w-4 h-4 text-[#263565]" />
            <span>{t("खबरें, मुद्दे या विषय खोजें...", "Search news, topics or issues...")}</span>
          </button>
        </div>

        {/* Country & State / District Quick Selector Button */}
        {onOpenLocation && (
          <div className="px-3 pt-2 pb-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLocation();
              }}
              className="w-full flex items-center justify-between p-2.5 bg-gradient-to-r from-[#263565] to-[#1e2c56] text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer touch-manipulation active:scale-98"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E01F26]" />
                <span>{t("देश, राज्य व ज़िला चुनें", "Select Country, State & District")}</span>
              </div>
              <span className="text-[10px] bg-[#E01F26] px-1.5 py-0.5 rounded text-white font-bold">
                {t("28 राज्य", "28 States")}
              </span>
            </button>
          </div>
        )}

        {/* Categories List */}
        <div className="py-2 flex-1">
          <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {t("प्रमुख श्रेणियां (Categories)", "Categories (श्रेणियां)")}
          </div>
          <nav className="divide-y divide-gray-100">
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer touch-manipulation",
                pathname === "/"
                  ? "bg-[#263565]/10 text-[#E01F26] font-bold"
                  : "text-gray-800 hover:bg-gray-50"
              )}
            >
              <span>{t("होम (Home)", "Home (होम)")}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            {/* Expandable "देश / National" Item */}
            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenLocation) onOpenLocation();
                  }}
                  className="flex-1 flex flex-col text-left cursor-pointer touch-manipulation"
                >
                  <span className="font-semibold text-gray-900">
                    {t("देश (National)", "National (देश)")}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {t("सभी 28 राज्य व उनके ज़िले", "All 28 States & Constituent Districts")}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsStatesExpanded(!isStatesExpanded)}
                  className="p-1 text-gray-500 hover:text-[#263565] rounded-md transition-colors cursor-pointer touch-manipulation"
                  aria-label={isStatesExpanded ? t("राज्यों की सूची छुपाएं", "Hide states") : t("सभी राज्य देखें", "Show states")}
                >
                  {isStatesExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#E01F26]" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Collapsible States Grid */}
              {isStatesExpanded && (
                <div className="bg-gray-50 p-3 border-t border-gray-200 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">
                      {t("राज्य चुनें (Select State)", "Select State (राज्य)")}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onOpenLocation) onOpenLocation();
                      }}
                      className="text-[11px] font-bold text-[#E01F26] hover:underline cursor-pointer"
                    >
                      {t("सभी ज़िले देखें →", "View All Districts →")}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto overscroll-contain">
                    {INDIA_LOCATIONS.slice(0, 16).map((loc) => {
                      const stName = language === "en" ? loc.name.en : loc.name.hi;
                      return (
                        <button
                          key={loc.code}
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onOpenLocation) onOpenLocation();
                          }}
                          className="p-1.5 bg-white rounded border border-gray-200 text-left text-xs font-medium text-gray-800 hover:text-[#E01F26] hover:border-[#E01F26] transition-colors block truncate cursor-pointer"
                        >
                          {stName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Other Categories */}
            {SITE_CONFIG.categories
              .filter((c) => c.slug !== "national")
              .map((cat) => {
                const href = `/category/${cat.slug}`;
                const isActive = pathname === href;
                const primaryName = language === "en" ? cat.englishName : cat.name;
                const secondaryName = language === "en" ? cat.name : cat.englishName;

                return (
                  <Link
                    key={cat.id}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-4 py-2 text-sm transition-colors cursor-pointer touch-manipulation",
                      isActive
                        ? "bg-[#263565]/10 text-[#E01F26] font-bold"
                        : "text-gray-800 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{primaryName}</span>
                      <span className="text-[10px] text-gray-400">{secondaryName}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </Link>
                );
              })}
          </nav>

          {/* Quick Informational Links */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {t("संपादकीय एवं संपर्क", "Editorial & Contact")}
            </div>
            <div className="px-2 space-y-0.5">
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer touch-manipulation"
              >
                <Info className="w-4 h-4 text-[#263565]" />
                <span>{t("हमारे बारे में (About Us)", "About Us (हमारे बारे में)")}</span>
              </Link>
              <Link
                href="/editorial-policy"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer touch-manipulation"
              >
                <FileText className="w-4 h-4 text-[#263565]" />
                <span>{t("संपादकीय नीति (Editorial Policy)", "Editorial Policy (संपादकीय नीति)")}</span>
              </Link>
              <Link
                href="/privacy-policy"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer touch-manipulation"
              >
                <ShieldCheck className="w-4 h-4 text-[#263565]" />
                <span>{t("गोपनीयता नीति (Privacy Policy)", "Privacy Policy (गोपनीयता नीति)")}</span>
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer touch-manipulation"
              >
                <PhoneCall className="w-4 h-4 text-[#263565]" />
                <span>{t("संपर्क सूत्र (Contact Us)", "Contact Us (संपर्क सूत्र)")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer Tagline */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center shrink-0">
          <p className="text-[11px] font-bold text-[#263565]">
            {SITE_CONFIG.name}
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            {t(SITE_CONFIG.tagline, SITE_CONFIG.englishTagline)}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
