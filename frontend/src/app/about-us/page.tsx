import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Users,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_AUTHORS } from "@/data/mockAuthors";
import { Author } from "@/types/news";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export const metadata: Metadata = {
  title: `हमारे बारे में (About Us) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की पत्रकारिता के मूल्य, मिशन, संपादकीय नेतृत्व और संस्थागत परिचय।`,
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: `हमारे बारे में - ${SITE_CONFIG.name}`,
    description: `स्वतंत्र, निष्पक्ष और निर्णायक हिंदी डिजिटल पत्रकारिता का संकल्प।`,
  },
};

function AboutBreadcrumb() {
  return (
    <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
      <Link href="/" className="hover:text-[#233768] hover:underline">
        होम
      </Link>
      <ChevronRight className="w-3 h-3 text-gray-400" />
      <span className="font-semibold text-gray-900">हमारे बारे में</span>
    </nav>
  );
}

function AboutHero() {
  return (
    <section className="text-center space-y-4 max-w-3xl mx-auto">
      <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
        स्वतंत्र • निष्पक्ष • निर्णायक पत्रकारिता
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
        {SITE_CONFIG.name} ({SITE_CONFIG.hindiName})
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed font-medium">
        {SITE_CONFIG.tagline} — भारत की विविधता, लोकतंत्र, संवैधानिक मूल्यों और जनकल्याण को समर्पित एक प्रामाणिक डिजिटल समाचार मंच।
      </p>
    </section>
  );
}

function AboutCoreValues() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
        <div className="w-10 h-10 rounded-lg bg-[#233768] text-white flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">सत्यता और निष्पक्षता</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          हम किसी भी राजनीतिक दल, कॉर्पोरेट समूह अथवा विचारधारा के प्रभाव से पूर्णतः मुक्त रहकर केवल निष्पक्ष तथ्यों और सार्वजनिक हित पर आधारित समाचार प्रस्तुत करते हैं।
        </p>
      </div>

      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
        <div className="w-10 h-10 rounded-lg bg-[#E52532] text-white flex items-center justify-center">
          <Target className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">गहन और निर्णायक दृष्टि</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          सनसनीखेज सुर्खियों और क्लिकबेट के बजाय हम घटनाओं की तह तक जाकर उनके सामाजिक, आर्थिक और कानूनी प्रभावों का प्रामाणिक विश्लेषण करते हैं।
        </p>
      </div>

      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
        <div className="w-10 h-10 rounded-lg bg-green-700 text-white flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">डिजिटल आचार संहिता</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          हम भारतीय प्रेस परिषद (PCI) के नैतिक मानकों और सूचना प्रौद्योगिकी नियम 2021 के डिजिटल मीडिया नियमों का अक्षरशः अनुपालन करते हैं।
        </p>
      </div>
    </section>
  );
}

function AboutMissionStatement() {
  return (
    <section className="bg-[#F5F6F8] p-8 rounded-2xl border border-gray-200 space-y-4">
      <h2 className="text-2xl font-black text-gray-900">हमारा संपादकीय संकल्प</h2>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          डिजिटल युग में सूचनाओं की बाढ़ के साथ ही भ्रामक खबरों, अपुष्ट दावों और डीपफेक का संकट गहराया है। ऐसी स्थिति में <strong>&ldquo;द कन्क्लूसिव इंडियन&rdquo;</strong> का संकल्प है कि हम अपने पाठकों तक केवल वही जानकारी पहुंचाएं जो न्यूनतम दो स्वतंत्र स्रोतों से प्रमाणित हो चुकी हो।
        </p>
        <p>
          चाहे वह संसद का सत्र हो, सर्वोच्च न्यायालय का संविधान पीठ फैसला, केंद्रीय बजट, कृषि नीतियां या पूर्वोत्तर और सुदूर ग्रामीण क्षेत्रों के अनसुने मुद्दे — हमारी संपादकीय टीम राष्ट्रहित और नागरिक अधिकारों को सर्वोपरि रखकर कार्य करती है।
        </p>
      </div>
    </section>
  );
}

