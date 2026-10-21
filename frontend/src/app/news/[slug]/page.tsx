import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getArticleBySlug,
  getRelatedArticles,
  getTrendingArticles,
  getLatestArticles,
} from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { ArticleHeader } from "@/components/news/ArticleHeader";
import { ArticleContent } from "@/components/news/ArticleContent";
import { ArticleSidebar } from "@/components/news/ArticleSidebar";
import { RelatedStories } from "@/components/news/RelatedStories";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const latest = await getLatestArticles(1, 50);
  return latest.data.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "समाचार नहीं मिला",
    };
  }

  return {
    title: `${article.title} - ${SITE_CONFIG.name}`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.featuredImage,
          alt: article.imageAlt || article.title,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [relatedArticles, trendingArticles, latestData] = await Promise.all([
    getRelatedArticles(article, 4),
    getTrendingArticles(5),
    getLatestArticles(1, 4),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/news/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Leaderboard Ad */}
        <div className="mb-6">
          <AdPlaceholder format="leaderboard" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Content (8 Cols) */}
          <main className="lg:col-span-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-200/80 shadow-2xs">
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
          </main>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <ArticleSidebar
              trendingArticles={trendingArticles}
              latestArticles={latestData.data}
            />
          </div>
        </div>

        {/* Related Stories */}
        <RelatedStories articles={relatedArticles} />
      </div>
    </>
  );
}
