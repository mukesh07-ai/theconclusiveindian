import { VideoStory, PhotoStory, OpinionArticle } from "@/types/news";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_AUTHORS } from "./mockAuthors";

const cat = (slug: string) =>
  SITE_CONFIG.categories.find((c) => c.slug === slug) || SITE_CONFIG.categories[0];

export const MOCK_VIDEOS: VideoStory[] = [
  {
    id: "vid-bundelkhand-suro-ka-safar",
    title: "बुंदेलखंड की सुखी बंजर धरती से सुरों के रसधार का अनोखा सफर",
    slug: "bundelkhand-suro-ki-rasdhar-kavita-sharma-podcast",
    thumbnail: "https://i.ytimg.com/vi/CfIwAGhPPvc/hqdefault.jpg",
    duration: "78:11",
    category: cat("entertainment"),
    publishedAt: "2026-10-18T10:30:00Z",
    views: "विशेष पॉडकास्ट",
    youtubeId: "CfIwAGhPPvc",
    youtubeUrl: "https://youtu.be/CfIwAGhPPvc",
    isFeatured: true,
    guest: "कविता शर्मा (बुंदेली लोकगायिका)",
    channelName: "The Conclusive Indian",
    description: "शून्य से शिखर तक पॉडकास्ट में अमित कुमार के साथ लोकगायिका कविता शर्मा की बुंदेलखंड की माटी से सुरों के शिखर तक की अविस्मरणीय यात्रा। बुंदेली लोकगीत, राई, सोहर और संघर्ष की अनकही दास्तान।",
  },
  {
    id: "vid-swami-darshan-bharti",
    title: "लव जिहाद के मुद्दे पर स्वामी दर्शन भारती का तल्ख अंदाज: देवभूमि से विशेष बातचीत",
    slug: "swami-darshan-bharti-interview-devbhumi-exclusive",
    thumbnail: "https://i.ytimg.com/vi/vadcIqpgJwE/hqdefault.jpg",
    duration: "विशेष रिपोर्ट",
    category: cat("national"),
    publishedAt: "2026-10-18T10:01:00Z",
    views: "ग्राउंड इंटरव्यू",
    youtubeId: "vadcIqpgJwE",
    youtubeUrl: "https://www.youtube.com/shorts/vadcIqpgJwE",
    channelName: "The Conclusive Indian",
  },
  {
    id: "vid-sangeet-bhaav-kavita-sharma",
    title: "संगीत की सबसे बड़ी खासियत है लोगों को भाव से आपस में जोड़ना - कविता शर्मा",
    slug: "kavita-sharma-sangeet-bhaav-bundeli-interview-clip",
    thumbnail: "https://i.ytimg.com/vi/ioX5lkyjT1E/hqdefault.jpg",
    duration: "पॉडकास्ट क्लिप",
    category: cat("entertainment"),
    publishedAt: "2026-10-18T07:34:00Z",
    views: "वायरल क्लिप",
    youtubeId: "ioX5lkyjT1E",
    youtubeUrl: "https://www.youtube.com/shorts/ioX5lkyjT1E",
    channelName: "The Conclusive Indian",
  },
  {
    id: "vid-uttarakhand-samarthya",
    title: "हम अपनी क्षमता के अनुसार नहीं कर पा रहे काम: उत्तराखंड और देवभूमि से जमीनी संवाद",
    slug: "uttarakhand-devbhumi-ground-report-special",
    thumbnail: "https://i.ytimg.com/vi/bL846ChndJk/hqdefault.jpg",
    duration: "विशेष संवाद",
    category: cat("state"),
    publishedAt: "2026-10-17T12:25:00Z",
    views: "विशेष बुलेटिन",
    youtubeId: "bL846ChndJk",
    youtubeUrl: "https://www.youtube.com/shorts/bL846ChndJk",
    channelName: "The Conclusive Indian",
  },
];

export const MOCK_PHOTO_STORIES: PhotoStory[] = [
  {
    id: "photo-1",
    title: "केदारनाथ से कन्याकुमारी तक: शरद ऋतु में भारत के प्रमुख तीर्थों और प्राकृतिक स्थलों की 10 विहंगम तस्वीरें",
    slug: "delhi-air-quality-emergency-action-plan-measures",
    thumbnail: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&auto=format&fit=crop&q=80",
    photoCount: 10,
    category: cat("national"),
    publishedAt: "2026-10-20T06:00:00Z",
  },
  {
    id: "photo-2",
    title: "वंदे भारत स्लीपर एक्सप्रेस के भीतर की पहली झलक: विमान जैसा इंटीरियर, आधुनिक केबिन और अत्याधुनिक सुविधाएं",
    slug: "railways-mega-recruitment-drive-one-lakh-jobs",
    thumbnail: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
    photoCount: 8,
    category: cat("national"),
    publishedAt: "2026-10-19T14:00:00Z",
  },
  {
    id: "photo-3",
    title: "बिहार के खेतों में खिलती मखाने की फसल: किसानों की कड़ी मेहनत और वैश्विक पहचान की सचित्र गाथा",
    slug: "bihar-agri-exports-makhana-litchi-global-footprint",
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
    photoCount: 12,
    category: cat("state"),
    publishedAt: "2026-10-18T15:30:00Z",
  },
];

export const MOCK_OPINIONS: OpinionArticle[] = [
  {
    id: "op-1",
    title: "डिजिटल संप्रभुता और निजता का संतुलन: क्या भारत का नया AI कानून वैश्विक दिशा तय करेगा?",
    slug: "parliament-digital-data-ai-bill-tabled-2026",
    excerpt: "आर्टिफिशियल इंटेलिजेंस की दौड़ में भारत केवल एक बड़ा बाजार बनकर नहीं रह सकता। तकनीकी संप्रभुता और नैतिक मानकों का यह संगम विश्व के लिए एक नजीर बन सकता है।",
    author: MOCK_AUTHORS.rajesh_sharma,
    publishedAt: "2026-10-20T08:00:00Z",
    readTimeMinutes: 6,
  },
  {
    id: "op-2",
    title: "भारतीय क्रिकेट में पीढ़ीगत बदलाव: युवाओं के आत्मविश्वास ने ऑस्ट्रेलिया में क्यों रचा इतिहास?",
    slug: "india-vs-australia-t20-final-match-victory-highlights",
    excerpt: "दबाव के क्षणों में बिना घबराए आक्रामक खेल खेलना नए भारतीय खिलाड़ियों की पहचान बन चुका है। यह बदलाव केवल तकनीक का नहीं, बल्कि मानसिक दृढ़ता का भी है।",
    author: MOCK_AUTHORS.neha_verma,
    publishedAt: "2026-10-19T19:00:00Z",
    readTimeMinutes: 5,
  },
  {
    id: "op-3",
    title: "स्थिर रेपो दर और मध्यम वर्ग की आकांक्षाएं: घरेलू निवेश को नई ऊर्जा देने का सही वक्त",
    slug: "rbi-monetary-policy-repo-rate-gdp-growth-2026",
    excerpt: "मुद्रास्फीति के नरम पड़ने से उपभोक्ताओं के पास बचत और निवेश के बेहतर अवसर हैं। मैन्युफैक्चरिंग और बुनियादी ढांचे में निरंतर गति से रोजगार की संभावनाएं बढ़ेंगी।",
    author: MOCK_AUTHORS.vivek_mishra,
    publishedAt: "2026-10-19T16:00:00Z",
    readTimeMinutes: 5,
  },
];