function AboutEditorialBoard({ authors }: { authors: Author[] }) {
  return (
    <section id="editorial-board" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#233768]" /> संपादकीय नेतृत्व (Editorial Board)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            सत्यापित पत्रकारों, विशेष विश्लेषकों और विषय विशेषज्ञों की हमारी समर्पित टीम
          </p>
        </div>
        <Link
          href="/authors"
          className="text-xs font-bold text-[#233768] hover:text-[#E52532] flex items-center gap-1 transition-colors"
        >
          सभी लेखक व संपादक देखें →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {authors.slice(0, 4).map((author) => (
          <div
            key={author.id}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex flex-col items-center text-center space-y-3"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-[#233768]/20">
              <ImageWithFallback
                src={author.avatar || ""}
                alt={author.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 hover:text-[#233768]">
                <Link href={`/author/${author.slug}`}>{author.name}</Link>
              </h3>
              <span className="text-[11px] font-semibold text-[#E52532] block mt-0.5">
                {author.role}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
              {author.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPodcastSeries() {
  return (
    <section className="bg-gradient-to-br from-[#1C2C4E] to-[#0F172A] text-white p-8 rounded-2xl space-y-6 shadow-md border border-slate-700/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-block px-3 py-1 bg-[#E52532] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            विशेष पॉडकास्ट शृंखला
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            &ldquo;शून्य से शिखर तक&rdquo; — अमित कुमार के साथ
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            जहाँ सुनना बदलता है सोच • भारत के संघर्ष, कला, साहित्य और समाज के अनसुने अध्याय
          </p>
        </div>
        <a
          href={SITE_CONFIG.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E52532] hover:bg-[#b81d27] text-white text-xs font-bold rounded-lg transition-colors shadow-sm w-fit"
        >
          <span>यूट्यूब चैनल देखें</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            चर्चित एपिसोड
          </span>
          <h3 className="text-xl font-bold leading-snug">
            बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            लोकगायिका व कवयित्री कविता शर्मा के साथ बुंदेली लोकसंस्कृति, जल संकट की विभीषिका, आल्हा-ऊदल के वीरगाथा काल से लेकर आधुनिक संघर्ष की मर्मस्पर्शी यात्रा का विशेष संवाद।
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={SITE_CONFIG.social.youtubeFeaturedVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1C2C4E] font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors"
            >
              ▶ वीडियो देखें (YouTube)
            </a>
            <Link
              href="/news/bundelkhand-suro-ki-rasdhar-kavita-sharma-podcast"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white underline underline-offset-4"
            >
              विस्तृत रिपोर्ट पढ़ें
            </Link>
          </div>
        </div>

        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/CfIwAGhPPvc"
            title="बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर - The Conclusive Indian"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function AboutCorporateDisclosure() {
  return (
    <section className="bg-amber-50/70 border border-amber-200 p-6 rounded-xl space-y-3 text-xs text-amber-950">
      <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
        <Info className="w-4 h-4 text-amber-700" />
        <span>संस्थागत पारदर्शिता एवं प्रकटीकरण (Corporate Disclosure)</span>
      </div>
      <p className="leading-relaxed">
        द कन्क्लूसिव इंडियन एक डिजिटल न्यूज़ पब्लिशर है। हमारा कॉर्पोरेट इकाई नाम <strong>{SITE_CONFIG.businessVerification.entityName}</strong> है। वर्तमान में पोर्टल अपने संपादकीय और तकनीकी बुनियादी ढांचे को अंतिम रूप दे रहा है।
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-200/80">
        <div>
          <span className="font-semibold text-gray-800">कॉर्पोरेट पहचान (CIN / MSME):</span>
          <p className="text-gray-600">{SITE_CONFIG.businessVerification.registrationNumberPlaceholder}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-800">कानूनी व शिकायत संपर्क:</span>
          <p className="text-gray-600">{SITE_CONFIG.compliance.grievanceOfficer.email}</p>
        </div>
      </div>
      <p className="text-[11px] text-amber-800 italic pt-1">
        {SITE_CONFIG.compliance.legalReviewDisclaimer}
      </p>
    </section>
  );
}

function AboutPolicyLinks() {
  return (
    <section className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-4">
      <h2 className="text-base font-bold text-gray-900">
        हमारी संस्थागत नीतियां एवं मानक:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <Link
          href="/editorial-policy"
          className="p-3 rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>संपादकीय नीति (Editorial Policy)</span>
        </Link>
        <Link
          href="/fact-check-policy"
          className="p-3 rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>तथ्य-जांच नीति (Fact-Check)</span>
        </Link>
        <Link
          href="/corrections-policy"
          className="p-3 rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>त्रुटि सुधार नीति (Corrections)</span>
        </Link>
        <Link
          href="/ownership-and-funding"
          className="p-3 rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>स्वामित्व एवं फंडिंग (Ownership)</span>
        </Link>
        <Link
          href="/grievance-redressal"
          className="p-3 rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>शिकायत निवारण (Grievance)</span>
        </Link>
        <Link
          href="/privacy-policy"
          className="p-3 rounded-lg border border-gray-200 hover:border-[#233768] hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>गोपनीयता नीति (Privacy Policy)</span>
        </Link>
      </div>
    </section>
  );
}

export default function AboutUsPage() {
  const authorsList = Object.values(MOCK_AUTHORS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `हमारे बारे में - ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    url: `${SITE_CONFIG.url}/about-us`,
    mainEntity: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.hindiName,
      url: SITE_CONFIG.url,
      publishingPrinciples: `${SITE_CONFIG.url}/editorial-policy`,
    },
    breadcrumb: {
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
          name: "हमारे बारे में",
          item: `${SITE_CONFIG.url}/about-us`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <AboutBreadcrumb />
        <AboutHero />
        <AboutCoreValues />
        <AboutMissionStatement />
        <AboutEditorialBoard authors={authorsList} />
        <AboutPodcastSeries />
        <AboutCorporateDisclosure />
        <AboutPolicyLinks />
      </div>
    </>
  );
}
