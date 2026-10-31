import { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Keyboard,
  Type,
  Sparkles,
  Mail,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `सुलभता नीति (Accessibility Statement) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की डिजिटल सुलभता नीति, WCAG 2.2 AA मानक अनुपालन, कीबोर्ड नेविगेशन और सुलभता सुधार रिपोर्टिंग।`,
  alternates: {
    canonical: "/accessibility",
  },
  openGraph: {
    title: `सुलभता नीति - ${SITE_CONFIG.name}`,
    description: `प्रत्येक नागरिक के लिए सुलभ, समावेशी और उपयोग में आसान डिजिटल पत्रकारिता।`,
  },
};

export default function AccessibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "सुलभता नीति (Accessibility Statement)",
    url: `${SITE_CONFIG.url}/accessibility`,
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
          name: "सुलभता नीति",
          item: `${SITE_CONFIG.url}/accessibility`,
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
          <span className="font-semibold text-gray-900">सुलभता नीति</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
            समावेशी एवं सुलभ डिजिटल पत्रकारिता
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            डिजिटल सुलभता वक्तव्य (Accessibility Statement)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>मानक: WCAG 2.2 Level AA दिशानिर्देश</span>
            <span>•</span>
            <span>अंतिम समीक्षा: 21 अक्टूबर 2026</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            <strong>{SITE_CONFIG.name} ({SITE_CONFIG.hindiName})</strong> यह सुनिश्चित करने के लिए प्रतिबद्ध है कि हमारी डिजिटल समाचार सामग्री दिव्यांगजनों सहित सभी पाठकों के लिए सुलभ, सहज और बाधारहित हो। हम वेब सामग्री सुलभता दिशानिर्देश (Web Content Accessibility Guidelines - WCAG 2.2) के लेवल AA मानकों का पालन करने के निरंतर प्रयासरत हैं।
          </p>
        </header>

        {/* Accessibility Features Section */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768]">
            पोर्टल पर लागू प्रमुख सुलभता सुविधाएं (Implemented Features)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feature 1 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Keyboard className="w-5 h-5 text-[#233768]" />
                <span>पूर्ण कीबोर्ड नेविगेशन (Keyboard Accessibility)</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                माउस के बिना केवल Tab और Arrow कीज से पूरी साइट को आसानी से नेविगेट किया जा सकता है। शीर्ष पर &ldquo;मुख्य सामग्री पर जाएं (Skip to main content)&rdquo; का सीधा लिंक उपलब्ध है।
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Eye className="w-5 h-5 text-green-600" />
                <span>उच्च रंग कंट्रास्ट (High Contrast Ratio)</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                सभी अक्षरों और पृष्ठभूमियों के बीच न्यूनतम 4.5:1 का कंट्रास्ट अनुपात बनाए रखा गया है ताकि कम दृष्टि (Low Vision) वाले पाठक भी आसानी से पढ़ सकें।
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Type className="w-5 h-5 text-purple-600" />
                <span>फॉन्ट साइज स्केलिंग (Text Resizer)</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                प्रत्येक समाचार लेख के शीर्ष पर फॉन्ट आकार को बड़ा (A+) अथवा छोटा (A-) करने का अंतर्निर्मित टूल दिया गया है।
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Sparkles className="w-5 h-5 text-[#E52532]" />
                <span>स्क्रीन रीडर व रिड्यूस्ड मोशन सपोर्ट</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                सिमेंटिक HTML5 (main, header, article, nav), चित्रों हेतु सार्थक ऑल्ट टेक्स्ट (Alt Text) और गति संवेदनशीलता वाले पाठकों हेतु Reduced Motion सपोर्ट।
              </p>
            </div>
          </div>
        </section>

        {/* Reporting Accessibility Issues */}
        <section className="bg-[#F5F6F8] p-6 sm:p-8 rounded-2xl border border-gray-200 space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Mail className="w-5 h-5 text-[#233768]" />
            <h2>सुलभता संबंधी सहायता एवं फीडबैक (Feedback & Assistance)</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            यदि आपको हमारी वेबसाइट के किसी पृष्ठ को पढ़ने, स्क्रीन रीडर से सुनने अथवा कीबोर्ड से उपयोग करने में कोई कठिनाई अनुभव हो, तो कृपया हमें तुरंत सूचित करें। हमारी तकनीकी टीम प्राथमिकता के आधार पर उसमें सुधार करेगी।
          </p>

          <div className="bg-white p-4 rounded-xl border border-gray-200 text-xs text-gray-800 space-y-1">
            <p>
              <strong>सुलभता सहायता डेस्क:</strong>{" "}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}?subject=Accessibility%20Feedback%20-%20The%20Conclusive%20Indian`}
                className="text-[#233768] underline font-bold"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </p>
            <p>
              <strong>फ़ोन सहायता:</strong> {SITE_CONFIG.phone} (सोमवार से शनिवार: 10:00 से 18:00 IST)
            </p>
            <p className="text-gray-500 pt-1">
              कृपया अपने संदेश में पृष्ठ का लिंक (URL), आपके द्वारा उपयोग किया जा रहा ब्राउज़र/डिवाइस और आने वाली बाधा का संक्षिप्त विवरण दें।
            </p>
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
