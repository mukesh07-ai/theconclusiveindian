import { Category } from "@/types/news";

export interface SiteConfig {
  name: string;
  hindiName: string;
  tagline: string;
  englishTagline: string;
  description: string;
  url: string;
  ogImage: string;
  editorialEmail: string;
  contactEmail: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  };
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
    telegram: string;
  };
  categories: Category[];
  trendingTopics: { name: string; slug: string }[];
  footerLinks: {
    editorial: { label: string; href: string }[];
    legal: { label: string; href: string }[];
    corporate: { label: string; href: string }[];
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "The Conclusive Indian",
  hindiName: "द कन्क्लूसिव इंडियन",
  tagline: "निष्पक्ष • निर्भीक • निर्णायक",
  englishTagline: "The Voice of Truth, Depth & Impact",
  description:
    "द कन्क्लूसिव इंडियन - भारत का विश्वसनीय और निष्पक्ष हिंदी डिजिटल समाचार मंच। देश, दुनिया, राजनीति, व्यापार, खेल, मनोरंजन और तकनीक की प्रामाणिक खबरें।",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://theconclusiveindian.com",
  ogImage: "/og-image.jpg",
  editorialEmail: "editor@theconclusiveindian.com",
  contactEmail: "contact@theconclusiveindian.com",
  phone: "+91 11 4872 9000",
  address: {
    street: "प्रेस एन्क्लेव, 4th फ्लोर, मीडिया टावर, कस्तूरबा गांधी मार्ग",
    city: "नई दिल्ली",
    state: "दिल्ली",
    pin: "110001",
    country: "भारत",
  },
  social: {
    twitter: "https://twitter.com/conclusiveind",
    facebook: "https://facebook.com/theconclusiveindian",
    instagram: "https://instagram.com/theconclusiveindian",
    youtube: "https://youtube.com/@theconclusiveindian",
    whatsapp: "https://whatsapp.com/channel/theconclusiveindian",
    telegram: "https://t.me/theconclusiveindian",
  },
  categories: [
    {
      id: "national",
      name: "देश",
      englishName: "National",
      slug: "national",
      description: "भारत भर से ताज़ा राजनीतिक, सामाजिक व जनहितकारी समाचार",
      order: 1,
    },
    {
      id: "politics",
      name: "राजनीति",
      englishName: "Politics",
      slug: "politics",
      description: "संसद, चुनाव, राजनीतिक दल और रणनीतिक विश्लेषण",
      order: 2,
    },
    {
      id: "state",
      name: "राज्य समाचार",
      englishName: "State News",
      slug: "state",
      description: "उत्तर प्रदेश, बिहार, मध्य प्रदेश, राजस्थान व अन्य राज्यों की बड़ी खबरें",
      order: 3,
    },
    {
      id: "world",
      name: "विदेश",
      englishName: "World",
      slug: "world",
      description: "अंतरराष्ट्रीय कूटनीति, वैश्विक घटनाएं और भारत से जुड़े मामले",
      order: 4,
    },
    {
      id: "business",
      name: "व्यापार",
      englishName: "Business",
      slug: "business",
      description: "शेयर बाजार, भारतीय अर्थव्यवस्था, स्टार्टअप्स और बैंकिंग जगत",
      order: 5,
    },
    {
      id: "sports",
      name: "खेल",
      englishName: "Sports",
      slug: "sports",
      description: "क्रिकेट, फुटबॉल, ओलंपिक, बैडमिंटन और खेल जगत की रोमांचक खबरें",
      order: 6,
    },
    {
      id: "entertainment",
      name: "मनोरंजन",
      englishName: "Entertainment",
      slug: "entertainment",
      description: "बॉलीवुड, ओटीटी रिलीज, समीक्षाएं, सेलिब्रिटी साक्षात्कार",
      order: 7,
    },
    {
      id: "tech",
      name: "टेक्नोलॉजी",
      englishName: "Technology",
      slug: "tech",
      description: "आर्टिफिशियल इंटेलिजेंस, स्मार्टफोन, गैजेट्स, साइबर सुरक्षा व इनोवेशन",
      order: 8,
    },
    {
      id: "education",
      name: "शिक्षा",
      englishName: "Education",
      slug: "education",
      description: "बोर्ड परीक्षाएं, प्रवेश परीक्षाएं (JEE, NEET, UPSC) व शिक्षा नीतियां",
      order: 9,
    },
    {
      id: "jobs",
      name: "रोजगार",
      englishName: "Jobs & Careers",
      slug: "jobs",
      description: "सरकारी नौकरियां, भर्ती सूचनाएं, करियर गाइडेंस व रोजगार अवसर",
      order: 10,
    },
    {
      id: "agriculture",
      name: "कृषि",
      englishName: "Agriculture",
      slug: "agriculture",
      description: "किसान कल्याण, एमएसपी, आधुनिक खेती की तकनीक व मौसम पूर्वानुमान",
      order: 11,
    },
    {
      id: "health",
      name: "स्वास्थ्य",
      englishName: "Health & Lifestyle",
      slug: "health",
      description: "फिटनेस, आयुर्वेद, पोषण, मानसिक स्वास्थ्य व चिकित्सा अनुसंधान",
      order: 12,
    },
  ],
  trendingTopics: [
    { name: "#संसद_सत्र2026", slug: "parliament-session" },
    { name: "#भारतीय_अर्थव्यवस्था", slug: "indian-economy" },
    { name: "#T20_विश्वकप", slug: "t20-worldcup" },
    { name: "#AI_इनोवेशन", slug: "ai-innovation" },
    { name: "#यूपी_चुनाव_अपडेट", slug: "up-elections" },
    { name: "#सोना_चांदी_भाव", slug: "gold-silver-rates" },
  ],
  footerLinks: {
    editorial: [
      { label: "हमारे बारे में (About Us)", href: "/about" },
      { label: "संपादकीय नीति (Editorial Policy)", href: "/editorial-policy" },
      { label: "तथ्य जांच नीति (Fact-Check Policy)", href: "/editorial-policy#fact-checking" },
      { label: "सुधार नीति (Corrections Policy)", href: "/editorial-policy#corrections" },
      { label: "संपादकीय टीम (Editorial Board)", href: "/about#editorial-board" },
    ],
    legal: [
      { label: "गोपनीयता नीति (Privacy Policy)", href: "/privacy-policy" },
      { label: "नियम एवं शर्तें (Terms & Conditions)", href: "/privacy-policy#terms" },
      { label: "डिस्क्लेमर (Disclaimer)", href: "/privacy-policy#disclaimer" },
      { label: "डिजिटल आचार संहिता (Code of Ethics)", href: "/editorial-policy#code-of-ethics" },
    ],
    corporate: [
      { label: "संपर्क करें (Contact Us)", href: "/contact" },
      { label: "विज्ञापन दें (Advertise With Us)", href: "/contact#advertise" },
      { label: "शिकायत निवारण (Grievance Redressal)", href: "/contact#grievance" },
      { label: "ई-पेपर संस्करण (e-Paper)", href: "#" },
    ],
  },
};
