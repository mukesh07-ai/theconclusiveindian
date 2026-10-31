import { Metadata } from "next";
import Link from "next/link";
import {
  Megaphone,
  Shield,
  Layers,
  Video,
  Mail,
  ChevronRight,
  Info,
  Ban,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { PolicyHeader } from "@/components/common/PolicyHeader";

export const metadata: Metadata = {
  title: `विज्ञापन दें (Advertise With Us) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन पर विज्ञापन अवसर, ब्रांड साझेदारी, पॉडकास्ट प्रायोजन और विज्ञापन आचार संहिता।`,
  alternates: {
    canonical: "/advertise-with-us",
  },
  openGraph: {
    title: `विज्ञापन दें - ${SITE_CONFIG.name}`,
    description: `भारत के जागरूक और प्रबुद्ध हिंदी पाठकों तक अपने ब्रांड का संदेश पहुंचाएं।`,
  },
};

export default function AdvertiseWithUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "विज्ञापन दें (Advertise With Us)",
    url: `${SITE_CONFIG.url}/advertise-with-us`,
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
          name: "विज्ञापन दें",
          item: `${SITE_CONFIG.url}/advertise-with-us`,
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
          <span className="font-semibold text-gray-900">विज्ञापन दें</span>
        </nav>

        {/* Header */}
        <PolicyHeader
          badge="व्यावसायिक साझेदारी एवं मीडिया किट"
          title="विज्ञापन दें (Advertise With Us)"
          meta={["संस्करण: 2026-27", "अंतिम अद्यतन: 21 अक्टूबर 2026"]}
          description={
            <p>
              <strong>{SITE_CONFIG.name}</strong> देश भर के विचारशील, प्रबुद्ध और निर्णय लेने वाले पाठकों का विश्वसनीय डिजिटल ठिकाना है। यदि आप अपने ब्रांड, सेवा या सामाजिक संदेश को जागरूक हिंदी भाषियों तक प्रामाणिक रूप से पहुंचाना चाहते हैं, तो हम विभिन्न विज्ञापन समाधान प्रदान करते हैं।
            </p>
          }
        />

        {/* Ad Formats Section */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768]">
            उपलब्ध विज्ञापन प्रारूप (Advertising Solutions)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Display Ads */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#233768] text-white flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-gray-900">डिस्प्ले बैनर विज्ञापन</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                वेबसाइट के शीर्ष (Leaderboard), समाचार लेखों के बीच (In-Feed) और साइडबार में उच्च दृश्यता वाले आधुनिक IAB मानक बैनर।
              </p>
            </div>

            {/* Sponsored Stories */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#E52532] text-white flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-gray-900">प्रायोजित सामग्री (Brand Stories)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                ब्रांड के विजन, नवाचार और सफलता गाथा को प्रस्तुत करने वाले आलेख, जिन्हें ASCI दिशानिर्देशों के तहत स्पष्ट &ldquo;प्रायोजित&rdquo; लेबल दिया जाता है।
              </p>
            </div>

            {/* Video & Podcast Sponsorship */}
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-lg bg-purple-700 text-white flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-gray-900">पॉडकास्ट एवं वीडियो प्रायोजन</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                हमारे चर्चित शो &ldquo;शून्य से शिखर तक&rdquo; और वीडियो बुलेटिनों में ब्रांड एसोसिएशन, टाइटल स्पॉन्सरशिप व विशेष सेगमेंट पार्टनरशिप।
              </p>
            </div>
          </div>
        </section>

        {/* Ethical Firewall Notice */}
        <section className="p-6 bg-[#F5F6F8] rounded-2xl border border-gray-200 space-y-3 text-xs text-gray-700">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
            <Shield className="w-4 h-4 text-green-600" />
            <span>संपादकीय एवं विज्ञापन स्वतंत्रता की दीवार (Chinese Wall Principle)</span>
          </div>
          <p className="leading-relaxed">
            हम पत्रकारिता की स्वतंत्रता से कभी समझौता नहीं करते। हमारे विज्ञापनदाताओं का हमारी संपादकीय सामग्री, खोजी रिपोर्टों अथवा समाचार चयन पर कोई प्रभाव नहीं होता।
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>प्रायोजित सामग्री को समाचार के रूप में प्रस्तुत नहीं किया जाता। उस पर स्पष्ट &ldquo;प्रायोजित सामग्री (Sponsored Content)&rdquo; अंकित रहता है।</li>
            <li>हम भ्रामक विज्ञापनों को रोकने हेतु भारतीय विज्ञापन मानक परिषद (ASCI) की आचार संहिता का पूर्ण अनुपालन करते हैं।</li>
          </ul>
        </section>

        {/* Prohibited Ad Categories */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Ban className="w-5 h-5 text-red-600" />
            प्रतिबंधित विज्ञापन श्रेणियां (Prohibited Advertisements)
          </h2>
          <div className="space-y-2 text-xs text-gray-600 leading-relaxed pl-7">
            <p>हम निम्नलिखित श्रेणियों के विज्ञापन स्वीकार नहीं करते:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>सट्टा, गैर-कानूनी जुआ, लॉटरी अथवा अपंजीकृत वित्तीय स्कीम (Get-Rich-Quick Ponzi Schemes)।</li>
              <li>अंधविश्वास, तांत्रिक दावे, चमत्कारिक उपचार अथवा गैर-सत्यापित जादुई दवाइयां।</li>
              <li>नशीले पदार्थ, तम्बाकू, हथियार अथवा घृणास्पद/अश्लील सामग्री।</li>
              <li>किसी राजनीतिक दल द्वारा सांप्रदायिक विद्वेष भड़काने वाली सामग्री।</li>
            </ul>
          </div>
        </section>

        {/* Commercial Inquiry CTA */}
        <section className="bg-gradient-to-br from-[#1C2C4E] to-[#121E36] text-white p-6 sm:p-8 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold">व्यावसायिक पूछताछ एवं दर सूची (Media Kit)</h2>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            विज्ञापन दरों, कस्टमाइज्ड अभियानों अथवा मीडिया साझेदारी के लिए हमारी व्यावसायिक टीम से सीधे संपर्क करें।
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 text-xs">
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}?subject=Advertising%20Inquiry%20-%20The%20Conclusive%20Indian`}
              className="px-5 py-2.5 bg-[#E52532] hover:bg-[#b81d27] text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4" /> व्यावसायिक ईमेल भेजें
            </a>
            <span className="text-gray-300">
              ईमेल: <strong>{SITE_CONFIG.contactEmail}</strong>
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
