import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `गोपनीयता नीति (Privacy Policy) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की गोपनीयता नीति, डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act 2023) अनुपालन, उपयोगकर्ता अधिकार और डेटा सुरक्षा उपाय।`,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: `गोपनीयता नीति - ${SITE_CONFIG.name}`,
    description: `पाठक डेटा सुरक्षा, गोपनीयता अधिकार और पारदर्शी नीतियां।`,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "गोपनीयता नीति (Privacy Policy)",
    url: `${SITE_CONFIG.url}/privacy-policy`,
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
          name: "गोपनीयता नीति",
          item: `${SITE_CONFIG.url}/privacy-policy`,
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
          <span className="font-semibold text-gray-900">गोपनीयता नीति</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-green-500/10 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider">
            डेटा सुरक्षा एवं उपयोगकर्ता अधिकार
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            गोपनीयता नीति (Privacy Policy)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम अद्यतन: 21 अक्टूबर 2026</span>
            <span>•</span>
            <span>डीपीडीपी अधिनियम, 2023 के अनुरूप</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            <strong>{SITE_CONFIG.name} ({SITE_CONFIG.hindiName})</strong> (&ldquo;हम&rdquo;, &ldquo;हमारा&rdquo; अथवा &ldquo;पोर्टल&rdquo;) अपने पाठकों की गोपनीयता और डेटा संप्रभुता का पूर्ण सम्मान करता है। यह नीति स्पष्ट करती है कि जब आप हमारी वेबसाइट का उपयोग करते हैं, तो हम किस प्रकार की जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं और आपके विधिक अधिकार क्या हैं।
          </p>
        </header>

        {/* Section 1: Data Collection */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#233768]" /> 1. हम क्या जानकारी एकत्र करते हैं? (Information We Collect)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>हम केवल न्यूनतम आवश्यक डेटा ही एकत्र करते हैं:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>स्वैच्छिक रूप से प्रदान की गई जानकारी:</strong> जब आप हमारे संपर्क फ़ॉर्म के माध्यम से संदेश भेजते हैं, समाचार टिप देते हैं, अथवा न्यूज़लेटर की सदस्यता लेते हैं—जैसे कि आपका पूरा नाम, ईमेल पता, वैकल्पिक फ़ोन नंबर और संदेश का विवरण।
              </li>
              <li>
                <strong>तकनीकी एवं स्वचालित डेटा:</strong> वेबसाइट लोड स्पीड, सुरक्षा और प्रदर्शन की निगरानी हेतु तकनीकी लॉग जैसे आईपी पता (IP Address), ब्राउज़र का प्रकार, ऑपरेटिंग सिस्टम, पृष्ठ विज़िट का समय और रेफरिंग URL। यह डेटा अनामित (Anonymized) रूप में संग्रहीत होता है।
              </li>
              <li>
                <strong>कुकीज़ एवं लोकल स्टोरेज:</strong> उपयोगकर्ता की भाषा पसंद, फॉन्ट आकार और कुकी सहमति प्राथमिकताओं को सहेजने हेतु। विस्तृत जानकारी हेतु हमारी{" "}
                <Link href="/cookie-policy" className="text-[#233768] underline font-bold">
                  कुकी नीति
                </Link>{" "}
                देखें।
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Data Usage */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#233768]" /> 2. जानकारी का उपयोग किस प्रयोजन से होता है? (Purpose of Processing)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>एकत्रित जानकारी का उपयोग निम्नलिखित वैध उद्देश्यों हेतु किया जाता है:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>पाठकों द्वारा भेजे गए प्रश्नों, तथ्य सुधार अनुरोधों अथवा समाचार सुझावों का उत्तर देने हेतु।</li>
              <li>दैनिक/साप्ताहिक समाचार बुलेटिन भेजने हेतु (केवल यदि आपने स्पष्ट सहमति दी हो)।</li>
              <li>वेबसाइट के बुनियादी ढांचे को साइबर हमलों, डीडीओएस (DDoS) और स्पैम से सुरक्षित रखने हेतु।</li>
              <li>संवैधानिक एवं विधिक दायित्वों (जैसे सूचना प्रौद्योगिकी नियम 2021) का अनुपालन करने हेतु।</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Data Protection & Security */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#E52532]" /> 3. डेटा सुरक्षा एवं तीसरे पक्ष को अप्रकटीकरण (Security & No Sale of Data)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              <strong>हमारा सख्त वादा:</strong> हम आपके किसी भी व्यक्तिगत डेटा (नाम, ईमेल, फोन नंबर) को किसी विज्ञापनदाता, डेटा ब्रोकर या कॉर्पोरेट तीसरे पक्ष को व्यावसायिक लाभ के लिए न तो बेचते हैं, न ही किराए पर देते हैं।
            </p>
            <p>
              सभी डेटा एन्क्रिप्टेड प्रोटोकॉल (HTTPS/TLS) के माध्यम से स्थानांतरित होता है और उद्योग-मानक सुरक्षा उपायों के तहत सुरक्षित सर्वरों पर रखा जाता है।
            </p>
          </div>
        </section>

        {/* Section 4: Third-Party Links & Embeds */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" /> 4. थर्ड-पार्टी एम्बेड एवं लिंक्स (Embedded Content)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              हमारे लेखों में यूट्यूब वीडियो (YouTube no-cookie embed), आधिकारिक एक्स/ट्विटर पोस्ट अथवा बाहरी संदर्भ दस्तावेज़ों के लिंक हो सकते हैं। इन बाहरी प्लेटफॉर्मों की अपनी स्वतंत्र गोपनीयता नीतियां होती हैं, और हम उनकी प्रथाओं के लिए उत्तरदायी नहीं हैं।
            </p>
          </div>
        </section>

        {/* Section 5: DPDP Act User Rights */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" /> 5. पाठकों के कानूनी अधिकार (Your Rights under DPDP Act 2023)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              भारतीय डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act, 2023) के तहत हमारे प्रत्येक पाठक को निम्नलिखित अधिकार प्राप्त हैं:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong>डेटा सारांश प्राप्त करने का अधिकार (Right to Access):</strong> आप यह जानने का अधिकार रखते हैं कि हमारे पास आपका क्या व्यक्तिगत डेटा है।</li>
              <li><strong>संशोधन व विलोपन का अधिकार (Right to Correction & Erasure):</strong> यदि आपका डेटा गलत या पुराना है, तो आप उसे सही करवाने अथवा पूरी तरह हटवाने (Delete) का अनुरोध कर सकते हैं।</li>
              <li><strong>सहमति वापस लेने का अधिकार (Right to Withdraw Consent):</strong> न्यूज़लेटर या संचार से किसी भी समय Unsubscribe कर सकते हैं।</li>
              <li><strong>शिकायत निवारण का अधिकार (Right of Grievance Redressal):</strong> डेटा गोपनीयता से संबंधित किसी भी शिकायत के समाधान हेतु नामित अधिकारी से संपर्क करने का अधिकार।</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Privacy Officer Contact */}
        <section className="p-6 bg-[#F5F6F8] rounded-2xl border border-gray-200 space-y-3 text-xs text-gray-700">
          <h3 className="text-sm font-bold text-gray-900">
            डेटा गोपनीयता संपर्क सूत्र (Data Privacy Desk)
          </h3>
          <p>
            अपनी गोपनीयता से संबंधित किसी भी प्रश्न, डेटा हटाने के अनुरोध अथवा विधिक स्पष्टीकरण हेतु कृपया हमारी टीम को लिखें:
          </p>
          <div className="space-y-1 text-xs">
            <p>अधिकारी: <strong>श्री आलोक नारायण ({SITE_CONFIG.compliance.grievanceOfficer.title})</strong></p>
            <p>
              गोपनीयता ईमेल:{" "}
              <a
                href={`mailto:${SITE_CONFIG.compliance.grievanceOfficer.email}`}
                className="text-[#233768] underline font-bold"
              >
                {SITE_CONFIG.compliance.grievanceOfficer.email}
              </a>
            </p>
            <p>पता: {SITE_CONFIG.compliance.grievanceOfficer.address}</p>
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
