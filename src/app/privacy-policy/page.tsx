import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `गोपनीयता नीति (Privacy Policy) - ${SITE_CONFIG.name}`,
  description: `उपयोगकर्ता डेटा सुरक्षा, कुकीज और गोपनीयता नीतियां`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#233768] hover:underline">
          होम
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">गोपनीयता नीति</span>
      </nav>

      <div className="space-y-3 pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          गोपनीयता नीति (Privacy Policy)
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          अंतिम अद्यतन: 20 अक्टूबर 2026 | {SITE_CONFIG.name}
        </p>
      </div>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#233768] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" /> 1. प्रस्तावना और डेटा संप्रभुता
          </h2>
          <p>
            {SITE_CONFIG.name} (&ldquo;हम&rdquo;, &ldquo;हमारा&rdquo;, अथवा &ldquo;पोर्टल&rdquo;) अपने पाठकों और उपयोगकर्ताओं की निजता का पूर्ण सम्मान करता है। हम भारतीय डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act) के अनुरूप सभी डेटा प्रबंधन नियमों का कड़ाई से पालन करते हैं।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#233768] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#233768]" /> 2. हम क्या जानकारी एकत्र करते हैं?
          </h2>
          <p>हम केवल वही जानकारी एकत्र करते हैं जो हमारी सेवाओं को बेहतर बनाने के लिए आवश्यक है:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><strong>स्वैच्छिक जानकारी:</strong> जब आप हमारे दैनिक समाचार बुलेटिन के लिए सदस्यता लेते हैं, संपर्क फ़ॉर्म भरते हैं, अथवा टिप्पणी करते हैं।</li>
            <li><strong>तकनीकी डेटा:</strong> आईपी पता, ब्राउज़र का प्रकार, विज़िट किए गए पृष्ठ और डिवाइस की जानकारी जो अनामित (anonymized) रूप में एकत्रित की जाती है।</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#233768] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#E52532]" /> 3. जानकारी की सुरक्षा
          </h2>
          <p>
            हम आपके किसी भी व्यक्तिगत डेटा को तीसरे पक्ष (थर्ड पार्टी) को व्यावसायिक लाभ के लिए न तो बेचते हैं और न ही किराए पर देते हैं। सभी डेटा एन्क्रिप्टेड सर्वर पर सुरक्षित रखा जाता है।
          </p>
        </section>

        <section id="terms" className="space-y-3">
          <h2 className="text-xl font-bold text-[#233768] flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" /> 4. नियम एवं शर्तें (Terms & Conditions)
          </h2>
          <p>
            इस पोर्टल पर उपलब्ध सभी सामग्री (टेक्स्ट, फोटो, ग्राफिक्स) {SITE_CONFIG.name} की बौद्धिक संपदा है। बिना लिखित पूर्वानुमति के इसका व्यावसायिक पुनरुत्पादन कॉपीराइट अधिनियम के तहत दंडनीय है।
          </p>
        </section>

        <section id="disclaimer" className="space-y-3">
          <h2 className="text-xl font-bold text-[#233768]">
            5. कानूनी अस्वीकरण (Disclaimer)
          </h2>
          <p>
            हम अपने पोर्टल पर सटीक और अद्यतन जानकारी प्रदान करने का हरसंभव प्रयास करते हैं। तथापि, किसी तीसरे पक्ष द्वारा दिए गए बयानों अथवा विज्ञापनों में किए गए दावों के लिए पाठक अपने विवेक का प्रयोग करें।
          </p>
        </section>
      </div>
    </div>
  );
}
