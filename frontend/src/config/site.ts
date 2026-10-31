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
    twitterHandle?: string;
    facebook: string;
    facebookPage?: string;
    facebookShare?: string;
    instagram: string;
    instagramHandle?: string;
    youtube: string;
    youtubeFeaturedVideo?: string;
    youtubeFeaturedVideoId?: string;
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
  callButton?: {
    enabled: boolean;
    label: string;
    phone: string;
  };
  whatsappChat?: {
    enabled: boolean;
    label: string;
    englishLabel: string;
    phone: string;
    message: string;
    englishMessage: string;
  };
  compliance: {
    grievanceOfficer: {
      name: string;
      title: string;
      email: string;
      responseWindow: string;
      address: string;
      isVerified: boolean;
    };
    pressCouncilEthics: boolean;
    itRules2021: boolean;
    legalReviewDisclaimer: string;
  };
  businessVerification: {
    isRegisteredEntityVerified: boolean;
    isAddressVerified: boolean;
    isPhoneVerified: boolean;
    entityName: string;
    registrationNumberPlaceholder: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "The Conclusive Indian",
  hindiName: "द कन्क्लूसिव इंडियन",
  tagline: "निष्पक्ष • निर्भीक • निर्णायक",
  englishTagline: "The Voice of Truth, Depth & Impact",
  description:
    "द कन्क्लूसिव इंडियन - भारत का विश्वसनीय और निष्पक्ष हिंदी डिजिटल समाचार मंच। देश, दुनिया, राजनीति, व्यापार, खेल, मनोरंजन और तकनीक की प्रामाणिक खबरें।",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://theconclusiveindian.in",
  ogImage: "/og-image.jpg",
  editorialEmail: "editor@theconclusiveindian.in",
  contactEmail: "contact@theconclusiveindian.in",
  phone: "+91 11 4872 9000",
  address: {
    street: "प्रेस एन्क्लेव, 4th फ्लोर, मीडिया टावर, कस्तूरबा गांधी मार्ग",
    city: "नई दिल्ली",
    state: "दिल्ली",
    pin: "110001",
    country: "भारत",
  },
  social: {
    twitter: "https://x.com/tci2024",
    twitterHandle: "@tci2024",
    facebook: "https://www.facebook.com/share/1Kkgpxuhat/?mibextid=wwXIfr",
    facebookPage: "https://www.facebook.com/theconclusiveindian",
    instagram: "https://www.instagram.com/theconclusiveindian",
    instagramHandle: "@theconclusiveindian",
    youtube: "https://www.youtube.com/@theconclusiveindian",
    youtubeFeaturedVideo: "https://youtu.be/CfIwAGhPPvc",
    youtubeFeaturedVideoId: "CfIwAGhPPvc",
    whatsapp: "https://whatsapp.com/channel/theconclusiveindian",
    telegram: "https://t.me/theconclusiveindian",
  },
  callButton: {
    enabled: true,
    label: "कॉल करें",
    phone: process.env.NEXT_PUBLIC_CALL_PHONE || "+91 11 4872 9000",
  },
  whatsappChat: {
    enabled: true,
    label: "व्हाट्सएप चैट",
    englishLabel: "WhatsApp Chat",
    phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+91 98765 43210",
    message: "नमस्ते! मैं The Conclusive Indian टीम से संपर्क करना चाहता/चाहती हूँ।",
    englishMessage: "Hello! I would like to connect with The Conclusive Indian team.",
  },
  compliance: {
    grievanceOfficer: {
      name: "श्री आलोक नारायण",
      title: "नामित शिकायत निवारण अधिकारी (Grievance Officer)",
      email: "grievance@theconclusiveindian.in",
      responseWindow: "24 घंटे में पावती, 15 कार्यदिवसों में समाधान",
      address: "प्रेस एन्क्लेव, 4th फ्लोर, मीडिया टावर, कस्तूरबा गांधी मार्ग, नई दिल्ली - 110001",
      isVerified: false, // Flagged placeholder pending official appointment registration
    },
    pressCouncilEthics: true,
    itRules2021: true,
    legalReviewDisclaimer:
      "यह विधिक एवं नीतिगत दस्तावेज सामान्य पारदर्शिता हेतु तैयार किया गया है। उत्पादन में लाइव करने से पूर्व योग्य विधि सलाहकार द्वारा अंतिम समीक्षा अपेक्षित है।",
  },
  businessVerification: {
    isRegisteredEntityVerified: false, // Flagged configuration placeholder
    isAddressVerified: false, // Flagged configuration placeholder
    isPhoneVerified: false, // Flagged configuration placeholder
    entityName: "The Conclusive Indian Media Network [पंजीकरण प्रक्रियाधीन / Placeholder]",
    registrationNumberPlaceholder: "CIN / MSME: [कॉन्फ़िगरेशन प्लेसहोल्डर - सत्यापन लंबित]",
  },
  categories: [
    {
      id: "world",
      name: "विदेश",
      englishName: "World",
      slug: "world",
      description: "अंतरराष्ट्रीय कूटनीति, वैश्विक घटनाएं और भारत से जुड़े मामले",
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
      id: "entertainment",
      name: "मनोरंजन",
      englishName: "Entertainment",
      slug: "entertainment",
      description: "बॉलीवुड, ओटीटी रिलीज, समीक्षाएं, सेलिब्रिटी साक्षात्कार",
      order: 3,
    },
    {
      id: "agriculture",
      name: "कृषि",
      englishName: "Agriculture",
      slug: "agriculture",
      description: "किसान कल्याण, एमएसपी, आधुनिक खेती की तकनीक व मौसम पूर्वानुमान",
      order: 4,
    },
    {
      id: "national",
      name: "देश",
      englishName: "National",
      slug: "national",
      description: "भारत भर से ताज़ा राजनीतिक, सामाजिक व जनहितकारी समाचार",
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
      id: "business",
      name: "व्यापार",
      englishName: "Business",
      slug: "business",
      description: "शेयर बाजार, भारतीय अर्थव्यवस्था, स्टार्टअप्स और बैंकिंग जगत",
      order: 7,
    },
    {
      id: "education",
      name: "शिक्षा",
      englishName: "Education",
      slug: "education",
      description: "बोर्ड परीक्षाएं, प्रवेश परीक्षाएं (JEE, NEET, UPSC) व शिक्षा नीतियां",
      order: 8,
    },
    {
      id: "jobs",
      name: "रोजगार",
      englishName: "Jobs & Careers",
      slug: "jobs",
      description: "सरकारी नौकरियां, भर्ती सूचनाएं, करियर गाइडेंस व रोजगार अवसर",
      order: 9,
    },
    {
      id: "tech",
      name: "टेक्नोलॉजी",
      englishName: "Technology",
      slug: "tech",
      description: "आर्टिफिशियल इंटेलिजेंस, स्मार्टफोन, गैजेट्स, साइबर सुरक्षा व इनोवेशन",
      order: 10,
    },
    {
      id: "state",
      name: "राज्य समाचार",
      englishName: "State News",
      slug: "state",
      description: "उत्तर प्रदेश, बिहार, मध्य प्रदेश, राजस्थान व अन्य राज्यों की बड़ी खबरें",
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
    { name: "#शून्य_से_शिखर_तक", slug: "shunya-se-shikhar-tak" },
    { name: "#अजीत_डोभाल", slug: "ajit-doval" },
    { name: "#चंबल_सेंचुरी", slug: "chambal-sanctuary" },
    { name: "#बुंदेलखंड_पॉडकास्ट", slug: "bundelkhand-podcast" },
    { name: "#सोनम_वांगचुक", slug: "sonam-wangchuk" },
    { name: "#स्वामी_दर्शन_भारती", slug: "swami-darshan-bharti" },
    { name: "#उम्मेदाराम_बेनीवाल", slug: "umedaram-beniwal" },
  ],
  footerLinks: {
    editorial: [
      { label: "हमारे बारे में (About Us)", href: "/about-us" },
      { label: "संपादकीय नीति (Editorial Policy)", href: "/editorial-policy" },
      { label: "तथ्य जांच नीति (Fact-Check Policy)", href: "/fact-check-policy" },
      { label: "सुधार नीति (Corrections Policy)", href: "/corrections-policy" },
      { label: "संपादकीय टीम (Authors & Editors)", href: "/authors" },
      { label: "साइटमैप (HTML Sitemap)", href: "/sitemap" },
    ],
    legal: [
      { label: "गोपनीयता नीति (Privacy Policy)", href: "/privacy-policy" },
      { label: "नियम एवं शर्तें (Terms & Conditions)", href: "/terms-and-conditions" },
      { label: "कुकी नीति (Cookie Policy)", href: "/cookie-policy" },
      { label: "डिस्क्लेमर (Legal Disclaimer)", href: "/disclaimer" },
      { label: "शिकायत निवारण (Grievance Redressal)", href: "/grievance-redressal" },
    ],
    corporate: [
      { label: "संपर्क करें (Contact Us)", href: "/contact-us" },
      { label: "विज्ञापन दें (Advertise With Us)", href: "/advertise-with-us" },
      { label: "स्वामित्व एवं फंडिंग (Ownership & Funding)", href: "/ownership-and-funding" },
      { label: "सुलभता नीति (Accessibility)", href: "/accessibility" },
    ],
  },
};
