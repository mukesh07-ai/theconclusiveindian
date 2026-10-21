"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, ChevronDown, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteLogo } from "../common/SiteLogo";
import { TopUtilityBar } from "./TopUtilityBar";
import { SearchModal } from "./SearchModal";
import { MobileDrawer } from "./MobileDrawer";
import { LocationSelectorModal } from "./LocationSelectorModal";
import { LanguageSelector } from "../common/LanguageSelector";
import { BreakingNewsTicker } from "./BreakingNewsTicker";
import { BreakingNewsItem, Article } from "@/types/news";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  breakingNews?: BreakingNewsItem[];
  trendingArticles?: Article[];
}

export function SiteHeader({
  breakingNews = [],
  trendingArticles = [],
}: SiteHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Top Utility Bar - Compact Height (28px) - Natural document scroll */}
      <TopUtilityBar />

      {/* Sticky Header - Opaque background, high z-index, crisp elevation */}
      <header className="sticky top-0 z-40 w-full bg-white shadow-xs" suppressHydrationWarning>
        {/* Desktop Masthead - Compact Height (py-2) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 py-2 bg-white">
          <div className="flex items-center justify-between gap-4">
            <SiteLogo variant="header" />

            {/* Desktop Live Ticker Scroller in the empty space next to 'Conclusive Indian' logo */}
            <div className="flex-1 min-w-0 mx-2 lg:mx-4">
              <BreakingNewsTicker
                variant="masthead"
                breakingItems={breakingNews}
                trendingItems={trendingArticles}
              />
            </div>

            {/* Desktop Editorial Tagline & Live Indicator - Streamlined */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-gray-200">
                <div className="text-right">
                  <span className="block text-xs font-bold text-[#263565]" suppressHydrationWarning>
                    {t("सत्य, निष्पक्षता और भारतीय जनसरोकार", "Truth, Integrity & Public Interest")}
                  </span>
                  <span className="block text-[10px] text-gray-500" suppressHydrationWarning>
                    {t("भारत का अग्रणी डिजिटल हिंदी समाचार मंच", "India's Leading Digital News Portal")}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#E01F26] animate-ping shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header Bar - Static, Compact & Touch Optimized */}
        <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-white border-b border-gray-200">
          <SiteLogo variant="mobile" />

          {/* Right: Language Toggle, Search & Hamburger Menu */}
          <div className="flex items-center gap-1.5">
            <LanguageSelector variant="compact" />

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label={t("समाचार खोजें", "Search News")}
              suppressHydrationWarning
              className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#263565] hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors cursor-pointer touch-manipulation select-none"
            >
              <Search className="w-4.5 h-4.5 pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={t("मुख्य मेनू खोलें", "Open Main Menu")}
              suppressHydrationWarning
              className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#263565] hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors cursor-pointer touch-manipulation select-none"
            >
              <Menu className="w-5.5 h-5.5 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontally Scrollable Category Navigation Strip - Static */}
        <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-2xs">
          <nav
            aria-label={t("मोबाइल समाचार श्रेणियां", "Mobile News Categories")}
            suppressHydrationWarning
            className="flex items-center overflow-x-auto no-scrollbar px-2 py-1.5 text-xs font-semibold whitespace-nowrap divide-x divide-gray-200"
          >
            <Link
              href="/"
              suppressHydrationWarning
              className={cn(
                "px-2.5 py-0.5 shrink-0 transition-colors cursor-pointer touch-manipulation",
                pathname === "/"
                  ? "text-[#E01F26] font-bold"
                  : "text-[#263565] hover:text-[#E01F26]"
              )}
            >
              {t("होम", "Home")}
            </Link>
            {SITE_CONFIG.categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;
              const catTitle = t(cat.name, cat.englishName);

              // Interactive "देश / National" button in mobile category strip
              if (cat.slug === "national") {
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setIsLocationOpen(true)}
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 shrink-0 transition-colors cursor-pointer touch-manipulation font-semibold",
                      pathname.startsWith("/category/national")
                        ? "text-[#E01F26] font-bold"
                        : "text-[#263565] hover:text-[#E01F26]"
                    )}
                    aria-label={t("देश, राज्य व ज़िला चुनें", "Select Country, State & District")}
                    title={t("देश, राज्य व ज़िला चुनें", "Select Country, State & District")}
                    suppressHydrationWarning
                  >
                    <span suppressHydrationWarning>{catTitle}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#E01F26]" />
                  </button>
                );
              }

              return (
                <Link
                  key={cat.id}
                  href={href}
                  suppressHydrationWarning
                  className={cn(
                    "px-2.5 py-0.5 shrink-0 transition-colors cursor-pointer touch-manipulation",
                    isActive
                      ? "text-[#E01F26] font-bold"
                      : "text-[#263565] hover:text-[#E01F26]"
                  )}
                >
                  <span suppressHydrationWarning>{catTitle}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Slim Live Ticker */}
        <div className="md:hidden">
          <BreakingNewsTicker
            variant="mobile-slim"
            breakingItems={breakingNews}
            trendingItems={trendingArticles}
          />
        </div>

        {/* Desktop Static Main Navigation Bar */}
        <div className="hidden md:block bg-[#263565] text-white shadow-xs">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <nav
              aria-label={t("मुख्य श्रेणियां", "Main Categories")}
              suppressHydrationWarning
              className="flex items-center overflow-x-auto no-scrollbar text-[13px] font-semibold tracking-wide"
            >
              <Link
                href="/"
                suppressHydrationWarning
                className={cn(
                  "py-2 px-3 shrink-0 transition-colors relative hover:bg-white/10",
                  pathname === "/"
                    ? "bg-[#E01F26] text-white font-bold"
                    : "text-white/95"
                )}
              >
                {t("होम", "Home")}
              </Link>

              {SITE_CONFIG.categories.map((cat) => {
                const href = `/category/${cat.slug}`;
                const isActive = pathname === href;
                const catTitle = t(cat.name, cat.englishName);

                // Interactive "देश / National" button with dropdown in desktop navbar
                if (cat.slug === "national") {
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setIsLocationOpen(true)}
                      className={cn(
                        "py-2 px-3 shrink-0 transition-colors relative hover:bg-white/10 flex items-center gap-1 cursor-pointer font-semibold",
                        pathname.startsWith("/category/national")
                          ? "bg-[#E01F26] text-white font-bold"
                          : "text-white/95"
                      )}
                      title={t("भारत के सभी 28 राज्य और ज़िले चुनें", "Select All 28 States & Districts of India")}
                      aria-label={t("भारत के सभी 28 राज्य और ज़िले चुनें", "Select All 28 States & Districts of India")}
                      suppressHydrationWarning
                    >
                      <span suppressHydrationWarning>{catTitle}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-yellow-300" />
                    </button>
                  );
                }

                return (
                  <Link
                    key={cat.id}
                    href={href}
                    suppressHydrationWarning
                    className={cn(
                      "py-2 px-2.5 lg:px-3 shrink-0 transition-colors relative hover:bg-white/10",
                      isActive
                        ? "bg-[#E01F26] text-white font-bold"
                        : "text-white/90"
                    )}
                  >
                    <span suppressHydrationWarning>{catTitle}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions: Location Selector + Search Button */}
            <div className="flex items-center gap-1.5 shrink-0 py-1">
              <button
                type="button"
                onClick={() => setIsLocationOpen(true)}
                aria-label={t("राज्य व ज़िला चुनें", "Select State & District")}
                suppressHydrationWarning
                className="flex items-center gap-1.5 py-1 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors text-xs font-semibold cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-yellow-300" />
                <span suppressHydrationWarning>{t("राज्य/ज़िला", "States/Districts")}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label={t("खोजें", "Search")}
                suppressHydrationWarning
                className="flex items-center gap-1.5 py-1 px-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors text-xs font-medium cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span suppressHydrationWarning>{t("खोजें", "Search")}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Interactive Modals (Portaled cleanly to document.body) */}
      <LocationSelectorModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
      />
    </>
  );
}
