"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingCallButton } from "@/components/common/FloatingCallButton";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import { BreakingNewsItem, Article } from "@/types/news";

interface PublicSiteWrapperProps {
  children: React.ReactNode;
  breakingNews: BreakingNewsItem[];
  trendingArticles: Article[];
}

export function PublicSiteWrapper({
  children,
  breakingNews,
  trendingArticles,
}: PublicSiteWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  if (isAdmin) {
    return <div className="admin-root w-full min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#E01F26] focus:text-white focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        मुख्य सामग्री पर जाएं (Skip to main content)
      </a>
      <SiteHeader breakingNews={breakingNews} trendingArticles={trendingArticles} />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <FloatingCallButton />
      <CookieConsentBanner />
    </>
  );
}
