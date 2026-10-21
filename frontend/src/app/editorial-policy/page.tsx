import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Shield, AlertTriangle, FileText, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `संपादकीय नीति (Editorial Policy) - ${SITE_CONFIG.name}`,
  description: `तथ्य-जांच, सुधार नीति और पत्रकारिता के नैतिक सिद्धांत`,
};

export default function EditorialPolicyPage() {
  return (
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
      <div className="space-y-3 pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          संपादकीय नीति एवं पत्रकारिता आचार संहिता
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          {SITE_CONFIG.name} ({SITE_CONFIG.hindiName}) का संचालन सख्त सत्यता, स्वतंत्रता और निष्पक्षता के सिद्धांतों पर आधारित है।
        </p>
      </div>

      {/* Section 1: Fact-Checking */}
      <section id="fact-checking" className="space-y-4">
        <h2 className="text-2xl font-bold text-[#233768] flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-600" /> 1. तथ्य सत्यापन नीति (Fact-Checking Policy)
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-8">
          <p>
            हम किसी भी समाचार को प्रकाशित करने से पहले आधिकारिक दस्तावेजों, अधिकृत प्रवक्ताओं या प्राथमिक स्रोतों से प्रमाणित करते हैं।
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>किसी भी संवेदनशील राजनीतिक या कानूनी मामले में न्यूनतम दो स्वतंत्र स्रोतों से पुष्टि अनिवार्य है।</li>
            <li>सोशल मीडिया पर वायरल दावों, तस्वीरों या वीडियोज को तब तक सत्य नहीं माना जाता जब तक हमारी फैक्ट-चेक टीम उनकी फोरेंसिक व जियोलोकेशन जांच न कर ले।</li>
            <li>अपुष्ट अफवाहों, अनुमानों या क्लिकबेट शीर्षकों का उपयोग पूरी तरह वर्जित है।</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Corrections Policy */}
      <section id="corrections" className="space-y-4">
        <h2 className="text-2xl font-bold text-[#233768] flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" /> 2. सुधार एवं संशोधन नीति (Corrections Policy)
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-8">
          <p>
            यदि किसी समाचार में अनजाने में कोई तथ्यात्मक त्रुटि होती है, तो हम उसे छिपाने के बजाय तुरंत और पूरी पारदर्शिता के साथ सुधारते हैं।
          </p>
          <p>
            सुधारे गए लेख के शीर्ष या अंत में स्पष्ट रूप से &ldquo;संशोधन नोट (Correction Note)&rdquo; जोड़ा जाता है, जिसमें बताया जाता है कि क्या त्रुटि थी और उसे कब संशोधित किया गया।
          </p>
        </div>
      </section>

      {/* Section 3: AI & Technology Policy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#233768] flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#233768]" /> 3. कृत्रिम बुद्धिमत्ता (AI) नीति
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-8">
          <p>
            हम पत्रकारिता में तकनीक और डेटा टूल्स का उपयोग अनुसंधान और उत्पादकता के लिए करते हैं, लेकिन हमारे सभी समाचारों, रिपोर्टों और विश्लेषणों का संपादन और सत्यापन जीवित मानव संपादकों द्वारा ही किया जाता है।
          </p>
          <p>
            डीपफेक, एआई-जनित भ्रामक छवियों या गैर-सत्यापित स्वचालित लेखन को समाचार के रूप में प्रस्तुत करना पूर्णतः प्रतिबंधित है।
          </p>
        </div>
      </section>

      {/* Section 4: Code of Ethics */}
      <section id="code-of-ethics" className="space-y-4">
        <h2 className="text-2xl font-bold text-[#233768] flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#E52532]" /> 4. डिजिटल मीडिया आचार संहिता (Code of Ethics)
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-8">
          <p>
            हम भारत सरकार के सूचना प्रौद्योगिकी (मध्यवर्ती संस्थाओं के लिए दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 के भाग-III के तहत निर्धारित डिजिटल आचार संहिता का निष्ठापूर्वक पालन करते हैं।
          </p>
          <p>
            हम घृणास्पद भाषण (Hate Speech), साम्प्रदायिक विद्वेष, बाल शोषण, अथवा न्यायालय की अवमानना करने वाली किसी भी सामग्री को प्रकाशित नहीं करते हैं।
          </p>
        </div>
      </section>
    </div>
  );
}
