import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Target, Users, Award, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_AUTHORS } from "@/data/mockAuthors";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export const metadata: Metadata = {
  title: `हमारे बारे में (About Us) - ${SITE_CONFIG.name}`,
  description: `द कन्क्लूसिव इंडियन की पत्रकारिता के मूल्य, मिशन और संपादकीय टीम`,
};

export default function AboutPage() {
  const authorsList = Object.values(MOCK_AUTHORS);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#233768] hover:underline">
          होम
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">हमारे बारे में</span>
      </nav>

      {/* Hero Intro */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#233768]/10 text-[#233768] rounded-full text-xs font-bold uppercase tracking-wider">
          स्वतंत्र • निष्पक्ष • निर्णायक पत्रकारिता
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          {SITE_CONFIG.name} ({SITE_CONFIG.hindiName})
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed font-medium">
          {SITE_CONFIG.tagline} — भारत की विविधता, लोकतंत्र और प्रगति को समर्पित एक प्रामाणिक डिजिटल समाचार मंच।
        </p>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#233768] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">सत्यता और निष्पक्षता</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            हम किसी राजनीतिक दल, कॉर्पोरेट समूह या विचारधारा के प्रभाव से मुक्त रहकर केवल तथ्यों और नागरिकों के हितों पर आधारित समाचार प्रस्तुत करते हैं।
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#E52532] text-white flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">गहन और निर्णायक दृष्टि</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            सनसनीखेज सुर्खियों के बजाय हम घटनाओं की तह तक जाकर उनके सामाजिक और आर्थिक प्रभावों का तथ्यात्मक विश्लेषण प्रदान करते हैं।
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-green-700 text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">डिजिटल आचार संहिता</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            हम भारतीय प्रेस परिषद के दिशा-निर्देशों और सूचना प्रौद्योगिकी नियम 2021 के तहत निर्धारित सभी नैतिक मानकों का अक्षरशः पालन करते हैं।
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-[#F5F6F8] p-8 rounded-2xl border border-gray-200 space-y-4">
        <h2 className="text-2xl font-black text-gray-900">हमारा संपादकीय संकल्प</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            डिजिटल युग में सूचनाओं की प्रचुरता के साथ ही भ्रामक खबरों, अपुष्ट दावों और फेक न्यूज का खतरा भी बढ़ा है। ऐसी स्थिति में &ldquo;द कन्क्लूसिव इंडियन&rdquo; का संकल्प है कि हम अपने पाठकों तक केवल वही जानकारी पहुंचाएं जो कम से कम दो स्वतंत्र स्रोतों से सत्यापित हो चुकी हो।
          </p>
          <p>
            चाहे वह संसद का कानून हो, सर्वोच्च न्यायालय का फैसला, शेयर बाजार की हलचल या ग्रामीण भारत की समस्याएं — हमारी टीम जमीनी हकीकत को बिना किसी लाग-लपेट के सामने रखने के लिए प्रतिबद्ध है।
          </p>
        </div>
      </section>

      {/* Editorial Board */}
      <section id="editorial-board" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-[#233768]" /> संपादकीय नेतृत्व (Editorial Board)
          </h2>
          <p className="text-xs text-gray-500">
            अनुभवी पत्रकारों और विषय विशेषज्ञों की हमारी समर्पित टीम
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorsList.map((author) => (
            <div
              key={author.id}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex flex-col items-center text-center space-y-3"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-[#233768]/20">
                <ImageWithFallback
                  src={author.avatar || ""}
                  alt={author.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900">{author.name}</h4>
                <span className="text-xs font-semibold text-[#E52532] block mt-0.5">
                  {author.role}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
