import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchCustomPage(slug: string) {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://theconclusiveindian.com"
      : "http://localhost:8000");

  try {
    const res = await fetch(`${apiBase}/api/v1/pages/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchCustomPage(slug);

  if (!page) {
    return {
      title: `पेज नहीं मिला - ${SITE_CONFIG.name}`,
    };
  }

  const metaTitle = page.seo_title || page.title;
  const metaDesc = page.meta_description || `${page.title} - ${SITE_CONFIG.name}`;

  return {
    title: `${metaTitle} - ${SITE_CONFIG.name}`,
    description: metaDesc,
    alternates: {
      canonical: `/p/${page.slug}`,
    },
    openGraph: {
      type: "website",
      title: metaTitle,
      description: metaDesc,
      url: `${SITE_CONFIG.url}/p/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
    },
  };
}

export default async function DynamicCustomPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = await fetchCustomPage(slug);

  if (!page || !page.is_published) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner Ad */}
      <AdPlaceholder format="leaderboard" />

      {/* Breadcrumb */}
      <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#233768] hover:underline">
          होम
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900 truncate">{page.title}</span>
      </nav>

      {/* Page Card */}
      <article className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
        <header className="border-b border-gray-100 pb-5 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>विशेष पृष्ठ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            {page.title}
          </h1>

          {page.updated_at && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                अंतिम अद्यतन:{" "}
                {new Date(page.updated_at).toLocaleDateString("hi-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </header>

        {/* Content Body */}
        <div
          className="prose prose-slate max-w-none text-gray-800 leading-relaxed text-base space-y-4 font-normal"
          dangerouslySetInnerHTML={{ __html: page.content_html || "<p>सामग्री जल्द उपलब्ध होगी।</p>" }}
        />
      </article>

      {/* Bottom Ad */}
      <div className="pt-4">
        <AdPlaceholder format="in-feed" />
      </div>
    </div>
  );
}
