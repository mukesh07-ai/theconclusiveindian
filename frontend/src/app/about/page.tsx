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

      {/* Flagship Show / Podcast Feature */}
      <section className="bg-gradient-to-br from-[#1C2C4E] to-[#0F172A] text-white p-8 rounded-2xl space-y-6 shadow-md border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[#E52532] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              विशेष पॉडकास्ट शृंखला
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              &ldquo;शून्य से शिखर तक&rdquo; — अमित कुमार के साथ
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              जहाँ सुनना बदलता है सोच • भारत के संघर्ष, कला, साहित्य और समाज के अनसुने अध्याय
            </p>
          </div>
          <a
            href={SITE_CONFIG.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E52532] hover:bg-[#b81d27] text-white text-xs font-bold rounded-lg transition-colors shadow-sm w-fit"
          >
            <span>यूट्यूब पर सब्सक्राइब करें</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              चर्चित एपिसोड
            </span>
            <h3 className="text-xl font-bold leading-snug">
              बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              इस विशेष एपिसोड में लोकगायिका व कवयित्री कविता शर्मा के साथ बुंदेली लोकसंस्कृति, जल संकट की विभीषिका, आल्हा-ऊदल के वीरगाथा काल से लेकर आधुनिक संघर्ष की मर्मस्पर्शी यात्रा का आत्मीय संवाद।
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.social.youtubeFeaturedVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1C2C4E] font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors"
              >
                ▶ वीडियो देखें (YouTube)
              </a>
              <Link
                href="/news/bundelkhand-suro-ki-rasdhar-kavita-sharma-podcast"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white underline underline-offset-4"
              >
                विस्तृत लेख पढ़ें
              </Link>
            </div>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/CfIwAGhPPvc"
              title="बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर - The Conclusive Indian"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Official Social Media Network */}
      <section className="p-8 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900">
            आधिकारिक सोशल मीडिया नेटवर्क
          </h2>
          <p className="text-xs text-gray-500">
            द कन्क्लूसिव इंडियन के आधिकारिक हैंडल्स से जुड़ें और हर विश्वसनीय खबर, साक्षात्कार व वीडियो विश्लेषण तुरंत प्राप्त करें।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={SITE_CONFIG.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-red-500 hover:bg-red-50/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
              YT
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-500 block">यूट्यूब चैनल</span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-red-600 truncate block">
                @theconclusiveindian
              </span>
            </div>
          </a>

          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-pink-500 hover:bg-pink-50/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
              IG
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-500 block">इंस्टाग्राम</span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-pink-600 truncate block">
                @theconclusiveindian
              </span>
            </div>
          </a>

          <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1877F2] text-white flex items-center justify-center font-bold text-sm">
              FB
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-500 block">फेसबुक पेज</span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 truncate block">
                The Conclusive Indian
              </span>
            </div>
          </a>

          <a
            href={SITE_CONFIG.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-100 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm">
              𝕏
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-500 block">एक्स (ट्विटर)</span>
              <span className="text-sm font-bold text-gray-900 group-hover:text-black truncate block">
                @tci2024
              </span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
