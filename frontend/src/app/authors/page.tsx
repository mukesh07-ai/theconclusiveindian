import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { getAuthors } from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export const metadata: Metadata = {
  title: `संपादकीय टीम एवं लेखक (Authors & Editorial Board) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की संपादकीय टीम, वरिष्ठ पत्रकार और विषय विशेषज्ञ। पारदर्शी पत्रकारिता हेतु प्रामाणिक लेखक परिचय।`,
  alternates: {
    canonical: "/authors",
  },
  openGraph: {
    title: `संपादकीय टीम - ${SITE_CONFIG.name}`,
    description: `द कन्क्लूसिव इंडियन के सभी अधिकृत लेखक, संवाददाता और संपादक।`,
  },
};

export default async function AuthorsDirectoryPage() {
  const authors = await getAuthors();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "द कन्क्लूसिव इंडियन संपादकीय टीम",
    description: "संपादकों और पत्रकारों की निर्देशिका",
    itemListElement: authors.map((author, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        image: author.avatar,
        url: `${SITE_CONFIG.url}/author/${author.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">संपादकीय टीम एवं लेखक</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-[#F5F6F8] rounded-2xl p-6 sm:p-10 border border-gray-200 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            संपादकीय पारदर्शिता एवं उत्तरदायित्व
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            संपादकीय टीम एवं प्रमुख लेखक
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {SITE_CONFIG.name} की विश्वसनीयता हमारे अनुभवी पत्रकारों, संपादकों और क्षेत्रीय संवाददाताओं की निष्पक्ष दृष्टि और तथ्यात्मक प्रतिबद्धता पर टिकी है।
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-green-600" /> 100% सत्यापित लेखक प्रोफ़ाइल
            </span>
            <span>•</span>
            <Link
              href="/editorial-policy"
              className="text-[#233768] hover:underline font-semibold"
            >
              संपादकीय आचार संहिता पढ़ें →
            </Link>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <article
              key={author.id}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#233768]/30 transition-shadow transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-[#233768]/20 shrink-0">
                    <ImageWithFallback
                      src={author.avatar || ""}
                      alt={author.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 hover:text-[#233768] transition-colors">
                      <Link href={`/author/${author.slug}`}>
                        {author.name}
                      </Link>
                    </h2>
                    {author.role && (
                      <span className="text-xs font-semibold text-[#E52532] block mt-0.5">
                        {author.role}
                      </span>
                    )}
                  </div>
                </div>

                {author.bio && (
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {author.bio}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">संपादकीय मंडल</span>
                <Link
                  href={`/author/${author.slug}`}
                  className="font-bold text-[#233768] hover:text-[#E52532] flex items-center gap-1 transition-colors"
                >
                  लेख पढ़ें <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
