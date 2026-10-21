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

          {/* Social Media Follow Section */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {t("सोशल मीडिया पर फॉलो करें", "Follow Us On Social Media")}
            </div>
            <div className="px-4 py-2 flex items-center gap-2.5">
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube @theconclusiveindian"
                title="YouTube (@theconclusiveindian)"
                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @theconclusiveindian"
                title="Instagram (@theconclusiveindian)"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook @theconclusiveindian"
                title="Facebook (@theconclusiveindian)"
                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X @tci2024"
                title="X (@tci2024)"
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                title="WhatsApp Channel"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
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
