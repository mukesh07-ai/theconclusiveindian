import { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  FileCheck,
  RotateCcw,
  Clock,
  Mail,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `सुधार एवं संशोधन नीति (Corrections Policy) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की तथ्यात्मक अशुद्धि सुधार नीति, पाठकों द्वारा त्रुटि रिपोर्टिंग प्रक्रिया, संशोधन नोट मानक और समयसीमा।`,
  alternates: {
    canonical: "/corrections-policy",
  },
  openGraph: {
    title: `सुधार नीति - ${SITE_CONFIG.name}`,
    description: `त्रुटियों को छिपाने के बजाय पारदर्शी और त्वरित सुधार की हमारी नीति।`,
  },
};

export default function CorrectionsPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "सुधार एवं संशोधन नीति (Corrections Policy)",
    url: `${SITE_CONFIG.url}/corrections-policy`,
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
          name: "सुधार नीति",
          item: `${SITE_CONFIG.url}/corrections-policy`,
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
          <span className="font-semibold text-gray-900">सुधार नीति</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            पारदर्शिता एवं उत्तरदायित्व
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            सुधार एवं संशोधन नीति (Corrections & Updates Policy)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम समीक्षा: 21 अक्टूबर 2026</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            <strong>{SITE_CONFIG.name}</strong> अपने पाठकों को पूर्णतः सटीक और विश्वसनीय समाचार प्रदान करने के लिए प्रतिबद्ध है। पत्रकारिता में पूरी सावधानी बरतने के बावजूद यदि अनजाने में कोई तथ्यात्मक त्रुटि होती है, तो उसे छिपाने के बजाय तुरंत और पूरी पारदर्शिता के साथ सार्वजनिक रूप से सुधारना हमारा नैतिक दायित्व है।
          </p>
        </header>

        {/* Categories of Amendments */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768]">
            संशोधनों के प्रकार एवं मानक (Classification of Corrections)
          </h2>

          <div className="space-y-4">
            {/* Type 1: Factual Correction */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                1. तथ्यात्मक संशोधन (Factual Correction)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">
                यदि किसी रिपोर्ट में किसी व्यक्ति का नाम, पदनाम, संख्यात्मक आंकड़े, स्थान, दिनांक या उद्धरण (Quotes) गलत प्रकाशित हो गया हो, तो संबंधित वाक्य को सही किया जाता है और लेख के अंत में स्पष्ट &ldquo;संशोधन नोट (Correction Note)&rdquo; जोड़ा जाता है, जिसमें बताया जाता है कि मूल लेख में क्या अशुद्धि थी और उसे कब संशोधित किया गया।
              </p>
            </div>

            {/* Type 2: Clarification */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                2. स्पष्टीकरण (Clarification)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">
                यदि प्रकाशित तथ्य तकनीकी रूप से गलत न हों, किंतु भाषा या संदर्भ के अभाव में किसी भ्रम की संभावना उत्पन्न हो रही हो, तो लेख में अतिरिक्त संदर्भ जोड़कर &ldquo;स्पष्टीकरण नोट&rdquo; अंकित किया जाता है।
              </p>
            </div>

            {/* Type 3: Editorial Update */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                3. संपादकीय अद्यतन (Developing Story Update)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">
                तेजी से बदलते घटनाक्रम (उदा. प्राकृतिक आपदा, अदालती सुनवाई, संसद बहस) में नई जानकारी प्राप्त होने पर लेख को अद्यतन किया जाता है तथा शीर्ष पर &ldquo;अपडेट: [समय]&rdquo; स्पष्ट रूप से प्रदर्शित किया जाता है।
              </p>
            </div>

            {/* Type 4: Retraction */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-600" />
                4. सामग्री का खंडन एवं वापसी (Retraction)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">
                यदि किसी जांच में यह पाया जाए कि कोई प्रकाशित समाचार मूलतः असत्य या भ्रामक स्रोत पर आधारित था, तो उस रिपोर्ट को वापस लेकर सार्वजनिक माफी के साथ &ldquo;खंडन नोट (Retraction Notice)&rdquo; प्रकाशित किया जाता है।
              </p>
            </div>
          </div>
        </section>

        {/* How Readers Can Report an Error */}
        <section className="bg-[#F5F6F8] p-6 sm:p-8 rounded-2xl border border-gray-200 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#233768]" />
            पाठक तथ्यात्मक त्रुटि कैसे सूचित करें? (How to Report an Error)
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            हम अपने पाठकों के सतर्क दृष्टिकोण का स्वागत करते हैं। यदि आप हमारे किसी लेख, वीडियो अथवा सोशल मीडिया पोस्ट में कोई तथ्यात्मक त्रुटि पाते हैं, तो कृपया नीचे दिए गए माध्यमों से हमारी संपादकीय टीम को सूचित करें:
          </p>

          <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-2 text-xs text-gray-700">
            <p>
              <strong>ईमेल द्वारा:</strong>{" "}
              <a
                href={`mailto:${SITE_CONFIG.editorialEmail}?subject=Factual%20Correction%20Request`}
                className="text-[#233768] underline font-bold"
              >
                {SITE_CONFIG.editorialEmail}
              </a>
            </p>
            <p>
              <strong>विषय पंक्ति (Subject Line):</strong> &ldquo;तथ्य सुधार अनुरोध: [लेख का शीर्षक/URL]&rdquo;
            </p>
            <p>
              <strong>अनिवार्य विवरण:</strong> (1) लेख का वेब लिंक (URL), (2) त्रुटिपूर्ण पंक्ति अथवा तथ्य, (3) सही तथ्य और उसका प्राथमिक साक्ष्य (दस्तावेज़/आधिकारिक लिंक)।
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/contact-us"
              className="px-5 py-2.5 bg-[#233768] hover:bg-[#18274b] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              संपर्क फ़ॉर्म द्वारा त्रुटि भेजें →
            </Link>
          </div>
        </section>

        {/* Timeframe SLA */}
        <section className="p-5 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 space-y-2">
          <h3 className="font-bold text-sm text-gray-900">
            कार्यवाही की समयसीमा (Resolution Timeframe)
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><strong>पावती:</strong> त्रुटि सूचना प्राप्त होने के 24 घंटे के भीतर पाठक को ईमेल पावती प्रेषित की जाती है।</li>
            <li><strong>जांच व संशोधन:</strong> संबंधित संपादक द्वारा प्राथमिक साक्ष्यों का परीक्षण कर 48 घंटे के भीतर आवश्यक संशोधन प्रकाशित किया जाता है।</li>
          </ul>
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
