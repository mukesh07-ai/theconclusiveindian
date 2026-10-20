"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteLogo } from "../common/SiteLogo";
import { TopUtilityBar } from "./TopUtilityBar";
import { SearchModal } from "./SearchModal";
import { MobileDrawer } from "./MobileDrawer";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="w-full bg-white border-b border-[#E5E7EB] shadow-2xs">
        {/* Desktop Top Utility Bar */}
        <TopUtilityBar />

        {/* Desktop Masthead (Brand + Banner/Tagline) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            <SiteLogo variant="header" />

            {/* Desktop Header Editorial Badge / Notice */}
            <div className="hidden lg:flex items-center gap-4 bg-[#F5F6F8] px-4 py-2 rounded-lg border border-gray-200">
              <div className="text-right">
                <span className="block text-xs font-bold text-[#233768]">
                  सत्य, निष्पक्षता और भारतीय जनसरोकार
                </span>
                <span className="block text-[11px] text-gray-500">
                  भारत का अग्रणी डिजिटल हिंदी समाचार मंच
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#E52532] animate-ping" />
            </div>
          </div>
        </div>

        {/* Mobile Header Bar (Matches reference screenshot) */}
        <div className="md:hidden flex items-center justify-between px-3.5 py-2.5 bg-white border-b border-gray-200">
          <SiteLogo variant="mobile" />

          {/* Right: Search & Hamburger Menu */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="समाचार खोजें"
              className="p-2 text-[#233768] hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="मुख्य मेनू खोलें"
              className="p-2 text-[#233768] hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontally Scrollable Category Navigation Strip */}
        <div className="md:hidden w-full bg-[#F5F6F8] border-b border-gray-200">
          <nav
            aria-label="मोबाइल समाचार श्रेणियां"
            className="flex items-center overflow-x-auto no-scrollbar px-3 py-2 text-xs font-semibold whitespace-nowrap divide-x divide-gray-300"
          >
            <Link
              href="/"
              className={cn(
                "px-2.5 py-0.5 shrink-0 transition-colors",
                pathname === "/"
                  ? "text-[#E52532] font-bold"
                  : "text-gray-700 hover:text-[#233768]"
              )}
            >
              होम
            </Link>
            {SITE_CONFIG.categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={cn(
                    "px-2.5 py-0.5 shrink-0 transition-colors",
                    isActive
                      ? "text-[#E52532] font-bold"
                      : "text-gray-700 hover:text-[#233768]"
                  )}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sticky Main Navigation Bar */}
        <div className="hidden md:block sticky top-0 z-40 bg-[#233768] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <nav
              aria-label="मुख्य श्रेणियां"
              className="flex items-center overflow-x-auto no-scrollbar text-sm font-semibold tracking-wide"
            >
              <Link
                href="/"
                className={cn(
                  "py-3 px-3.5 shrink-0 transition-colors relative hover:bg-white/10",
                  pathname === "/"
                    ? "bg-[#E52532] text-white font-bold"
                    : "text-white/95"
                )}
              >
                होम
              </Link>

              {SITE_CONFIG.categories.map((cat) => {
                const href = `/category/${cat.slug}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className={cn(
                      "py-3 px-3 shrink-0 transition-colors relative hover:bg-white/10",
                      isActive
                        ? "bg-[#E52532] text-white font-bold"
                        : "text-white/90"
                    )}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="खोजें"
              className="flex items-center gap-2 py-2 px-3 text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors text-xs font-medium ml-2"
            >
              <Search className="w-4 h-4" />
              <span>खोजें</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
