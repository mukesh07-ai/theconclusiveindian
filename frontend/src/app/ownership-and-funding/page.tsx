import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { PolicyHeader } from "@/components/common/PolicyHeader";

export const metadata: Metadata = {
  title: `स्वामित्व एवं फंडिंग (Ownership & Funding) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की स्वामित्व संरचना, फंडिंग के स्रोत, व्यावसायिक स्वतंत्रता और संस्थागत प्रकटीकरण।`,
  alternates: {
    canonical: "/ownership-and-funding",
  },
  openGraph: {
    title: `स्वामित्व एवं फंडिंग - ${SITE_CONFIG.name}`,
    description: `पारदर्शी मीडिया स्वामित्व और वित्तीय स्वतंत्रता की घोषणा।`,
  },
};

export default function OwnershipAndFundingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "स्वामित्व एवं फंडिंग प्रकटीकरण (Ownership & Funding Disclosure)",
    url: `${SITE_CONFIG.url}/ownership-and-funding`,
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
          name: "स्वामित्व एवं फंडिंग",
          item: `${SITE_CONFIG.url}/ownership-and-funding`,
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
          <span className="font-semibold text-gray-900">स्वामित्व एवं फंडिंग</span>
        </nav>

        {/* Header */}
        <PolicyHeader
          badge="संस्थागत प्रकटीकरण एवं वित्तीय पारदर्शिता"
          title="स्वामित्व एवं वित्तीय प्रकटीकरण (Ownership & Funding Disclosure)"
          meta={["संस्करण: 2026", "समीक्षा: 21 अक्टूबर 2026"]}
          description={
            <p>
              एक स्वतंत्र और निष्पक्ष डिजिटल समाचार संगठन के रूप में, <strong>{SITE_CONFIG.name} ({SITE_CONFIG.hindiName})</strong> का मानना है कि पाठकों को यह जानने का पूर्ण अधिकार है कि मीडिया का स्वामित्व किसके पास है और उसका संचालन किन वित्तीय स्रोतों से होता है।
            </p>
          }
        />

        {/* Section 1: Ownership Structure */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#233768]" /> 1. स्वामित्व संरचना (Ownership Structure)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              <strong>{SITE_CONFIG.name}</strong> एक स्वतंत्र डिजिटल मीडिया पहल है। इसका संचालन वर्तमान में <strong>{SITE_CONFIG.businessVerification.entityName}</strong> द्वारा किया जा रहा है।
            </p>
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <Info className="w-4 h-4 text-amber-700" />
                <span>सत्यापन स्थिति (Verification Notice):</span>
              </div>
              <p>
                हमारे कॉर्पोरेट पंजीकरण का विवरण: <strong>{SITE_CONFIG.businessVerification.registrationNumberPlaceholder}</strong>।
              </p>
              <p className="text-gray-600">
                द कन्क्लूसिव इंडियन किसी भी राजनीतिक दल, राजनीतिक नेता, धार्मिक न्यास अथवा कॉर्पोरेट लॉबिंग समूह के स्वामित्व में नहीं है।
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Funding and Revenue Model */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" /> 2. फंडिंग एवं राजस्व मॉडल (Revenue & Funding Streams)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हमारे डिजिटल पत्रकारिता संचालन और पत्रकारों के पारिश्रमिक हेतु वित्तीय संसाधन निम्नलिखित वैध एवं पारदर्शी माध्यमों से अर्जित होते हैं:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>प्रोग्रामेटिक एवं डिस्प्ले डिजिटल विज्ञापन (Display Advertising):</strong> हमारी वेबसाइट पर दिखने वाले मानक आईएबी (IAB) विज्ञापन स्लॉट्स से प्राप्त राजस्व।
              </li>
              <li>
                <strong>प्रायोजित सामग्री एवं ब्रांड स्टोरीज़ (Sponsored Content):</strong> कॉरपोरेट या सामाजिक नवाचारों पर आधारित ब्रांड साझेदारी, जिसे भारतीय विज्ञापन मानक परिषद (ASCI) के अनुरूप स्पष्ट &ldquo;प्रायोजित&rdquo; लेबल के साथ प्रस्तुत किया जाता है।
              </li>
              <li>
                <strong>वीडियो एवं पॉडकास्ट प्रायोजन (Podcast Sponsorship):</strong> हमारे प्रमुख शो जैसे &ldquo;शून्य से शिखर तक&rdquo; में ब्रांड सहयोग।
              </li>
              <li>
                <strong>पाठक समर्थन (Reader Support - प्रस्तावित):</strong> भविष्य में स्वतंत्र पत्रकारिता को और सुदृढ़ करने हेतु स्वैच्छिक पाठक अंशदान योजना।
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Editorial Independence Firewall */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-600" /> 3. वित्तीय स्वतंत्रता एवं संपादकीय सुरक्षा (Editorial Firewall)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हमारा स्पष्ट और अपरिवर्तनीय नियम है: <strong>राजस्व कभी भी संपादकीय नीति तय नहीं कर सकता।</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>कोई भी विज्ञापनदाता किसी भी खोजी रिपोर्ट, तथ्य-जांच या समीक्षा को प्रभावित या वापस नहीं करवा सकता।</li>
              <li>हमारे संपादक और पत्रकार विज्ञापन विभाग के वाणिज्यिक सौदों से पूर्णतः अलग रहते हैं।</li>
            </ul>
          </div>
        </section>

        {/* Contact for Inquiries */}
        <section className="p-5 bg-[#F5F6F8] rounded-xl border border-gray-200 text-xs text-gray-700 space-y-2">
          <h3 className="font-bold text-sm text-gray-900">
            स्वामित्व व वित्तीय पारदर्शिता संपर्क:
          </h3>
          <p>
            यदि आपके पास हमारे स्वामित्व, निवेश अथवा फंडिंग से संबंधित कोई विधिक प्रश्न या सुझाव है, तो कृपया हमें लिखें:{" "}
            <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-[#233768] underline font-bold">
              {SITE_CONFIG.contactEmail}
            </a>
          </p>
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
