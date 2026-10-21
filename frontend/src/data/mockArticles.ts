import { Article } from "@/types/news";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_AUTHORS } from "./mockAuthors";

const cat = (slug: string) =>
  SITE_CONFIG.categories.find((c) => c.slug === slug) || SITE_CONFIG.categories[0];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-bundelkhand-podcast-kavita-sharma",
    title: "बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर: लोकगायिका कविता शर्मा की संघर्ष और सफलता की अनूठी दास्तान",
    englishTitle: "From the Arid Lands of Bundelkhand to the Pinnacle of Folk Music: Kavita Sharma's Musical Journey",
    slug: "bundelkhand-suro-ki-rasdhar-kavita-sharma-podcast",
    excerpt: "द कन्क्लूसिव इंडियन के विशेष पॉडकास्ट 'शून्य से शिखर तक' में मुख्य संपादक अमित कुमार के साथ बुंदेली लोकगायिका कविता शर्मा की प्रेरक बातचीत। अभावों और सूखे की धरती से निकलकर बुंदेली राई, सोहर और लोकगीतों को वैश्विक मंच दिलाने की पूरी कहानी।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। बुंदेलखंड—एक ऐसा अंचल जिसकी पहचान अक्सर ऐतिहासिक शौर्य, सूखे के संकट और पथरीली धरती के रूप में की जाती रही है। लेकिन इसी धरती के सीने में लोकसंस्कृति और सुरों का एक ऐसा अटूट सागर बहता है, जिसकी मिठास हर सुनने वाले को मंत्रमुग्ध कर देती है। <strong>The Conclusive Indian</strong> के लोकप्रिय और विचारोत्तेजक पॉडकास्ट <em>'शून्य से शिखर तक'</em> के विशेष एपिसोड में वरिष्ठ संपादक <strong>अमित कुमार</strong> ने बुंदेली लोकगायिका <strong>कविता शर्मा</strong> से उनके जीवन के संघर्षों, संगीत की साधना और बुंदेली लोककला को पुनर्जीवित करने के प्रयासों पर दिल छू लेने वाली बातचीत की।
      </p>

      <!-- Featured YouTube Video Embed -->
      <div class="my-8 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#233768]/20 bg-black">
        <div class="relative w-full aspect-video">
          <iframe
            class="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/CfIwAGhPPvc?rel=0"
            title="बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर - The Conclusive Indian"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div class="p-4 bg-gradient-to-r from-[#18274b] to-[#263565] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span class="font-bold text-yellow-300 block text-sm">शून्य से शिखर तक | अमित कुमार के साथ</span>
            <span class="text-gray-300 text-xs">जहाँ सुनना बदलता है सोच — The Conclusive Indian Podcast</span>
          </div>
          <a
            href="https://www.youtube.com/@theconclusiveindian?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E01F26] hover:bg-[#b81722] text-white font-bold rounded-lg transition-colors shrink-0"
          >
            <span>यूट्यूब पर सब्सक्राइब करें</span>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">बचपन, अभाव और सुरों की पहली पहचान</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        कविता शर्मा बताती हैं कि ग्रामीण बुंदेलखंड में किसी लड़की के लिए संगीत को अपना करियर चुनना कभी आसान नहीं था। समाज के ताने, सीमित संसाधन और कला के प्रति रूढ़िवादी सोच के बावजूद उनके भीतर संगीत की लौ कभी मंद नहीं पड़ी। वे कहती हैं—<em>"बुंदेलखंड की धरती भले ही बंजर दिखती हो, लेकिन यहां का लोकगीत, यहां की राई और सोहर में जो मिठास है, वह दुनिया के किसी अन्य संगीत में नहीं मिलती। मैंने अभावों को ही अपनी शक्ति बनाया।"</em>
      </p>

      <div class="my-6 p-5 border-l-4 border-[#E01F26] bg-[#F5F6F8] rounded-r-lg">
        <p class="font-semibold text-gray-900 italic text-lg">
          "संगीत की सबसे बड़ी खासियत यही है कि यह बिना किसी भेद-भाव के लोगों को सीधे भाव और आत्मीयता से आपस में जोड़ देता है।"
        </p>
        <span class="block mt-2 text-sm text-gray-600 font-medium">— कविता शर्मा (पॉडकास्ट में अमित कुमार से बातचीत के दौरान)</span>
      </div>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">बुंदेली राई, सोहर और पारंपरिक धुनों को सहेजने का संकल्प</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        साक्षात्कार के दौरान अमित कुमार ने पारंपरिक लोकगीतों में आ रहे पश्चिमी प्रभाव और फूहड़ता पर सवाल उठाया। इस पर कविता शर्मा ने जोर देकर कहा कि नई पीढ़ी को लोकगीतों के मूल रस और अर्थ से परिचित कराना जरूरी है। उन्होंने विभिन्न अवसरों पर गाए जाने वाले सोहर, बधाई गीत और आल्हा-ऊदल की वीर गाथाओं के संदर्भ साझा किए।
      </p>

      <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>बुंदेली राई का शास्त्रीय स्वरूप:</strong> राई केवल नृत्य नहीं, बल्कि ढोलक और नगड़िया की थाप पर बुंदेली समाज का जीवन-उल्लास है।</li>
        <li><strong>संस्कार गीतों की महत्ता:</strong> सोहर और विवाह गीतों में छिपे पारिवारिक संस्कार और सामाजिक समरसता।</li>
        <li><strong>डिजिटल युग में लोकसंस्कृति:</strong> यूट्यूब और सोशल मीडिया के माध्यम से बुंदेली गीतों को देश-विदेश के लाखों श्रोताओं तक पहुंचाना।</li>
      </ul>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">The Conclusive Indian से जुड़े रहें</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        'द कन्क्लूसिव इंडियन' अपने मंच के जरिए ऐसे ही प्रेरक व्यक्तित्वों, खोजी पत्रकारिता और जनसरोकार की आवाज़ को मजबूती से उठाता रहेगा। इस पूरे वीडियो साक्षात्कार को आप ऊपर दिए गए प्लेयर में देख सकते हैं और हमारे आधिकारिक सोशल मीडिया चैनलों पर फॉलो कर सकते हैं।
      </p>
    `,
    featuredImage: "https://i.ytimg.com/vi/CfIwAGhPPvc/hqdefault.jpg",
    imageAlt: "बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर - कविता शर्मा पॉडकास्ट",
    imageCaption: "द कन्क्लूसिव इंडियन के पॉडकास्ट 'शून्य से शिखर तक' में अमित कुमार के साथ लोकगायिका कविता शर्मा",
    imageCredit: "The Conclusive Indian Media",
    category: cat("entertainment"),
    author: MOCK_AUTHORS.amit_kumar,
    publishedAt: "2026-10-18T10:30:00Z",
    updatedAt: "2026-10-18T11:50:00Z",
    status: "published",
    tags: ["बुंदेलखंड", "कविता_शर्मा", "बुंदेली_लोकगीत", "शून्य_से_शिखर_तक", "अमित_कुमार", "पॉडकास्ट", "The_Conclusive_Indian", "विशेष_साक्षात्कार"],
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    viewCount: 15420,
    readTimeMinutes: 8,
  },
  {
    id: "art-1",
    title: "संसद में डिजिटल डेटा सुरक्षा व AI विनियमन पर नया ऐतिहासिक विधेयक पेश, नागरिकों के अधिकारों को मिलेगी सर्वोच्च प्राथमिकता",
    englishTitle: "New Historic Digital Data Protection & AI Regulation Bill Tabled in Parliament",
    slug: "parliament-digital-data-ai-bill-tabled-2026",
    excerpt: "संसद के चालू सत्र में केंद्रीय इलेक्ट्रॉनिक्स एवं आईटी मंत्रालय ने बहुप्रतीक्षित कृत्रिम बुद्धिमत्ता (AI) नियमन एवं डेटा संप्रभुता विधेयक प्रस्तुत किया। इसमें डीपफेक, एल्गोरिद्मिक पारदर्शिता और व्यक्तिगत निजता के उल्लंघन पर कठोर दंड के कड़े प्रावधान शामिल हैं।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। भारत की डिजिटल संप्रभुता और तकनीकी सुरक्षा के इतिहास में आज का दिन बेहद युगांतरकारी साबित हुआ। केंद्रीय संसद के दोनों सदनों में सरकार ने व्यापक विचार-विमर्श के बाद 'डिजिटल डेटा सुरक्षा व कृत्रिम बुद्धिमत्ता (AI) नियामक विधेयक 2026' पेश किया।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">डीपफेक और भ्रामक सामग्री पर भारी जुर्माना</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        इस नए विधेयक का मुख्य उद्देश्य देश के 90 करोड़ से अधिक इंटरनेट उपयोगकर्ताओं को साइबर धोखाधड़ी, डीपफेक क्लोनिंग और डेटा चोरी से सुरक्षा प्रदान करना है। विधेयक के तहत किसी भी डिजिटल प्लेटफॉर्म को किसी नागरिक का निजी डेटा उसकी स्पष्ट सहमति के बिना व्यावसायिक या एल्गोरिद्मिक प्रशिक्षण के लिए उपयोग करने पर ₹250 करोड़ तक के जुर्माने का प्रावधान किया गया है।
      </p>

      <div class="my-6 p-5 border-l-4 border-[#E52532] bg-[#F5F6F8] rounded-r-lg">
        <p class="font-semibold text-gray-900 italic text-lg">
          "प्रौद्योगिकी का उपयोग मानव कल्याण और पारदर्शिता के लिए होना चाहिए, न कि आम नागरिकों की निजता के अतिक्रमण के लिए। यह कानून भारत को वैश्विक एआई सुरक्षा में मार्गदर्शक बनाएगा।"
        </p>
        <span class="block mt-2 text-sm text-gray-600 font-medium">— केंद्रीय आईटी एवं संचार मंत्री, संसद वक्तव्य</span>
      </div>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">विधेयक की 5 मुख्य विशेषताएं</h2>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li><strong>डेटा संप्रभुता:</strong> भारतीय नागरिकों का संवेदनशील वित्तीय व बायोमेट्रिक डेटा देश की सीमाओं के भीतर ही सुरक्षित रखा जाएगा।</li>
        <li><strong>स्वतंत्र एआई नियामक आयोग:</strong> आर्टिफिशियल इंटेलिजेंस के नैतिक उपयोग, ऑडिट और सुरक्षा मानकों की जांच हेतु एक उच्चस्तरीय स्वतंत्र आयोग का गठन।</li>
        <li><strong>एल्गोरिद्मिक पारदर्शिता:</strong> सोशल मीडिया प्लेटफॉर्म्स को सिफारिश प्रणाली में हेरफेर और पूर्वाग्रह की जांच के लिए वार्षिक ऑडिट रिपोर्ट सार्वजनिक करनी होगी।</li>
        <li><strong>बच्चों की डिजिटल सुरक्षा:</strong> 18 वर्ष से कम आयु के उपयोगकर्ताओं के लिए लक्षित विज्ञापन और आक्रामक ट्रैकिंग पर पूर्ण प्रतिबंध।</li>
        <li><strong>शिकायत निवारण:</strong> डेटा लीक अथवा आपत्तिजनक सामग्री की शिकायत पर 24 घंटे के भीतर अनिवार्य कानूनी कार्रवाई सुनिश्चित की जाएगी।</li>
      </ul>

      <p class="leading-relaxed text-gray-700 mb-4">
        विपक्ष के कई प्रमुख सांसदों ने भी इस विधेयक की रूपरेखा का स्वागत किया है और संसदीय स्थायी समिति के समक्ष सभी तकनीकी हितधारकों और स्टार्टअप संस्थापकों के सुझावों को शामिल करने का आह्वान किया है। उम्मीद है कि आगामी 15 दिनों के भीतर बहस के उपरांत इसे कानून का रूप दिया जाएगा।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "भारतीय संसद भवन का दृश्य",
    imageCaption: "संसद भवन में ऐतिहासिक डिजिटल डेटा सुरक्षा एवं AI विधेयक पर चर्चा का दृश्य",
    imageCredit: "पीटीआई / प्रेस ट्रस्ट ऑफ इंडिया",
    category: cat("politics"),
    author: MOCK_AUTHORS.anjali_singh,
    publishedAt: "2026-10-20T10:30:00Z",
    updatedAt: "2026-10-20T11:45:00Z",
    status: "published",
    tags: ["संसद", "डिजिटल_इंडिया", "AI_विधेयक", "डेटा_सुरक्षा", "कानून"],
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 48920,
    readTimeMinutes: 5,
  },
  {
    id: "art-2",
    title: "भारतीय रिजर्व बैंक की मौद्रिक नीति बैठक: रेपो दर में कोई बदलाव नहीं, चालू वित्त वर्ष में 7.4% GDP वृद्धि का अनुमान",
    englishTitle: "RBI Monetary Policy: Repo Rate Kept Unchanged, 7.4% GDP Growth Projected",
    slug: "rbi-monetary-policy-repo-rate-gdp-growth-2026",
    excerpt: "रिजर्व बैंक की मौद्रिक नीति समिति (MPC) ने आर्थिक स्थिरता को ध्यान में रखते हुए नीतिगत दरों में कोई बदलाव नहीं किया है। खुदरा मुद्रास्फीति में नरमी के साथ भारतीय अर्थव्यवस्था मजबूत गति से आगे बढ़ रही है।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        मुंबई। भारतीय रिजर्व बैंक (RBI) की मौद्रिक नीति समिति ने चालू वित्त वर्ष की अपनी समीक्षा बैठक के नतीजों की घोषणा कर दी है। गवर्नर ने प्रेस वार्ता में बताया कि नीतिगत रेपो दर को बिना किसी बदलाव के स्थिर रखने का सर्वसम्मत निर्णय लिया गया है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">मुद्रास्फीति नियंत्रण में, विकास की रफ्तार कायम</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        आरबीआई गवर्नर के अनुसार, खाद्यान्न उत्पादन में सुधार और वैश्विक आपूर्ति श्रृंखला में सुगमता के चलते उपभोक्ता मूल्य सूचकांक (CPI) आधारित महंगाई दर 4.3% के संतोषजनक दायरे में आ चुकी है। वहीं, घरेलू उपभोग और पूंजीगत व्यय में तेज वृद्धि के चलते जीडीपी वृद्धि दर 7.4% रहने का अनुमान बरकरार रखा गया है।
      </p>

      <div class="my-6 p-5 border-l-4 border-[#233768] bg-[#F5F6F8] rounded-r-lg">
        <p class="font-semibold text-gray-900 italic text-lg">
          "वैश्विक वित्तीय अनिश्चितताओं के बीच भारतीय अर्थव्यवस्था का मैक्रोइकोनॉमिक आधार बेहद मजबूत बना हुआ है। बैंकिंग क्षेत्र की बैलेंस शीट अब तक के सर्वश्रेष्ठ स्तर पर है।"
        </p>
        <span class="block mt-2 text-sm text-gray-600 font-medium">— आरबीआई गवर्नर, प्रेस वक्तव्य</span>
      </div>

      <p class="leading-relaxed text-gray-700 mb-4">
        इस घोषणा के बाद घरेलू शेयर बाजारों में जबरदस्त तेजी देखी गई। सेंसेक्स में 450 अंकों से अधिक का उछाल आया, जबकि निफ्टी नए रिकॉर्ड स्तर पर बंद हुआ। बैंकिंग और ऑटोमोबाइल सेक्टर के शेयरों में निवेशकों की भारी खरीदारी रही।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "भारतीय रिजर्व बैंक और वित्तीय बाजार का प्रतीक",
    imageCaption: "आरबीआई की मौद्रिक नीति समीक्षा के बाद वित्तीय बाज़ारों में दिखा उत्साह",
    imageCredit: "रॉयटर्स",
    category: cat("business"),
    author: MOCK_AUTHORS.vivek_mishra,
    publishedAt: "2026-10-20T09:15:00Z",
    status: "published",
    tags: ["आरबीआई", "रेपो_रेट", "जीडीपी", "अर्थव्यवस्था", "शेयर_बाजार"],
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 34100,
    readTimeMinutes: 4,
  },
  {
    id: "art-3",
    title: "इसरो का शुक्रयान मिशन अंतिम चरण में: श्रीहरिकोटा से अगले महीने होगा ऐतिहासिक प्रक्षेपण, जानिए क्या है खास",
    englishTitle: "ISRO Shukrayaan Mission in Final Stages: Historical Launch Next Month from Sriharikota",
    slug: "isro-shukrayaan-mission-launch-preparation-sriharikota",
    excerpt: "चंद्रयान और गगनयान की सफलता के बाद भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) अब शुक्र ग्रह के रहस्यों को उजागर करने के लिए तैयार है। अत्याधुनिक रडार और वायुमंडलीय सेंसर से लैस है यह स्वदेशी मिशन।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        बेंगलुरु। भारतीय अंतरिक्ष अनुसंधान संगठन (इसरो) ने अपने अत्यंत महत्वाकांक्षी मिशन 'शुक्रयान-1' (Shukrayaan) की तैयारियों को अंतिम रूप दे दिया है। सतीश धवन अंतरिक्ष केंद्र, श्रीहरिकोटा के प्रक्षेपण स्थल पर रॉकेट और पेलोड्स का एकीकरण सफलतापूर्वक पूरा कर लिया गया है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">शुक्र के घने बादलों और सल्फ्यूरिक एसिड के पीछे का सच</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        वैज्ञानिकों के अनुसार, शुक्र हमारे सौरमंडल का सबसे गर्म ग्रह है जिसका तापमान 460 डिग्री सेल्सियस से ऊपर रहता है। इसरो का यह ऑर्बिटर शुक्र के घने कार्बन डाइऑक्साइड और सल्फ्यूरिक एसिड के बादलों को भेदने के लिए विशेष 'सिंथेटिक एपर्चर रडार' (SAR) का उपयोग करेगा, जिससे ग्रह की भूगर्भीय सतह का 3D मानचित्र तैयार किया जा सके।
      </p>

      <p class="leading-relaxed text-gray-700 mb-4">
        इसरो प्रमुख ने कहा कि यह मिशन भारत और वैश्विक वैज्ञानिक बिरादरी के लिए ग्रह विज्ञान और जलवायु परिवर्तन की समझ में क्रांतिकारी बदलाव लाएगा। मिशन पर कई अंतरराष्ट्रीय अनुसंधान संस्थानों के पेलोड भी साथ भेजे जा रहे हैं।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "अंतरिक्ष रॉकेट प्रक्षेपण का विहंगम दृश्य",
    imageCaption: "श्रीहरिकोटा अंतरिक्ष केंद्र पर प्रक्षेपण के लिए तैयार इसरो का भारी रॉकेट",
    imageCredit: "इसरो मीडिया सेल",
    category: cat("tech"),
    author: MOCK_AUTHORS.amit_prakash,
    publishedAt: "2026-10-20T08:00:00Z",
    status: "published",
    tags: ["इसरो", "शुक्रयान", "अंतरिक्ष", "विज्ञान", "भारत"],
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    viewCount: 29500,
    readTimeMinutes: 4,
  },
  {
    id: "art-4",
    title: "भारत बनाम ऑस्ट्रेलिया टी20 सीरीज: निर्णायक मुकाबले में टीम इंडिया की 6 विकेट से धमाकेदार जीत, सीरीज पर जमाया कब्जा",
    englishTitle: "India vs Australia T20 Series: Team India clinches series with a 6-wicket win",
    slug: "india-vs-australia-t20-final-match-victory-highlights",
    excerpt: "मेलबर्न क्रिकेट ग्राउंड पर खेले गए कांटे की टक्कर वाले अंतिम टी20 मैच में भारतीय बल्लेबाजों ने शानदार साझेदारी के दम पर 198 रनों का विशाल लक्ष्य 3 गेंद शेष रहते हासिल कर लिया।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        मेलबर्न। रोमांचक मोड़ पर पहुंचे टी20 अंतरराष्ट्रीय श्रृंखला के पांचवें और निर्णायक मुकाबले में भारतीय क्रिकेट टीम ने अद्भुत जुझारूपन दिखाते हुए मेजबान ऑस्ट्रेलिया को 6 विकेट से पराजित कर दिया। इसके साथ ही भारत ने यह प्रतिष्ठित श्रृंखला 3-2 से अपने नाम कर ली।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">कंगारू गेंदबाजों पर भारी पड़े युवा भारतीय बल्लेबाज</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        टॉस जीतकर पहले बल्लेबाजी करने उतरी ऑस्ट्रेलियाई टीम ने निर्धारित 20 ओवरों में 4 विकेट खोकर 197 रनों का चुनौतीपूर्ण स्कोर खड़ा किया था। जवाब में भारत की शुरुआत लड़खड़ाई, लेकिन मध्यक्रम में उपकप्तान और युवा ऑलराउंडर ने 48 गेंदों में 86 रनों की नाबाद तूफानी पारी खेलकर मैच का पासा पूरी तरह पलट दिया।
      </p>

      <p class="leading-relaxed text-gray-700 mb-4">
        मैच के बाद कप्तान ने कहा कि ऑस्ट्रेलिया की उछाल भरी पिचों पर युवा खिलाड़ियों का ऐसा निर्भीक प्रदर्शन आगामी आईसीसी टी20 विश्व कप की तैयारियों के लिहाज से बेहद उत्साहवर्धक है।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "क्रिकेट स्टेडियम में जश्न मनाते भारतीय खिलाड़ी",
    imageCaption: "सीरीज जीतने के बाद ट्रॉफी के साथ भारतीय टीम का विजय उत्सव",
    imageCredit: "गेटी इमेजेस / आईसीसी",
    category: cat("sports"),
    author: MOCK_AUTHORS.neha_verma,
    publishedAt: "2026-10-20T07:20:00Z",
    status: "published",
    tags: ["क्रिकेट", "टीम_इंडिया", "ऑस्ट्रेलिया", "टी20_सीरीज", "खेल"],
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    viewCount: 52100,
    readTimeMinutes: 3,
  },
  {
    id: "art-5",
    title: "पीएम किसान सम्मान निधि की 19वीं किस्त जारी, देश के 11 करोड़ से अधिक किसानों के बैंक खातों में पहुंचे ₹22,000 करोड़",
    englishTitle: "PM Kisan 19th Installment Released: 22000 Crores Transferred Directly to Farmers",
    slug: "pm-kisan-19th-installment-released-farmers-account",
    excerpt: "प्रधानमंत्री ने वीडियो कॉन्फ्रेंसिंग के माध्यम से किसानों से संवाद कर डायरेक्ट बेनिफिट ट्रांसफर (DBT) के जरिए सहायता राशि जारी की। प्राकृतिक खेती और सौर ऊर्जा पंप अपनाने पर भी विशेष प्रोत्साहन की घोषणा।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        वाराणसी। देश के अन्नदाताओं की आर्थिक सुरक्षा को संबल प्रदान करने के उद्देश्य से प्रधानमंत्री किसान सम्मान निधि योजना की 19वीं किस्त आज जारी कर दी गई। प्रधानमंत्री ने एक क्लिक के माध्यम से देश भर के पात्र 11 करोड़ से अधिक किसान परिवारों के खातों में कुल ₹22,000 करोड़ से अधिक की राशि सीधे स्थानांतरित की।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">प्राकृतिक खेती और सिंचाई के लिए अतिरिक्त सब्सिडी</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        इस अवसर पर आयोजित राष्ट्रीय किसान सम्मेलन को संबोधित करते हुए प्रधानमंत्री ने कहा कि सरकार कृषि लागत को कम करने और किसानों की आमदनी दोगुनी करने के लिए आधुनिक तकनीकों, ड्रोन स्प्रे और सौर ऊर्जा पंपों (कुसुम योजना) का तेजी से विस्तार कर रही है।
      </p>

      <p class="leading-relaxed text-gray-700 mb-4">
        केंद्रीय कृषि मंत्रालय ने बताया कि आधार आधारित प्रत्यक्ष बैंक अंतरण (डीबीटी) की वजह से योजना में 100% पारदर्शिता सुनिश्चित हुई है और बिचौलियों की भूमिका पूरी तरह समाप्त हो चुकी है।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "भारतीय खेत में लहलहाती फसल और किसान",
    imageCaption: "कृषि सम्मान निधि योजना से देश के करोड़ों छोटे और सीमांत किसानों को मिली आर्थिक राहत",
    imageCredit: "पीआईबी / भारत सरकार",
    category: cat("agriculture"),
    author: MOCK_AUTHORS.ramgopal_yadav,
    publishedAt: "2026-10-20T06:40:00Z",
    status: "published",
    tags: ["पीएम_किसान", "कृषि", "किसान_कल्याण", "डीबीटी", "ग्रामीण_भारत"],
    isBreaking: false,
    isFeatured: true,
    isTrending: false,
    viewCount: 22400,
    readTimeMinutes: 4,
  },
  {
    id: "art-6",
    title: "दिल्ली-एनसीआर में वायु गुणवत्ता सुधार के लिए आपातकालीन एक्शन प्लान: इलेक्ट्रिक बसों का बेड़ा बढ़ा, निर्माण कार्यों पर सख्त निगरानी",
    englishTitle: "Emergency Action Plan for Delhi NCR Air Quality Improvement Implemented",
    slug: "delhi-air-quality-emergency-action-plan-measures",
    excerpt: "सर्दियों के आगमन से पहले वायु प्रदूषण की रोकथाम के लिए वायु गुणवत्ता प्रबंधन आयोग (CAQM) ने ग्रैप-2 के प्रावधान लागू किए हैं। प्रदूषण फैलाने वाले वाहनों पर भारी चालान का निर्देश।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। राष्ट्रीय राजधानी क्षेत्र (दिल्ली-एनसीआर) में सर्दियों की शुरुआत के साथ हवा की गुणवत्ता के स्तर में आ रही गिरावट को रोकने के लिए पर्यावरण मंत्रालय और वायु गुणवत्ता प्रबंधन आयोग ने सख्त कदम उठाने शुरू कर दिए हैं।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">सार्वजनिक परिवहन को बढ़ावा, मेट्रो फेरे बढ़े</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        सड़कों पर निजी वाहनों के दबाव को कम करने के लिए दिल्ली मेट्रो ने दैनिक फेरों में 40 अतिरिक्त फेरे जोड़ने का निर्णय लिया है। इसके साथ ही डीटीसी के बेड़े में 500 नई जीरो-एमिशन इलेक्ट्रिक बसें शामिल की गई हैं। खुले में कचरा जलाने और निर्माण स्थलों पर धूल रोधी नियमों के उल्लंघन पर ₹5 लाख तक के जुर्माने का प्रावधान किया गया है।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "दिल्ली का इंडिया गेट और वातावरण",
    imageCaption: "दिल्ली-एनसीआर में धुंध की रोकथाम के लिए प्रशासन ने शुरू किया विशेष सफाई और स्प्रिंकलर अभियान",
    imageCredit: "पीटीआई",
    category: cat("national"),
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-20T05:10:00Z",
    status: "published",
    tags: ["दिल्ली", "प्रदूषण", "पर्यावरण", "एनसीआर", "मेट्रो"],
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    viewCount: 18900,
    readTimeMinutes: 3,
  },
  {
    id: "art-7",
    title: "उत्तर प्रदेश में 12 नए औद्योगिक गलियारों और गंगा एक्सप्रेसवे के दूसरे चरण को कैबिनेट की मंजूरी, लाखों युवाओं को मिलेगा रोजगार",
    englishTitle: "UP Cabinet Approves 12 New Industrial Corridors & Ganga Expressway Phase 2",
    slug: "up-infrastructure-expressway-industrial-corridor-boost",
    excerpt: "मुख्यमंत्री की अध्यक्षता में हुई उच्चस्तरीय कैबिनेट बैठक में ₹45,000 करोड़ के बुनियादी ढांचा प्रोजेक्ट्स को हरी झंडी दी गई। बुंदेलखंड और पूर्वांचल में उद्योगों को दी जाएंगी विशेष रियायतें।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        लखनऊ। उत्तर प्रदेश को 1 ट्रिलियन डॉलर की अर्थव्यवस्था बनाने के संकल्प को गति देते हुए राज्य मंत्रिमंडल ने बुनियादी ढांचे और उद्योग क्षेत्र में ऐतिहासिक निर्णयों पर मुहर लगा दी है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">एक्सप्रेसवे नेटवर्क से जुड़ेंगे ग्रामीण व पिछड़े जिले</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        गंगा एक्सप्रेसवे के विस्तार और 12 प्रमुख औद्योगिक क्लस्टरों की स्थापना से विनिर्माण, वस्त्र, इलेक्ट्रॉनिक्स और ऑटोमोटिव उद्योग को जबरदस्त बढ़ावा मिलेगा। सरकार का अनुमान है कि इन परियोजनाओं के धरातल पर उतरने से अगले तीन वर्षों में राज्य में 5 लाख से अधिक प्रत्यक्ष एवं अप्रत्यक्ष रोजगार के नए अवसर सृजित होंगे।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "आधुनिक भारतीय एक्सप्रेसवे और परिवहन संरचना",
    imageCaption: "उत्तर प्रदेश में विश्वस्तरीय एक्सप्रेसवे नेटवर्क से जुड़े औद्योगिक गलियारे",
    imageCredit: "यूपी सूचना विभाग",
    category: cat("state"),
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-20T04:30:00Z",
    status: "published",
    tags: ["उत्तर_प्रदेश", "एक्सप्रेसवे", "उद्योग", "विकास", "रोजगार"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 15300,
    readTimeMinutes: 4,
  },
  {
    id: "art-8",
    title: "वैश्विक जलवायु शिखर सम्मेलन: भारत ने 2030 तक 500 गीगावाट गैर-जीवाश्म ऊर्जा क्षमता हासिल करने का दोहराया संकल्प",
    englishTitle: "Global Climate Summit: India Reaffirms Commitment to 500 GW Non-Fossil Energy by 2030",
    slug: "global-climate-summit-india-renewable-energy-target",
    excerpt: "संयुक्त राष्ट्र जलवायु सम्मेलन में भारत के पर्यावरण मंत्री ने कहा कि भारत पेरिस समझौते के लक्ष्यों को समय से पूर्व हासिल करने वाला दुनिया का एकमात्र प्रमुख जी-20 देश बना है।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        जिनेवा। वैश्विक जलवायु शिखर सम्मेलन (COP) के उच्चस्तरीय सत्र में भारत के प्रतिनिधिमंडल ने सौर, पवन और हरित हाइड्रोजन क्षेत्र में देश की अभूतपूर्व प्रगति का ब्योरा विश्व समुदाय के सामने प्रस्तुत किया।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">ग्लोबल साउथ के लिए जलवायु वित्त की पुरजोर वकालत</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        भारतीय मंत्री ने विकसित देशों पर दबाव बनाते हुए कहा कि विकासशील देशों को रियायती दरों पर तकनीक और पर्याप्त जलवायु कोष उपलब्ध कराना विकसित देशों का ऐतिहासिक दायित्व है। भारत ने मिशन लाइफ (LiFE - पर्यावरण अनुकूल जीवनशैली) के माध्यम से व्यक्तिगत जिम्मेदारी का वैश्विक संदेश भी दिया।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "विशाल सौर ऊर्जा संयंत्र और पवन चक्कियां",
    imageCaption: "भारत के विशाल सोलर पार्कों ने हरित ऊर्जा उत्पादन में बनाए नए वैश्विक कीर्तिमान",
    imageCredit: "यूएनएफसीसीसी मीडिया",
    category: cat("world"),
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-19T22:00:00Z",
    status: "published",
    tags: ["जलवायु_शिखर_सम्मेलन", "हरित_ऊर्जा", "सौर_ऊर्जा", "ग्लोबल_साउथ", "विदेश"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 12400,
    readTimeMinutes: 4,
  },
  {
    id: "art-9",
    title: "बॉलीवुड की आगामी पौराणिक महागाथा 'महाभारत - चक्रव्यूह' का भव्य टीज़र जारी, भारतीय वीएफएक्स ने रचा इतिहास",
    englishTitle: "Bollywood Epic Teaser Released: Indian VFX Sets New Benchmark",
    slug: "bollywood-upcoming-epic-release-box-office-preview",
    excerpt: "राष्ट्रीय पुरस्कार विजेता निर्देशक की 500 करोड़ के बजट वाली फिल्म का टीज़र यूट्यूब पर आते ही ट्रेंडिंग में शीर्ष पर पहुंचा। हॉलीवुड के विशेषज्ञों के साथ मिलकर तैयार किए गए हैं विजुअल इफेक्ट्स।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        मुंबई। भारतीय सिनेमाई इतिहास के सबसे भव्य प्रोजेक्ट्स में शुमार 'महाभारत - चक्रव्यूह' का पहला आधिकारिक टीज़र आज सुबह रिलीज कर दिया गया। महज 4 घंटों के भीतर इस टीज़र ने सभी सोशल मीडिया प्लेटफॉर्म्स पर 3 करोड़ से अधिक व्यूज का रिकॉर्ड बना लिया।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">अंतरराष्ट्रीय स्तर का विजुअल जादू</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        फिल्म समीक्षकों के अनुसार, भारतीय महाकाव्य की इस प्रस्तुति में प्रकाश, ध्वनि और डिजिटल वीएफएक्स का ऐसा अनूठा संगम देखने को मिला है जो भारतीय दर्शकों ने पहले कभी नहीं देखा। फिल्म को 5 भारतीय भाषाओं सहित अंग्रेजी और स्पेनिश में भी विश्वव्यापी स्तर पर रिलीज किया जाएगा।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "सिनेमा हॉल और प्रोजेक्टर की रोशनी",
    imageCaption: "सिनेमाघरों में दर्शकों को आकर्षित करने के लिए तैयार भारतीय भव्य महागाथा",
    imageCredit: "प्रोडक्शन हाउस पीआर",
    category: cat("entertainment"),
    author: MOCK_AUTHORS.pooja_chaudhary,
    publishedAt: "2026-10-19T18:30:00Z",
    status: "published",
    tags: ["बॉलीवुड", "सिनेमा", "मनोरंजन", "टीज़र", "महाभारत"],
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    viewCount: 41200,
    readTimeMinutes: 3,
  },
  {
    id: "art-10",
    title: "UPSC सिविल सेवा परीक्षा प्रणाली में बड़े सुधारों की तैयारी: आधुनिक पाठ्यक्रम में डेटा विश्लेषण और गवर्नेंस केस स्टडीज पर जोर",
    englishTitle: "Major Reforms in UPSC Civil Services Exam Structure Planned",
    slug: "upsc-civil-services-exam-pattern-modern-syllabus-reforms",
    excerpt: "संघ लोक सेवा आयोग द्वारा गठित उच्चस्तरीय समिति ने प्रशासनिक अधिकारियों के चयन में व्यावहारिक नीति-निर्माण और डिजिटल गवर्नेंस की दक्षता को परखने की सिफारिश की है।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। भारत की सबसे प्रतिष्ठित सिविल सेवा परीक्षा (UPSC CSE) के पाठ्यक्रम और चयन प्रक्रिया को 21वीं सदी के भारत की आवश्यकताओं के अनुरूप ढालने के लिए बड़े नीतिगत बदलावों की रूपरेखा तैयार की गई है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">रटने की प्रवृत्ति पर रोक, समस्या निवारण पर फोकस</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        विशेषज्ञ समिति के अनुसार, भावी आईएएस, आईपीएस और आईएफएस अधिकारियों को जमीनी स्तर पर डेटा का उपयोग, आपदा प्रबंधन और सार्वजनिक सेवा वितरण की व्यावहारिक चुनौतियों से निपटने में सक्षम होना आवश्यक है। नए प्रारूप में साक्षात्कार (इंटरव्यू) और मुख्य परीक्षा के प्रश्नों को केस-स्टडी आधारित बनाया जाएगा।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "लाइब्रेरी में अध्ययन करते छात्र और पुस्तकें",
    imageCaption: "सिविल सेवा परीक्षा की तैयारी में जुटे लाखों अभ्यर्थियों के लिए महत्वपूर्ण दिशानिर्देश",
    imageCredit: "यूआईडीआई / शिक्षा रिपोर्ट",
    category: cat("education"),
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-19T15:00:00Z",
    status: "published",
    tags: ["UPSC", "शिक्षा", "सिविल_सेवा", "करियर", "परीक्षा"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 19800,
    readTimeMinutes: 4,
  },
  {
    id: "art-11",
    title: "भारतीय रेलवे में 1 लाख से अधिक पदों पर बंपर भर्ती अधिसूचना जारी: असिस्टेंट लोको पायलट, तकनीशियन और जूनियर इंजीनियर के पद",
    englishTitle: "Indian Railways Announces Mega Recruitment for Over 1 Lakh Posts",
    slug: "railways-mega-recruitment-drive-one-lakh-jobs",
    excerpt: "रेलवे भर्ती बोर्ड (RRB) ने देशभर के विभिन्न जोनों में रिक्त पड़े संरक्षा और तकनीकी संवर्ग के पदों के लिए ऑनलाइन आवेदन आमंत्रित किए हैं। कंप्यूटर आधारित परीक्षा दिसंबर से शुरू होगी।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। देश के बेरोजगार युवाओं और तकनीकी स्नातकों के लिए रेलवे भर्ती बोर्ड ने खुशियों की सौगात दी है। रेलवे ने विभिन्न तकनीकी श्रेणियों और परिचालन पदों के लिए संयुक्त भर्ती अधिसूचना जारी की है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">योग्यता, आयु सीमा और आवेदन प्रक्रिया</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        अधिसूचना के अनुसार, न्यूनतम 10वीं उत्तीर्ण और आईटीआई धारक से लेकर इंजीनियरिंग डिप्लोमा और डिग्रीधारी अभ्यर्थी इन पदों के लिए आवेदन कर सकेंगे। परीक्षा पूर्णतः पारदर्शी और बहुभाषी कंप्यूटर आधारित टेस्ट (CBT) के माध्यम से आयोजित की जाएगी।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1532105956626-9569c03602f6?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "भारतीय रेलवे ट्रैक और आधुनिक वंदे भारत ट्रेन",
    imageCaption: "भारतीय रेलवे में नई भर्ती से परिचालन और यात्री सुरक्षा को मिलेगा बड़ा बल",
    imageCredit: "उत्तर रेलवे पीआरओ",
    category: cat("jobs"),
    author: MOCK_AUTHORS.vivek_mishra,
    publishedAt: "2026-10-19T13:40:00Z",
    status: "published",
    tags: ["रेलवे_भर्ती", "सरकारी_नौकरी", "रोजगार", "आरआरबी", "युवा"],
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    viewCount: 38700,
    readTimeMinutes: 3,
  },
  {
    id: "art-12",
    title: "आयुर्वेद और आधुनिक क्लिनिकल रिसर्च में नई उपलब्धि: लाइफस्टाइल बीमारियों की रोकथाम पर एम्स और आयुष मंत्रालय का बड़ा अध्ययन",
    englishTitle: "Ayurveda & Modern Clinical Research: AIIMS & Ministry of AYUSH Study on Lifestyle Diseases",
    slug: "ayurveda-modern-clinical-research-breakthrough-immunity",
    excerpt: "अखिल भारतीय आयुर्विज्ञान संस्थान (AIIMS) के चिकित्सकों ने पारंपरिक भारतीय जड़ी-बूटियों के अर्क का मेटाबॉलिक सिंड्रोम और डायबिटीज पर सकारात्मक प्रभाव प्रमाणित किया है।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। भारतीय पारंपरिक चिकित्सा पद्धति आयुर्वेद को आधुनिक विज्ञान की कसौटी पर कसते हुए एम्स और केंद्रीय आयुष अनुसंधान परिषद ने एक व्यापक क्लिनिकल ट्रायल पूरा किया है। इस शोध के परिणाम अंतरराष्ट्रीय मेडिकल जर्नल में प्रकाशित हुए हैं।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">इंसुलिन प्रतिरोध और हृदय स्वास्थ्य में सुधार</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        अध्ययन में पाया गया कि अश्वगंधा, गिलोय और विजयसार के मानकीकृत फार्मूलेशन के नियमित सेवन से प्रीडायबिटिक रोगियों में ब्लड शुगर नियंत्रण में 32% का सुधार देखा गया। डॉक्टरों ने स्पष्ट किया कि पारंपरिक नुस्खों को प्रमाणित वैज्ञानिक पद्धति से अपनाने पर दीर्घकालिक दुष्प्रभावों से बचा जा सकता है।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "योग, ध्यान और प्राकृतिक स्वास्थ्य का प्रतीक",
    imageCaption: "पारंपरिक स्वास्थ्य पद्धतियों और आधुनिक विज्ञान के समन्वय से मिल रहे सकारात्मक परिणाम",
    imageCredit: "आयुष मंत्रालय",
    category: cat("health"),
    author: MOCK_AUTHORS.pooja_chaudhary,
    publishedAt: "2026-10-19T11:15:00Z",
    status: "published",
    tags: ["आयुर्वेद", "स्वास्थ्य", "एम्स", "डायबिटीज", "फिटनेस"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 14200,
    readTimeMinutes: 4,
  },
  {
    id: "art-13",
    title: "भारतीय स्टार्टअप इकोसिस्टम में निवेश का नया रिकॉर्ड: फिनटेक, डीपटेक और क्लीनटेक कंपनियों ने जुटाए $18 बिलियन",
    englishTitle: "Indian Startup Ecosystem Sets New Funding Record in 2026",
    slug: "indian-startup-ecosystem-funding-record-high-2026",
    excerpt: "वैश्विक निवेशकों ने भारतीय प्रौद्योगिकी और विनिर्माण नवाचार पर भरोसा जताया है। चालू वर्ष में 14 नए स्टार्टअप्स ने हासिल किया यूनिकॉर्न का प्रतिष्ठित दर्जा।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        बेंगलुरु। वैश्विक मंदी की आशंकाओं को दरकिनार करते हुए भारतीय स्टार्टअप पारिस्थितिकी तंत्र ने निवेश के मोर्चे पर धमाकेदार वापसी की है। वेंचर कैपिटल और प्राइवेट इक्विटी फंड्स ने भारतीय नवाचार में भारी पूंजी निवेश किया है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">टियर-2 और टियर-3 शहरों से निकले नए उद्यमी</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        विशेष बात यह है कि इस बार निवेश केवल मेट्रो शहरों तक सीमित नहीं रहा, बल्कि जयपुर, इंदौर, कोयंबटूर और भुवनेश्वर जैसे शहरों के स्टार्टअप्स ने भी विदेशी निवेशकों को आकर्षित किया। विशेष रूप से सेमीकंडक्टर डिजाइन और इलेक्ट्रिक व्हीकल बैटरी स्वैपिंग स्टार्टअप्स में सबसे अधिक सौदे हुए।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "स्टार्टअप टीम और ऑफिस कार्य संस्कृति",
    imageCaption: "भारतीय स्टार्टअप्स दुनिया भर में नवाचार और रोजगार सृजन की नई मिसाल कायम कर रहे हैं",
    imageCredit: "इन्वेस्ट इंडिया",
    category: cat("business"),
    author: MOCK_AUTHORS.vivek_mishra,
    publishedAt: "2026-10-19T09:00:00Z",
    status: "published",
    tags: ["स्टार्टअप", "यूनिकॉर्न", "निवेश", "फिनटेक", "व्यापार"],
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    viewCount: 16800,
    readTimeMinutes: 3,
  },
  {
    id: "art-14",
    title: "बेंगलुरु में भारत के पहले उन्नत सेमीकंडक्टर फैब्रिकेशन संयंत्र का उद्घाटन: आत्मनिर्भर भारत की दिशा में ऐतिहासिक कदम",
    englishTitle: "India's First Advanced Semiconductor Fab Inaugurated in Bengaluru",
    slug: "bengaluru-semiconductor-fabrication-plant-inauguration",
    excerpt: "₹22,000 करोड़ की लागत से स्थापित इस संयंत्र में ऑटोमोबाइल और स्मार्टफोन के लिए माइक्रोचिप्स का घरेलू स्तर पर उत्पादन शुरू होगा। आयात निर्भरता में आएगी भारी कमी।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        बेंगलुरु। भारत ने चिप निर्माण के वैश्विक मानचित्र पर अपना पहला ठोस कदम रख दिया है। कर्नाटक के इलेक्ट्रॉनिक्स सिटी में देश के पहले अत्याधुनिक सेमीकंडक्टर फैब्रिकेशन प्लांट का विधिवत शुभारंभ किया गया।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">वैश्विक आपूर्ति श्रृंखला में भारत का कद बढ़ा</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        संयंत्र की प्रारंभिक उत्पादन क्षमता 40,000 वेफर्स प्रति माह होगी, जो 28-नैनोमीटर और 40-नैनोमीटर नोड्स पर आधारित चिप्स तैयार करेगी। यह चिप्स ऑटोमोटिव, रक्षा, रेलवे और दूरसंचार उपकरणों में प्रत्यक्ष रूप से उपयोग किए जाएंगे।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "माइक्रोचिप और सर्किट बोर्ड का क्लोजअप",
    imageCaption: "भारत में स्वदेशी चिप निर्माण से इलेक्ट्रॉनिक विनिर्माण क्रांति को नई ऊर्जा मिली",
    imageCredit: "इंडिया सेमीकंडक्टर मिशन",
    category: cat("tech"),
    author: MOCK_AUTHORS.amit_prakash,
    publishedAt: "2026-10-18T16:20:00Z",
    status: "published",
    tags: ["सेमीकंडक्टर", "टेक्नोलॉजी", "चिप_मेकिंग", "मेक_इन_इंडिया", "कर्नाटक"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 21300,
    readTimeMinutes: 4,
  },
  {
    id: "art-15",
    title: "बिहार के मखाना और शाही लीची का विदेशों में जलवा: जीआई टैग उत्पादों का निर्यात $200 मिलियन के पार पहुंचा",
    englishTitle: "Bihar's Makhana & Shahi Litchi Exports Cross $200 Million Globally",
    slug: "bihar-agri-exports-makhana-litchi-global-footprint",
    excerpt: "दरभंगा और मुजफ्फरपुर के किसानों के उत्पाद अब अमेरिका, यूरोप और खाड़ी देशों के सुपरमार्केट्स की पहली पसंद बने हैं। एपीडा (APEDA) ने तैयार की विशेष कोल्ड चेन।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        पटना। बिहार के मिथिलांचल का सुपरफूड 'मखाना' और मुजफ्फरपुर की प्रसिद्ध 'शाही लीची' ने वैश्विक बाजारों में अपनी मजबूत धाक जमा ली है। चालू कृषि निर्यात सत्र में बिहार के कृषि उत्पादों का कुल निर्यात 200 मिलियन अमेरिकी डॉलर के सर्वकालिक उच्च स्तर पर पहुंच गया।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">किसानों की आय में तीन गुना वृद्धि</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        मखाना उत्पादक संघ के प्रतिनिधियों ने बताया कि प्रोसेसिंग यूनिट्स की स्थापना और एयर कार्गो कनेक्टिविटी मिलने से किसानों को अपनी फसल का उचित अंतरराष्ट्रीय मूल्य मिल रहा है। जैविक खेती के प्रमाणीकरण ने यूरोपीय खरीदारों का भरोसा जीता है।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "ताजे फल और कृषि उत्पाद की टोकरी",
    imageCaption: "बिहार के जीआई टैग मखाना और लीची को अंतरराष्ट्रीय बाज़ार में मिला प्रीमियम मूल्य",
    imageCredit: "एपीडा प्रेस रिलीज",
    category: cat("state"),
    author: MOCK_AUTHORS.ramgopal_yadav,
    publishedAt: "2026-10-18T14:10:00Z",
    status: "published",
    tags: ["बिहार", "मखाना", "शाही_लीची", "कृषि_निर्यात", "किसान"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 11900,
    readTimeMinutes: 3,
  },
  {
    id: "art-16",
    title: "मध्य पूर्व और यूरोप आर्थिक गलियारा (IMEC): बंदरगाह कनेक्टिविटी और रेल नेटवर्क के काम में आई भारी तेजी",
    englishTitle: "India-Middle East-Europe Economic Corridor (IMEC) Work Gains Momentum",
    slug: "india-middle-east-europe-economic-corridor-progress",
    excerpt: "गुजरात के कांडला और मुंबई बंदरगाह से लेकर यूएई और सऊदी अरब होते हुए यूरोप तक व्यापार को आसान बनाने वाले ऐतिहासिक कॉरिडोर पर हितधारक देशों की उच्चस्तरीय बैठक संपन्न।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। भारत-मध्य पूर्व-यूरोप आर्थिक गलियारा (IMEC) परियोजना के क्रियान्वयन को लेकर सदस्य देशों के वरिष्ठ मंत्रियों की महत्वपूर्ण बैठक संपन्न हुई है। बैठक में बंदरगाहों के आधुनिकीकरण और सीमा शुल्क प्रक्रियाओं को एकीकृत करने के लिए डिजिटल फ्रेमवर्क पर सहमति बनी।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">व्यापार समय में 40% और लागत में 30% की कटौती</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        इस रणनीतिक व्यापार मार्ग के पूर्ण संचालन के बाद भारत और यूरोप के बीच माल परिवहन का समय 40 प्रतिशत तक घट जाएगा। यह गलियारा स्वच्छ हाइड्रोजन पाइपलाइन और हाई-स्पीड डेटा केबल नेटवर्क को भी समाहित करेगा।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "समुद्री कार्गो पोत और कंटेनर टर्मिनल",
    imageCaption: "आईएमईसी कॉरिडोर के जरिए भारत के पश्चिमी बंदरगाहों से वैश्विक व्यापार को मिलेगी रफ्तार",
    imageCredit: "पत्तन, पोत परिवहन मंत्रालय",
    category: cat("world"),
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-18T11:40:00Z",
    status: "published",
    tags: ["IMEC", "वैश्विक_व्यापार", "बंदरगाह", "विदेश_नीति", "अर्थव्यवस्था"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 13700,
    readTimeMinutes: 4,
  },
  {
    id: "art-17",
    title: "बैंकिंग और वित्तीय धोखाधड़ी से बचाव के लिए रिजर्व बैंक व साइबर सेल की नई एडवाइजरी: कभी न करें ये 5 गलतियां",
    englishTitle: "RBI & Cyber Cell Advisory on Banking Frauds Prevention",
    slug: "cyber-security-advisory-banking-frauds-prevention",
    excerpt: "एआई वॉयस क्लोनिंग, फर्जी लॉटरी मैसेज और एपीके फाइल्स के जरिए होने वाली ठगी को रोकने के लिए राष्ट्रीय साइबर सुरक्षा पोर्टल ने 1930 हेल्पलाइन पर तुरंत शिकायत दर्ज करने की अपील की।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। डिजिटल बैंकिंग और यूपीआई के बढ़ते प्रसार के साथ ही साइबर अपराधियों के तौर-तरीके भी दिन-ब-दिन अधिक चालाक होते जा रहे हैं। भारतीय रिजर्व बैंक और केंद्रीय गृह मंत्रालय के साइबर सेल ने नागरिकों के लिए एक संयुक्त जागरूकता एडवाइजरी जारी की है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">सुरक्षा के 5 सुनहरे नियम</h2>
      <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li>बैंक या कोई भी अधिकृत संस्था कभी भी फोन या व्हाट्सएप पर ओटीपी अथवा यूपीआई पिन नहीं मांगती।</li>
        <li>अज्ञात संपर्कों द्वारा भेजे गए किसी भी लिंक या .apk फाइल को अपने फोन में डाउनलोड न करें।</li>
        <li>परिवार के किसी सदस्य की संकटग्रस्त आवाज वाले संदिग्ध कॉल पर तुरंत पैसे भेजने से पहले अन्य माध्यम से संपर्क करें।</li>
        <li>सार्वजनिक वाईफाई नेटवर्क पर कभी भी वित्तीय लेनदेन न करें।</li>
        <li>धोखाधड़ी की स्थिति में तुरंत '1930' राष्ट्रीय हेल्पलाइन नंबर पर कॉल करें और अपने बैंक को सूचित करें।</li>
      </ul>
    `,
    featuredImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "स्मार्टफोन स्क्रीन पर साइबर सुरक्षा और लॉक का प्रतीक",
    imageCaption: "साइबर सुरक्षा विशेषज्ञों ने ऑनलाइन वित्तीय लेनदेन में सतर्कता बरतने की सलाह दी",
    imageCredit: "राष्ट्रीय साइबर सुरक्षा सेल",
    category: cat("tech"),
    author: MOCK_AUTHORS.amit_prakash,
    publishedAt: "2026-10-18T08:30:00Z",
    status: "published",
    tags: ["साइबर_सुरक्षा", "बैंकिंग_फ्रॉड", "यूपीआई", "आरबीआई", "सतर्कता"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 17400,
    readTimeMinutes: 3,
  },
  {
    id: "art-18",
    title: "कार्यस्थल पर मानसिक स्वास्थ्य और तनाव प्रबंधन: स्वास्थ्य मंत्रालय ने जारी किए कॉर्पोरेट संस्थानों के लिए नए दिशा-निर्देश",
    englishTitle: "Workplace Mental Health & Stress Management Guidelines Issued",
    slug: "mental-health-workplace-wellbeing-new-guidelines",
    excerpt: "लंबे कामकाजी घंटे और वर्क-फ्रॉम-होम के दबाव के बीच कर्मचारियों के मानसिक स्वास्थ्य को सुरक्षित रखने के लिए 'राइट टू डिस्कनेक्ट' और अनिवार्य वेलनेस सत्रों की सिफारिश।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। भारतीय कार्यबल में बढ़ते तनाव, अवसाद और बर्नआउट की समस्याओं को गंभीरता से लेते हुए केंद्रीय स्वास्थ्य एवं परिवार कल्याण मंत्रालय ने कॉर्पोरेट संस्थानों और सार्वजनिक उपक्रमों के लिए राष्ट्रीय मानसिक स्वास्थ्य दिशा-निर्देश जारी किए हैं।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">काम और निजी जीवन का संतुलन अनिवार्य</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        दिशा-निर्देशों में कंपनियों से आग्रह किया गया है कि वे अपने कर्मचारियों के लिए गोपनीय परामर्श सेवाएं उपलब्ध कराएं और सप्ताहांत तथा अवकाश के दिनों में आधिकारिक कॉल्स और ईमेल्स की सीमा तय करें। उत्पादकता बढ़ाने के लिए स्वस्थ कार्य संस्कृति को सर्वोच्च प्राथमिकता दी जानी चाहिए।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "सूर्योदय के समय ध्यान और शांत वातावरण",
    imageCaption: "मानसिक शांति और शारीरिक स्वास्थ्य के लिए जीवनशैली में बदलाव जरूरी",
    imageCredit: "स्वास्थ्य मंत्रालय भारत सरकार",
    category: cat("health"),
    author: MOCK_AUTHORS.pooja_chaudhary,
    publishedAt: "2026-10-17T20:15:00Z",
    status: "published",
    tags: ["मानसिक_स्वास्थ्य", "तनाव_मुक्त", "लाइफस्टाइल", "स्वास्थ्य", "वेलनेस"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 10800,
    readTimeMinutes: 3,
  },
  {
    id: "art-19",
    title: "भारतीय क्षेत्रीय सिनेमा की वैश्विक धमक: राष्ट्रीय फिल्म पुरस्कारों में दक्षिण और पूर्वोत्तर की फिल्मों का रहा दबदबा",
    englishTitle: "Regional Indian Cinema Shine on Global Stage & National Awards",
    slug: "cinema-regional-films-national-recognition-revolution",
    excerpt: "विषयवस्तु की विविधता, यथार्थवादी कहानी और स्थानीय संस्कृति के जीवंत चित्रण ने गैर-हिंदी सिनेमा को बनाया दर्शकों का चहेता। समीक्षकों ने इसे भारतीय सिनेमा का स्वर्ण काल करार दिया।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। 72वें राष्ट्रीय फिल्म पुरस्कारों की घोषणा ने यह पुनः सिद्ध कर दिया है कि भारतीय सिनेमा की असली ताकत उसकी भाषाई और सांस्कृतिक विविधता में निहित है। इस वर्ष पुरस्कारों की सूची में मलयालम, तमिल, असमिया और कन्नड़ फिल्मों ने उत्कृष्ट प्रदर्शन किया है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">दर्शकों की पसंद में आया बड़ा बदलाव</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        ओटीटी प्लेटफॉर्म्स के विस्तार ने भाषा की दीवारों को ढहा दिया है। दर्शक अब स्टारडम की जगह मजबूत पटकथा, संवेदनशील अभिनय और मौलिक कथावस्तु को प्राथमिकता दे रहे हैं।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "सिनेमा प्रोजेक्टर और थिएटर हॉल",
    imageCaption: "भारतीय क्षेत्रीय सिनेमा ने कलात्मक उत्कृष्टता में नए मानदंड स्थापित किए",
    imageCredit: "सूचना एवं प्रसारण मंत्रालय",
    category: cat("entertainment"),
    author: MOCK_AUTHORS.pooja_chaudhary,
    publishedAt: "2026-10-17T17:00:00Z",
    status: "published",
    tags: ["सिनेमा", "राष्ट्रीय_पुरस्कार", "क्षेत्रीय_सिनेमा", "फिल्म", "मनोरंजन"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 12900,
    readTimeMinutes: 3,
  },
  {
    id: "art-20",
    title: "पीएम सूर्य घर मुफ्त बिजली योजना: 1 करोड़ से अधिक परिवारों ने कराया पंजीकरण, बिजली बिल हुआ शून्य",
    englishTitle: "PM Surya Ghar Free Electricity Scheme: Over 1 Crore Families Registered",
    slug: "renewable-energy-solar-rooftop-subsidies-surge",
    excerpt: "छत पर सोलर पैनल लगाने के लिए केंद्र सरकार की आकर्षक 78,000 रुपये तक की सीधी सब्सिडी से ग्रामीण और अर्ध-शहरी इलाकों में सौर ऊर्जा क्रांति की लहर।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        नई दिल्ली। नवीन एवं नवीकरणीय ऊर्जा मंत्रालय द्वारा संचालित 'पीएम सूर्य घर मुफ्त बिजली योजना' ने आम भारतीय परिवारों के जीवन में क्रांतिकारी बदलाव लाना शुरू कर दिया है। योजना के पोर्टल पर अब तक 1 करोड़ 20 लाख से अधिक परिवारों ने पंजीकरण पूरा कर लिया है।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">अतिरिक्त बिजली बेचकर कमाई भी कर रहे नागरिक</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        इस योजना के तहत 3 किलोवाट तक के रूफटॉप सोलर सिस्टम पर केंद्र सरकार की ओर से सीधी सब्सिडी बैंक खाते में भेजी जा रही है। उपभोक्ता न केवल अपनी जरूरत की 300 यूनिट बिजली मुफ्त प्राप्त कर रहे हैं, बल्कि ग्रिड में अतिरिक्त बिजली बेचकर प्रति माह ₹2000 से ₹3000 की आय भी अर्जित कर रहे हैं।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1508873696983-2df57036476b?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "घरों की छतों पर लगे सौर ऊर्जा पैनल",
    imageCaption: "रूफटॉप सोलर से भारतीय मध्यम वर्ग को मिल रही शून्य बिजली बिल की सौगात",
    imageCredit: "ऊर्जा मंत्रालय",
    category: cat("national"),
    author: MOCK_AUTHORS.vivek_mishra,
    publishedAt: "2026-10-17T14:40:00Z",
    status: "published",
    tags: ["पीएम_सूर्य_घर", "सौर_ऊर्जा", "बिजली_बिल", "नवीकरणीय_ऊर्जा", "देश"],
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    viewCount: 16100,
    readTimeMinutes: 4,
  },
  {
    id: "art-21",
    title: "डीआरडीओ की ऐतिहासिक सफलता: हाइपरसोनिक टेक्नोलॉजी डिमॉन्स्ट्रेटर व्हीकल का सफल परीक्षण, ध्वनि से 6 गुना तेज गति",
    englishTitle: "DRDO's Major Feat: Successful Hypersonic Vehicle Test at Mach 6",
    slug: "drdo-hypersonic-missile-successful-flight-trial",
    excerpt: "ओडिशा के डॉ. एपीजे अब्दुल कलाम द्वीप से दागा गया स्वदेशी स्क्रैमजेट इंजन युक्त मिसाइल सिस्टम। भारत हाइपरसोनिक तकनीक में दुनिया के शीर्ष 4 देशों के क्लब में हुआ शामिल।",
    content: `
      <p class="lead-text font-medium text-lg leading-relaxed text-gray-800 mb-6">
        चांदीपुर (ओडिशा)। रक्षा अनुसंधान एवं विकास संगठन (डीआरडीओ) ने भारत की राष्ट्रीय सुरक्षा और रक्षा तकनीक के क्षेत्र में एक अभूतपूर्व उपलब्धि हासिल की है। भारतीय वैज्ञानिकों ने स्वदेशी रूप से विकसित लंबी दूरी के हाइपरसोनिक मिसाइल सिस्टम का समुद्र तट पर सफल उड़ान परीक्षण संपन्न किया।
      </p>

      <h2 class="text-2xl font-bold text-[#233768] mt-8 mb-4">रडार को चकमा देने में सक्षम अजेय शक्ति</h2>
      <p class="leading-relaxed text-gray-700 mb-4">
        यह हाइपरसोनिक व्हीकल ध्वनि की गति से 6 गुना अधिक (मैक 6+) तेज गति से उड़ान भरने में सक्षम है। इसकी दिशा बदलने की अद्भुत क्षमता दुनिया के किसी भी उन्नत मिसाइल रक्षा तंत्र को भेदने में सक्षम बनाती है। रक्षा मंत्री ने डीआरडीओ वैज्ञानिकों और सशस्त्र बलों को इस गौरवशाली उपलब्धि पर बधाई दी।
      </p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "रॉकेट प्रक्षेपण और अग्नि प्रज्वलन",
    imageCaption: "डॉ. एपीजे अब्दुल कलाम द्वीप से हाइपरसोनिक परीक्षण का दृश्य",
    imageCredit: "डीआरडीओ पीआरओ",
    category: cat("national"),
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-17T11:00:00Z",
    status: "published",
    tags: ["डीआरडीओ", "रक्षा", "हाइपरसोनिक", "मिसाइल", "भारत_शक्ति"],
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    viewCount: 31200,
    readTimeMinutes: 4,
  },
];
