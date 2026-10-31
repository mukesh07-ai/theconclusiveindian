import { Metadata } from "next";
import Link from "next/link";
import {
  Map,
  Compass,
  FileText,
  Shield,
  Layers,
  Users,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { getLatestArticles, getAllTags, getAuthors } from "@/lib/api";

export const metadata: Metadata = {
  title: `साइटमैप (HTML Sitemap) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की संपूर्ण सामग्री निर्देशिका। सभी समाचार श्रेणियां, संस्थागत नीतियां, संपादकीय टीम और महत्वपूर्ण लिंक।`,
  alternates: {
    canonical: "/sitemap",
  },
  openGraph: {
    title: `साइटमैप - ${SITE_CONFIG.name}`,
    description: `मानव-पठनीय सम्पूर्ण साइटमैप निर्देशिका।`,
  },
};

export default async function HtmlSitemapPage() {
  const [latestData, allTags, authors] = await Promise.all([
    getLatestArticles(1, 15),
    getAllTags(),
    getAuthors(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#233768] hover:underline">
          होम
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">साइटमैप (Sitemap)</span>
      </nav>

      {/* Header */}
      <header className="space-y-3 pb-6 border-b border-gray-200">
        <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
          सम्पूर्ण सामग्री निर्देशिका
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          साइटमैप (HTML Sitemap)
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          <strong>{SITE_CONFIG.name}</strong> के सभी मुख्य पृष्ठों, समाचार श्रेणियों, संपादकीय नीतियों और हालिया प्रकाशित लेखों की व्यवस्थित सूची।
        </p>
        <div className="pt-1">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E52532] hover:underline"
          >
            <span>XML साइटमैप देखें (Search Engine XML Sitemap)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: Core Navigation */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-lg font-bold text-[#233768] flex items-center gap-2 pb-2 border-b border-gray-100">
            <Compass className="w-5 h-5 text-[#233768]" />
            मुख्य नेविगेशन पृष्ठ
          </h2>
          <ul className="space-y-2 text-xs text-gray-700">
            <li>
              <Link href="/" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                होम (मुख्य पृष्ठ)
              </Link>
              <p className="text-gray-500 text-[11px]">देश-दुनिया की मुख्य खबरें और ब्रेकिंग अपडेट्स</p>
            </li>
            <li>
              <Link href="/latest-news" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                ताज़ा समाचार (Latest News)
              </Link>
              <p className="text-gray-500 text-[11px]">पल-पल की ताज़ा खबरें और लाइव अपडेट्स</p>
            </li>
            <li>
              <Link href="/trending" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                ट्रेंडिंग समाचार (Trending News)
              </Link>
              <p className="text-gray-500 text-[11px]">सर्वाधिक पढ़े और साझा किए जा रहे लेख</p>
            </li>
            <li>
              <Link href="/search" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                समाचार खोज (Search Engine)
              </Link>
              <p className="text-gray-500 text-[11px]">द्विभाषी समाचार व आलेख खोज</p>
            </li>
            <li>
              <Link href="/authors" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                संपादकीय टीम एवं लेखक (Authors Directory)
              </Link>
              <p className="text-gray-500 text-[11px]">सभी पत्रकारों और विश्लेषकों की निर्देशिका</p>
            </li>
          </ul>
        </section>

        {/* Section 2: News Categories */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-lg font-bold text-[#233768] flex items-center gap-2 pb-2 border-b border-gray-100">
            <Layers className="w-5 h-5 text-[#E52532]" />
            समाचार श्रेणियां (Categories)
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {SITE_CONFIG.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800 hover:text-[#233768] font-medium transition-colors border border-gray-100"
              >
                {cat.name} ({cat.englishName})
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Institutional & Trust Policies */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-lg font-bold text-[#233768] flex items-center gap-2 pb-2 border-b border-gray-100">
            <Shield className="w-5 h-5 text-green-600" />
            संस्थागत एवं संपादकीय नीतियां
          </h2>
          <ul className="space-y-2 text-xs text-gray-700">
            <li>
              <Link href="/about-us" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                हमारे बारे में (About Us)
              </Link>
              <p className="text-gray-500 text-[11px]">मिशन, संपादकीय मूल्य और संस्थागत परिचय</p>
            </li>
            <li>
              <Link href="/editorial-policy" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                संपादकीय नीति (Editorial Policy)
              </Link>
              <p className="text-gray-500 text-[11px]">सत्यापन मानक, निष्पक्षता और एआई उपयोग नीति</p>
            </li>
            <li>
              <Link href="/fact-check-policy" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                तथ्य-जांच नीति (Fact-Check Policy)
              </Link>
              <p className="text-gray-500 text-[11px]">4-चरणीय फोरेंसिक एवं तथ्य सत्यापन कार्यप्रणाली</p>
            </li>
            <li>
              <Link href="/corrections-policy" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                त्रुटि सुधार नीति (Corrections Policy)
              </Link>
              <p className="text-gray-500 text-[11px]">संशोधन नोट मानक और पाठक त्रुटि रिपोर्टिंग</p>
            </li>
            <li>
              <Link href="/ownership-and-funding" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                स्वामित्व एवं फंडिंग (Ownership & Funding)
              </Link>
              <p className="text-gray-500 text-[11px]">पारदर्शी स्वामित्व और व्यावसायिक स्वतंत्रता दीवार</p>
            </li>
            <li>
              <Link href="/grievance-redressal" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                शिकायत निवारण (Grievance Redressal)
              </Link>
              <p className="text-gray-500 text-[11px]">आईटी नियम 2021 के तहत शिकायत अधिकारी संपर्क</p>
            </li>
          </ul>
        </section>

        {/* Section 4: Legal & Commercial */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-lg font-bold text-[#233768] flex items-center gap-2 pb-2 border-b border-gray-100">
            <FileText className="w-5 h-5 text-purple-600" />
            विधिक, व्यावसायिक एवं सुलभता नीतियां
          </h2>
          <ul className="space-y-2 text-xs text-gray-700">
            <li>
              <Link href="/privacy-policy" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                गोपनीयता नीति (Privacy Policy)
              </Link>
              <p className="text-gray-500 text-[11px]">DPDP Act 2023 अनुपालन और उपयोगकर्ता अधिकार</p>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                नियम एवं शर्तें (Terms & Conditions)
              </Link>
              <p className="text-gray-500 text-[11px]">वेबसाइट उपयोग की विधिक शर्तें और कॉपीराइट नियम</p>
            </li>
            <li>
              <Link href="/cookie-policy" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                कुकी नीति (Cookie Policy)
              </Link>
              <p className="text-gray-500 text-[11px]">कुकीज वर्गीकरण, उद्देश्य और सहमति प्रबंधन</p>
            </li>
            <li>
              <Link href="/disclaimer" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                कानूनी अस्वीकरण (Disclaimer)
              </Link>
              <p className="text-gray-500 text-[11px]">वित्तीय, चिकित्सीय और विधिक समाचार सीमाएं</p>
            </li>
            <li>
              <Link href="/contact-us" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                संपर्क करें (Contact Us)
              </Link>
              <p className="text-gray-500 text-[11px]">संपादकीय डेस्क, समाचार टिप और कार्यालय संपर्क</p>
            </li>
            <li>
              <Link href="/advertise-with-us" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                विज्ञापन दें (Advertise With Us)
              </Link>
              <p className="text-gray-500 text-[11px]">मीडिया किट, प्रायोजन और ब्रांड साझेदारी</p>
            </li>
            <li>
              <Link href="/accessibility" className="font-semibold text-gray-900 hover:text-[#233768] hover:underline">
                सुलभता नीति (Accessibility)
              </Link>
              <p className="text-gray-500 text-[11px]">WCAG 2.2 AA मानक और समावेशी सुविधाएं</p>
            </li>
          </ul>
        </section>
      </div>

      {/* Section 5: Editorial Journalists Directory Links */}
      <section className="bg-[#F5F6F8] p-6 rounded-2xl border border-gray-200 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#233768]" />
          संपादकीय लेखक प्रोफाइल (Authors Archive)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/author/${author.slug}`}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-900 block">{author.name}</span>
              <span className="text-[11px] text-[#E52532] block truncate">{author.role}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 6: Popular Tags */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Map className="w-5 h-5 text-[#E52532]" />
          लोकप्रिय विषय एवं टैग संग्रह (Topic Tags)
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {allTags.slice(0, 25).map((t) => (
            <Link
              key={t.slug}
              href={`/tag/${t.slug}`}
              className="px-3 py-1 bg-gray-100 hover:bg-[#233768] hover:text-white rounded-full text-gray-700 transition-colors"
            >
              #{t.tag} ({t.count})
            </Link>
          ))}
        </div>
      </section>

      {/* Section 7: Recent Headlines */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3">
        <h2 className="text-lg font-bold text-gray-900">
          हालिया प्रकाशित मुख्य समाचार (Recent Headline Articles)
        </h2>
        <ul className="divide-y divide-gray-100 text-xs">
          {latestData.data.map((art) => (
            <li key={art.id} className="py-2.5 flex items-center justify-between gap-3">
              <Link
                href={`/news/${art.slug}`}
                className="font-medium text-gray-800 hover:text-[#233768] hover:underline line-clamp-1"
              >
                {art.title}
              </Link>
              <span className="text-gray-400 shrink-0 text-[11px]">
                {art.category.name}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
