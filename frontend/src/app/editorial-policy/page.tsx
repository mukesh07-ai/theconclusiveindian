import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Shield,
  FileText,
  ChevronRight,
  Scale,
  BrainCircuit,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `संपादकीय नीति (Editorial Policy) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन के संपादकीय मानक, तथ्य सत्यापन, निष्पक्षता, एआई उपयोग नीति और पत्रकारिता आचार संहिता।`,
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: `संपादकीय नीति - ${SITE_CONFIG.name}`,
    description: `तथ्य सत्यापन, स्वतंत्रता और नैतिक पत्रकारिता के बुनियादी सिद्धांत।`,
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "संपादकीय नीति एवं पत्रकारिता आचार संहिता",
    url: `${SITE_CONFIG.url}/editorial-policy`,
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
          name: "संपादकीय नीति",
          item: `${SITE_CONFIG.url}/editorial-policy`,
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
          <span className="font-semibold text-gray-900">संपादकीय नीति</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
            संपादकीय स्वतंत्रता व विश्वसनीयता
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            संपादकीय नीति एवं पत्रकारिता आचार संहिता
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम समीक्षा: 21 अक्टूबर 2026</span>
            <span>•</span>
            <span>संस्करण: 2.1</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            <strong>{SITE_CONFIG.name} ({SITE_CONFIG.hindiName})</strong> का संपूर्ण संचालन सत्यता, स्वतंत्रता, निष्पक्षता और लोकतांत्रिक जनसरोकार के संवैधानिक मूल्यों पर आधारित है।
          </p>
        </header>

        {/* Section 1: Editorial Independence */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#233768]" /> 1. संपादकीय स्वतंत्रता एवं निष्पक्षता (Independence & Impartiality)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              {SITE_CONFIG.name} किसी भी राजनीतिक दल, औद्योगिक घराने, धार्मिक संगठन या विचारधारा से वित्तीय अथवा वैचारिक रूप से स्वतंत्र है। हमारे समाचार कवरेज और संपादकीय विश्लेषण केवल जनता के जानने के अधिकार और साक्ष्यों के आधार पर निर्धारित होते हैं।
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>व्यावसायिक विभाजन (Wall between News & Ads):</strong> हमारे वाणिज्यिक (Advertising) विभाग का संपादकीय सामग्री पर कोई नियंत्रण या प्रभाव नहीं होता।</li>
              <li><strong>हितों का टकराव (Conflict of Interest):</strong> हमारे पत्रकारों को किसी ऐसे विषय पर रिपोर्टिंग करने से रोका जाता है जिसमें उनका व्यक्तिगत, पारिवारिक या वित्तीय हित जुड़ा हो।</li>
              <li><strong>समान अवसर:</strong> किसी भी व्यक्ति या संस्था पर लगे आरोपों के मामले में उनका पक्ष (Right to Reply) निष्पक्षता से प्रस्तुत किया जाना अनिवार्य है।</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Sourcing and Fact Verification */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" /> 2. स्रोत एवं तथ्य सत्यापन (Sourcing & Verification)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              समाचार की पहली शर्त उसकी सत्यता है। हम किसी भी अपुष्ट दावे, सोशल मीडिया अफवाह या गॉसिप को बिना जांचे प्रकाशित नहीं करते।
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>प्राथमिक स्रोत:</strong> हम आधिकारिक गजट, न्यायालयीन आदेश, अधिकृत प्रेस विज्ञप्ति या प्रत्यक्षदर्शी बयानों को ही प्राथमिक साक्ष्य मानते हैं।</li>
              <li><strong>दोहरे सत्यापन का नियम (Two-Source Rule):</strong> विवादास्पद अथवा संवेदनशील दावों में न्यूनतम दो स्वतंत्र और विश्वसनीय स्रोतों से पुष्टि अनिवार्य है।</li>
              <li><strong>अनाम स्रोत (Anonymous Sources):</strong> केवल असाधारण मामलों में ही व्हिसलब्लोअर की पहचान गुप्त रखी जाती है, और इसके लिए प्रधान संपादक की पूर्व अनुमति आवश्यक होती है।</li>
            </ul>
            <p className="pt-1">
              हमारी विस्तृत जांच प्रक्रिया जानने के लिए हमारी{" "}
              <Link href="/fact-check-policy" className="text-[#233768] underline font-bold">
                तथ्य-जांच नीति (Fact-Check Policy)
              </Link>{" "}
              देखें।
            </p>
          </div>
        </section>

        {/* Section 3: AI and Modern Technology */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-600" /> 3. कृत्रिम बुद्धिमत्ता (AI) एवं तकनीकी नीति
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हम आधुनिक डिजिटल टूल्स और आर्टिफिशियल इंटेलिजेंस का उपयोग अनुवाद सहायता, वर्तनी सुधार और डेटा विश्लेषण के लिए कर सकते हैं, किंतु:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>मानव संपादन अनिवार्य:</strong> कोई भी लेख या रिपोर्ट केवल एआई द्वारा स्वतः उत्पन्न कर सीधे प्रकाशित नहीं की जा सकती। प्रत्येक शब्द का सत्यापन अनुभवी मानव संपादक द्वारा किया जाता है।</li>
              <li><strong>डीपफेक व जनरेटिव इमेजरी का निषेध:</strong> समाचार संदर्भ में एआई-जनित नकली छवियों या ऑडियो का समाचार के रूप में उपयोग पूर्णतः वर्जित है। यदि किसी ग्राफिक में एआई का उपयोग हुआ हो, तो उसे &ldquo;एआई चित्रांकन (AI Illustration)&rdquo; का स्पष्ट लेबल दिया जाता है।</li>
              <li><strong>तथ्य संप्रभुता:</strong> एआई टूल्स द्वारा दिए गए उद्धरणों या आंकड़ों को जब तक मूल दस्तावेज़ से न मिला लिया जाए, समाचार में शामिल नहीं किया जाता।</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Digital Media Code of Ethics */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E52532]" /> 4. डिजिटल मीडिया आचार संहिता (Code of Ethics)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हम भारत सरकार के सूचना प्रौद्योगिकी (मध्यवर्ती संस्थाओं के लिए दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 के भाग-III के तहत निर्धारित डिजिटल आचार संहिता का निष्ठापूर्वक पालन करते हैं।
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>घृणास्पद भाषण (Hate Speech) का निषेध:</strong> साम्प्रदायिक, जातीय अथवा भाषाई विद्वेष भड़काने वाली किसी भी सामग्री को स्थान नहीं दिया जाता।</li>
              <li><strong>बाल एवं महिला संरक्षण:</strong> यौन अपराधों से पीड़ित बच्चों या महिलाओं की पहचान प्रत्यक्ष या परोक्ष किसी भी रूप में उजागर नहीं की जाती (POCSO व भा.दं.सं. के अनुरूप)।</li>
              <li><strong>न्यायालयीन मर्यादा:</strong> विचाराधीन मामलों में मीडिया ट्रायल से बचा जाता है और अदालत की अवमानना का पूर्ण ध्यान रखा जाता है।</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Corrections & Grievances */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" /> 5. त्रुटि सुधार एवं शिकायत निवारण
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              यदि किसी रिपोर्ट में अनजाने में कोई तथ्यात्मक अशुद्धि होती है, तो उसे छिपाने के बजाय हम तत्काल सुधार नोट के साथ स्पष्ट करते हैं। पाठक सीधे हमारी{" "}
              <Link href="/corrections-policy" className="text-[#233768] underline font-bold">
                सुधार नीति (Corrections Policy)
              </Link>{" "}
              अथवा{" "}
              <Link href="/grievance-redressal" className="text-[#233768] underline font-bold">
                शिकायत निवारण प्रक्रिया (Grievance Redressal)
              </Link>{" "}
              के तहत संपर्क कर सकते हैं।
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
