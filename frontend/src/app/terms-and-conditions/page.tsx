import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Copyright,
  AlertCircle,
  Shield,
  Scale,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `नियम एवं शर्तें (Terms & Conditions) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन वेबसाइट के उपयोग की विधिक शर्तें, बौद्धिक संपदा अधिकार, कॉपीराइट नियम और क्षेत्राधिकार।`,
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: `नियम एवं शर्तें - ${SITE_CONFIG.name}`,
    description: `द कन्क्लूसिव इंडियन के उपयोग से संबंधित विधिक शर्तें।`,
  },
};

export default function TermsAndConditionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "नियम एवं शर्तें (Terms & Conditions)",
    url: `${SITE_CONFIG.url}/terms-and-conditions`,
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
          name: "नियम एवं शर्तें",
          item: `${SITE_CONFIG.url}/terms-and-conditions`,
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
          <span className="font-semibold text-gray-900">नियम एवं शर्तें</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
            विधिक समझौता एवं उपयोग शर्तें
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            नियम एवं शर्तें (Terms & Conditions)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम अद्यतन: 21 अक्टूबर 2026</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            इस वेबसाइट <strong>{SITE_CONFIG.name} ({SITE_CONFIG.hindiName})</strong> का उपयोग करने से पूर्व कृपया इन नियमों एवं शर्तों को ध्यानपूर्वक पढ़ें। वेबसाइट का उपयोग करने पर यह माना जाएगा कि आप इन शर्तों से पूर्णतः सहमत हैं।
          </p>
        </header>

        {/* Section 1: Intellectual Property & Copyright */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Copyright className="w-5 h-5 text-[#233768]" /> 1. बौद्धिक संपदा एवं कॉपीराइट (Intellectual Property)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              इस पोर्टल पर प्रकाशित सभी समाचार आलेख, विशेष रिपोर्ट, वीडियो, ऑडियो पॉडकास्ट, शीर्षक, ग्राफिक्स और लोगो <strong>{SITE_CONFIG.name}</strong> की बौद्धिक संपदा हैं और भारतीय कॉपीराइट अधिनियम, 1957 के तहत संरक्षित हैं।
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>बिना पूर्व लिखित अनुमति के किसी भी सामग्री का पूर्ण व्यावसायिक पुनरुत्पादन, सिंडिकेशन अथवा अवैध प्रतिलिपि बनाना कॉपीराइट का उल्लंघन माना जाएगा।</li>
              <li><strong>उचित उपयोग (Fair Dealing):</strong> शैक्षणिक, शोध अथवा सामाजिक विमर्श हेतु उचित श्रेय (Proper Attribution & Backlink) के साथ उद्धरण दिए जा सकते हैं।</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Prohibited Conduct */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#E52532]" /> 2. प्रतिबंधित गतिविधियां (Prohibited Conduct)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>उपयोगकर्ताओं को वेबसाइट पर निम्नलिखित गतिविधियों में संलिप्त होने की अनुमति नहीं है:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>किसी अन्य व्यक्ति, जाति, धर्म, लिंग या समुदाय के विरुद्ध घृणास्पद टिप्पणी (Hate Speech) या मानहानिकारक सामग्री पोस्ट करना।</li>
              <li>वेबसाइट के बुनियादी ढांचे को बाधित करने हेतु स्वचालित बॉट्स, अनधिकृत वेब स्क्रैपर्स, अथवा दुर्भावनापूर्ण कोड (Malware/DDoS) का उपयोग करना।</li>
              <li>संपादकों अथवा पत्रकारों के नाम का दुरुपयोग कर गलत जानकारी प्रसारित करना।</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Disclaimers on Content */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" /> 3. सामग्री अस्वीकरण एवं दायित्व की सीमा (Limitation of Liability)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हम अपने समाचारों में उच्चतम स्तर की सटीकता सुनिश्चित करने का प्रयास करते हैं। तथापि, हमारे लेख केवल सामान्य जनसूचना के उद्देश्य से हैं और इन्हें विधिक, वित्तीय या चिकित्सकीय सलाह का विकल्प नहीं माना जा सकता।
            </p>
            <p>
              विस्तृत जानकारी हेतु कृपया हमारा{" "}
              <Link href="/disclaimer" className="text-[#233768] underline font-bold">
                कानूनी अस्वीकरण (Disclaimer)
              </Link>{" "}
              पढ़ें।
            </p>
          </div>
        </section>

        {/* Section 4: External Links */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" /> 4. बाहरी वेबसाइटों के लिंक (Third-Party Links)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हमारे समाचारों में आधिकारिक संदर्भों के लिए तीसरे पक्ष की वेबसाइटों के लिंक हो सकते हैं। उन बाहरी साइटों की सामग्री, विज्ञापन या गोपनीयता नीतियों पर हमारा कोई नियंत्रण नहीं है और हम उनके लिए उत्तरदायी नहीं हैं।
            </p>
          </div>
        </section>

        {/* Section 5: Governing Law and Jurisdiction */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#233768]" /> 5. लागू कानून एवं क्षेत्राधिकार (Governing Law & Jurisdiction)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              ये नियम एवं शर्तें भारत के गणराज्य के कानूनों के अधीन शासित और व्याख्यायित होंगी। इस वेबसाइट के उपयोग से उत्पन्न किसी भी विधिक विवाद के समाधान का अनन्य क्षेत्राधिकार केवल <strong>नई दिल्ली, भारत</strong> की सक्षम अदालतों के पास होगा।
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
