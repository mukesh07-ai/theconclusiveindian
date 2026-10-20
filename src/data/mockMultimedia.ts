import { VideoStory, PhotoStory, OpinionArticle } from "@/types/news";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_AUTHORS } from "./mockAuthors";

const cat = (slug: string) =>
  SITE_CONFIG.categories.find((c) => c.slug === slug) || SITE_CONFIG.categories[0];

export const MOCK_VIDEOS: VideoStory[] = [
  {
    id: "vid-1",
    title: "संसद में पेश AI डेटा सुरक्षा बिल पर केंद्रीय मंत्री का विशेष साक्षात्कार: क्या बदलेगा आम नागरिक के लिए?",
    slug: "parliament-digital-data-ai-bill-tabled-2026",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    duration: "06:45",
    category: cat("politics"),
    publishedAt: "2026-10-20T11:00:00Z",
    views: "1.2 लाख दृश्य",
  },
  {
    id: "vid-2",
    title: "ग्राउंड रिपोर्ट: इसरो के शुक्रयान मिशन की श्रीहरिकोटा से विशेष कवरेज, जानिए अंतरिक्ष में भारत की नई छलांग",
    slug: "isro-shukrayaan-mission-launch-preparation-sriharikota",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    duration: "08:20",
    category: cat("tech"),
    publishedAt: "2026-10-20T08:30:00Z",
    views: "95 हजार दृश्य",
  },
  {
    id: "vid-3",
    title: "मेलबर्न में टीम इंडिया का ऐतिहासिक जश्न: ड्रेसिंग रूम से विशेष तस्वीरें और कप्तान की बातचीत",
    slug: "india-vs-australia-t20-final-match-victory-highlights",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    duration: "04:15",
    category: cat("sports"),
    publishedAt: "2026-10-20T07:45:00Z",
    views: "2.8 लाख दृश्य",
  },
  {
    id: "vid-4",
    title: "एक्सपर्ट विश्लेषण: क्या आरबीआई की नई ब्याज दर नीति से आपके होम लोन और एफडी पर पड़ेगा असर?",
    slug: "rbi-monetary-policy-repo-rate-gdp-growth-2026",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
    duration: "05:50",
    category: cat("business"),
    publishedAt: "2026-10-20T09:40:00Z",
    views: "64 हजार दृश्य",
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
