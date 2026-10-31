import { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  TrendingUp,
  HeartPulse,
  Scale,
  MessageSquare,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { PolicyHeader } from "@/components/common/PolicyHeader";

export const metadata: Metadata = {
  title: `कानूनी अस्वीकरण (Disclaimer) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन का सामान्य कानूनी अस्वीकरण, वित्तीय, स्वास्थ्य व विधिक समाचारों की सीमाएं और पाठक विवेक संबंधी सूचना।`,
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: `कानूनी अस्वीकरण - ${SITE_CONFIG.name}`,
    description: `द कन्क्लूसिव इंडियन की सामग्री संबंधी विधिक अस्वीकरण।`,
  },
};

export default function DisclaimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "कानूनी अस्वीकरण (Legal Disclaimer)",
    url: `${SITE_CONFIG.url}/disclaimer`,
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
          name: "अस्वीकरण",
          item: `${SITE_CONFIG.url}/disclaimer`,
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
          <span className="font-semibold text-gray-900">कानूनी अस्वीकरण</span>
        </nav>

        {/* Header */}
        <PolicyHeader
          badge="विधिक स्पष्टीकरण एवं दायित्व सीमाएं"
          title="कानूनी अस्वीकरण (Legal Disclaimer)"
          meta={["प्रभावी तिथि: 1 जनवरी 2024", "अंतिम समीक्षा: 21 अक्टूबर 2026"]}
          description={
            <p>
              यह विधिक अस्वीकरण स्पष्ट करता है कि <strong>{SITE_CONFIG.name} ({SITE_CONFIG.hindiName})</strong> पर उपलब्ध सूचनाओं का स्वरूप क्या है और पाठकों से किस प्रकार के विवेक की अपेक्षा की जाती है।
            </p>
          }
        />

        {/* Section 1: General Informational Nature */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#233768]" /> 1. सामान्य सूचनात्मक स्वरूप (General Information Only)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              इस पोर्टल पर प्रकाशित सभी समाचार, विश्लेषण, आलेख और विचार सामग्री केवल सामान्य जनसूचना, पत्रकारिता और जागरूकता के उद्देश्य से प्रदान की जाती है।
            </p>
            <p>
              हम तथ्यों की सत्यता सुनिश्चित करने के लिए हरसंभव प्रयास करते हैं, किंतु किसी भी जानकारी के आधार पर कोई वित्तीय, कानूनी, व्यावसायिक अथवा व्यक्तिगत निर्णय लेने से पूर्व संबंधित क्षेत्र के अधिकृत पेशेवर से परामर्श लेना आवश्यक है।
            </p>
          </div>
        </section>

        {/* Section 2: Financial Disclaimer */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" /> 2. वित्तीय एवं शेयर बाजार संबंधी अस्वीकरण (Financial News Disclaimer)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हमारे व्यापार व अर्थव्यवस्था अनुभाग में प्रकाशित शेयर बाजार, म्यूचुअल फंड, क्रिप्टोकरेंसी, बजट विश्लेषण अथवा निवेश से जुड़े समाचार केवल सूचनात्मक विश्लेषण हैं।
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>{SITE_CONFIG.name}</strong> सेबी (SEBI) पंजीकृत निवेश सलाहकार (Investment Advisor) नहीं है।</li>
              <li>किसी भी स्टॉक या वित्तीय उत्पाद में निवेश से पूर्व अपने वित्तीय सलाहकार (Certified Financial Planner) से परामर्श अवश्य करें। शेयर बाजार में निवेश बाजार जोखिमों के अधीन है।</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Health and Medical Disclaimer */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-red-600" /> 3. स्वास्थ्य एवं चिकित्सा संबंधी अस्वीकरण (Health & Medical Disclaimer)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              स्वास्थ्य, योग, आयुर्वेद और जीवनशैली अनुभाग में दी गई जानकारियां केवल सामान्य जागरूकता हेतु हैं।
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>यह सामग्री किसी पंजीकृत चिकित्सक (Qualified Medical Doctor) द्वारा दिए जाने वाले निदान, दवा या उपचार का विकल्प नहीं है।</li>
              <li>किसी भी बीमारी, लक्षण अथवा घरेलू उपचार को अपनाने से पूर्व अपने डॉक्टर से सलाह अवश्य लें।</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Opinions Disclaimer */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#233768]" /> 4. विचार एवं संपादकीय कॉलम (Op-ed & Guest Columns)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हमारे &ldquo;संपादकीय व विचार (Opinion)&rdquo; अनुभाग में प्रकाशित आलेखों में व्यक्त विचार संबंधित लेखक के निजी विचार हैं। आवश्यक नहीं कि पोर्टल प्रबंधन, संपादक अथवा प्रकाशक उन विचारों से पूरी तरह सहमत हों।
            </p>
          </div>
        </section>

        {/* Section 5: Legal Disclaimer */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Scale className="w-5 h-5 text-gray-700" /> 5. कानूनी एवं न्यायिक मामले (Legal Reporting)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              अदालतों की कार्यवाही और एफआईआर संबंधी रिपोर्टें न्यायिक पारदर्शिता के हित में दी जाती हैं। किसी भी आरोपी को तब तक निर्दोष माना जाना चाहिए जब तक कि सक्षम न्यायालय द्वारा उसे दोषी सिद्ध न कर दिया जाए।
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
