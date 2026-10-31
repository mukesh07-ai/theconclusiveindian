import { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Scale,
  Send,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `तथ्य जांच नीति (Fact-Check Policy) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की तथ्य सत्यापन पद्धति, फोरेंसिक जांच प्रक्रिया, निष्पक्षता मानक और पाठकों द्वारा फेक न्यूज़ रिपोर्टिंग की प्रक्रिया।`,
  alternates: {
    canonical: "/fact-check-policy",
  },
  openGraph: {
    title: `तथ्य जांच नीति - ${SITE_CONFIG.name}`,
    description: `डिजिटल युग में फर्जी दावों, डीपफेक और भ्रामक आंकड़ों की स्वतंत्र जांच पद्धति।`,
  },
};

export default function FactCheckPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "तथ्य जांच नीति (Fact-Check Policy)",
    url: `${SITE_CONFIG.url}/fact-check-policy`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
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
          name: "तथ्य जांच नीति",
          item: `${SITE_CONFIG.url}/fact-check-policy`,
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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">तथ्य जांच नीति</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
            तथ्य सत्यापन एवं फोरेंसिक निष्पक्षता
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            तथ्य जांच नीति एवं कार्यप्रणाली (Fact-Checking Methodology)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम समीक्षा: 21 अक्टूबर 2026</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            <strong>{SITE_CONFIG.name}</strong> का मानना है कि तथ्य किसी भी पत्रकारिता की नींव हैं। सोशल मीडिया और डिजिटल संचार के दौर में वायरल हो रहे भ्रामक दावों, डीपफेक और तोड़-मरोड़ कर पेश की गई सूचनाओं की सच्चाई सामने लाने हेतु हमारी सख्त 4-स्तरीय जांच प्रक्रिया कार्य करती है।
          </p>
        </header>

        {/* 4-Step Methodology */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768]">
            हमारी 4-चरणीय तथ्य जांच कार्यप्रणाली (4-Step Verification Framework)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="w-7 h-7 rounded-lg bg-[#233768] text-white flex items-center justify-center text-xs">
                  1
                </div>
                <span>दावे की पहचान एवं जनहित प्राथमिकता</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-9">
                हम सोशल मीडिया (एक्स, फेसबुक, व्हाट्सएप, यूट्यूब) पर तेजी से वायरल हो रहे ऐसे दावों को चुनते हैं जिनका सीधा असर सार्वजनिक स्वास्थ्य, राष्ट्रीय सुरक्षा, सांप्रदायिक सौहार्द या चुनाव प्रक्रिया पर पड़ता है।
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="w-7 h-7 rounded-lg bg-[#233768] text-white flex items-center justify-center text-xs">
                  2
                </div>
                <span>प्राथमिक साक्ष्य व आधिकारिक रिकॉर्ड</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-9">
                दावे से जुड़े मूल सरकारी गजट, पीआईबी विज्ञप्ति, अदालत के फैसले, संसद की कार्यवाही के अंश अथवा स्वतंत्र अंतरराष्ट्रीय शोध पत्रों का अवलोकन किया जाता है।
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="w-7 h-7 rounded-lg bg-[#233768] text-white flex items-center justify-center text-xs">
                  3
                </div>
                <span>डिजिटल व फोरेंसिक मीडिया जांच</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-9">
                तस्वीरों और वीडियोज की पड़ताल के लिए रिवर्स इमेज सर्च (Google, Yandex), वीडियो की फ्रेम-बाय-फ्रेम जांच (InVID), मेटाडेटा विश्लेषण और जियो-लोकेशन ट्रैकिंग का उपयोग किया जाता है।
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="w-7 h-7 rounded-lg bg-[#233768] text-white flex items-center justify-center text-xs">
                  4
                </div>
                <span>संबद्ध पक्षों से सीधा संपर्क (Right of Reply)</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-9">
                जिस व्यक्ति, संगठन या विभाग से संबंधित दावा है, उनके अधिकृत प्रवक्ता या जनसंपर्क अधिकारी से आधिकारिक बयान लेकर दोनों पक्षों की स्थिति स्पष्ट की जाती है।
              </p>
            </div>
          </div>
        </section>

        {/* Non-Partisanship Principles */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#233768]" /> निष्पक्षता एवं गैर-दलीय प्रतिबद्धता (Non-Partisanship)
          </h2>
          {/* react-doctor-disable-next-line duplicate-jsx-subtree */}
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हम तथ्य-जांच करते समय किसी भी राजनीतिक दल, नेता या विचारधारा के प्रति पूर्वग्रह नहीं रखते। हमारा मापदंड केवल यह होता है कि क्या दावा सत्य है अथवा नहीं:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>सत्तारूढ़ दल और विपक्षी दलों के दावों पर समान मानकों और समान साक्ष्यों से जांच की जाती है।</li>
              <li>हमारी टीम के किसी भी सदस्य को किसी राजनीतिक दल की सदस्यता लेने या सार्वजनिक राजनीतिक प्रचार में भाग लेने की अनुमति नहीं है।</li>
              <li>जांच रिपोर्ट में उपयोग किए गए सभी वेब लिंक, स्क्रीनशॉट और संदर्भ दस्तावेज़ सार्वजनिक किए जाते हैं ताकि पाठक स्वयं भी उनकी पुष्टि कर सकें।</li>
            </ul>
          </div>
        </section>

        {/* How Readers Can Request a Fact-Check */}
        <section className="p-6 bg-gradient-to-br from-[#1C2C4E] to-[#121E36] text-white rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold">क्या आपको किसी खबर या वीडियो पर संदेह है?</h2>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            यदि आपको सोशल मीडिया, व्हाट्सएप ग्रुप्स या अन्य माध्यमों पर कोई संदिग्ध दावा या भ्रामक सूचना दिखाई दे, तो उसकी स्क्रीनशॉट अथवा लिंक हमारी फैक्ट-चेक टीम को भेजें।
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 text-xs">
            <a
              href={`mailto:${SITE_CONFIG.editorialEmail}?subject=Fact-Check%20Request`}
              className="px-4 py-2 bg-[#E52532] hover:bg-[#b81d27] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> तथ्य-जांच का अनुरोध भेजें
            </a>
            <span className="text-gray-300">
              ईमेल: <strong>{SITE_CONFIG.editorialEmail}</strong>
            </span>
          </div>
        </section>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <Info className="w-4 h-4 text-gray-600" />
            <span>विधिक पारदर्शिता नोट (Legal Transparency Notice):</span>
          </div>
          <p>{SITE_CONFIG.compliance.legalReviewDisclaimer}</p>
        </div>
      </div>
    </>
  );
}
