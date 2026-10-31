import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, UserCheck, Calendar } from "lucide-react";
import {
  getAuthorBySlug,
  getAuthors,
  getArticlesByAuthor,
  getTrendingArticles,
} from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { NewsCard } from "@/components/news/NewsCard";
import { TrendingNews } from "@/components/news/TrendingNews";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "लेखक नहीं मिले",
    };
  }

  const title = `${author.name} - ${author.role || "संपादकीय लेखक"} | ${SITE_CONFIG.name}`;
  const description =
    author.bio || `${author.name} द्वारा द कन्क्लूसिव इंडियन पर प्रकाशित लेख व विश्लेषण।`;

  return {
    title,
    description,
    alternates: {
      canonical: `/author/${author.slug}`,
    },
    openGraph: {
      type: "profile",
      title,
      description,
      images: author.avatar ? [{ url: author.avatar, alt: author.name }] : [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: author.avatar ? [author.avatar] : [],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const [articlesData, trendingArticles] = await Promise.all([
    getArticlesByAuthor(slug, 1, 12),
    getTrendingArticles(5),
  ]);

  const articles = articlesData.data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_CONFIG.url}/author/${author.slug}#person`,
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        image: author.avatar,
        worksFor: {
          "@type": "NewsMediaOrganization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        url: `${SITE_CONFIG.url}/author/${author.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "होम",
            item: SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "संपादकीय टीम",
            item: `${SITE_CONFIG.url}/authors`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: author.name,
            item: `${SITE_CONFIG.url}/author/${author.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/authors" className="hover:text-[#233768] hover:underline">
            संपादकीय टीम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">{author.name}</span>
        </nav>

        {/* Author Profile Hero Card */}
        <header className="bg-[#F5F6F8] rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white border-3 border-[#233768]/20 shrink-0 shadow-sm">
              <ImageWithFallback
                src={author.avatar || ""}
                alt={author.name}
                fill
                priority
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {author.name}
                  </h1>
                  {author.role && (
                    <span className="inline-block mt-1 text-xs font-bold text-[#E52532] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
                      {author.role}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                    <FileText className="w-3.5 h-3.5 text-[#233768]" />
                    <strong>{articlesData.total}</strong> लेख
                  </span>
                  <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                    <UserCheck className="w-3.5 h-3.5 text-green-600" />
                    सत्यापित संपादक
                  </span>
                </div>
              </div>

              {author.bio && (
                <p className="text-sm text-gray-700 leading-relaxed max-w-3xl pt-2 border-t border-gray-200/80">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Author Articles (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#233768]">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E52532]" />
                {author.name} द्वारा प्रकाशित लेख
              </h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                कुल {articlesData.total} लेख
              </span>
            </div>

            {articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((art) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    variant="horizontal"
                    className="bg-white border border-gray-200 hover:border-gray-300"
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200 text-gray-500 text-sm">
                वर्तमान में इस लेखक द्वारा कोई अन्य लेख प्रकाशित नहीं है।
              </div>
            )}
          </div>

          {/* Right Column: Trending Stories Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <TrendingNews articles={trendingArticles} />
            <AdPlaceholder format="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
