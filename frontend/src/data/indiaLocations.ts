export interface District {
  id: string;
  name: string;
  englishName: string;
}

export interface StateLocation {
  code: string;
  name: {
    hi: string;
    en: string;
  };
  type: "state" | "ut";
  districts: District[];
}

export const INDIA_LOCATIONS: StateLocation[] = [
  {
    code: "UP",
    name: { hi: "उत्तर प्रदेश", en: "Uttar Pradesh" },
    type: "state",
    districts: [
      { id: "lucknow", name: "लखनऊ", englishName: "Lucknow" },
      { id: "varanasi", name: "वाराणसी", englishName: "Varanasi" },
      { id: "kanpur", name: "कानपुर", englishName: "Kanpur" },
      { id: "prayagraj", name: "प्रयागराज", englishName: "Prayagraj" },
      { id: "noida", name: "नोएडा / गौतम बुद्ध नगर", englishName: "Noida" },
      { id: "ghaziabad", name: "गाजियाबाद", englishName: "Ghaziabad" },
      { id: "agra", name: "आगरा", englishName: "Agra" },
      { id: "meerut", name: "मेरठ", englishName: "Meerut" },
      { id: "gorakhpur", name: "गोरखपुर", englishName: "Gorakhpur" },
      { id: "ayodhya", name: "अयोध्या", englishName: "Ayodhya" },
      { id: "bareilly", name: "बरेली", englishName: "Bareilly" },
      { id: "aligarh", name: "अलीगढ़", englishName: "Aligarh" },
      { id: "moradabad", name: "मुरादाबाद", englishName: "Moradabad" },
      { id: "jhansi", name: "झांसी", englishName: "Jhansi" },
      { id: "mathura", name: "मथुरा", englishName: "Mathura" },
    ],
  },
  {
    code: "BR",
    name: { hi: "बिहार", en: "Bihar" },
    type: "state",
    districts: [
      { id: "patna", name: "पटना", englishName: "Patna" },
      { id: "gaya", name: "गया", englishName: "Gaya" },
      { id: "muzaffarpur", name: "मुजफ्फरपुर", englishName: "Muzaffarpur" },
      { id: "bhagalpur", name: "भागलपुर", englishName: "Bhagalpur" },
      { id: "darbhanga", name: "दरभंगा", englishName: "Darbhanga" },
      { id: "purnia", name: "पूर्णिया", englishName: "Purnia" },
      { id: "rohtas", name: "रोहतास", englishName: "Rohtas" },
      { id: "begusarai", name: "बेगूसराय", englishName: "Begusarai" },
      { id: "saran", name: "सारण / छपरा", englishName: "Saran" },
      { id: "nalanda", name: "नालंदा", englishName: "Nalanda" },
    ],
  },
  {
    code: "MP",
    name: { hi: "मध्य प्रदेश", en: "Madhya Pradesh" },
    type: "state",
    districts: [
      { id: "bhopal", name: "भोपाल", englishName: "Bhopal" },
      { id: "indore", name: "इंदौर", englishName: "Indore" },
      { id: "gwalior", name: "ग्वालियर", englishName: "Gwalior" },
      { id: "jabalpur", name: "जबलपुर", englishName: "Jabalpur" },
      { id: "ujjain", name: "उज्जैन", englishName: "Ujjain" },
      { id: "sagar", name: "सागर", englishName: "Sagar" },
      { id: "rewa", name: "रीवा", englishName: "Rewa" },
      { id: "satna", name: "सतना", englishName: "Satna" },
    ],
  },
  {
    code: "RJ",
    name: { hi: "राजस्थान", en: "Rajasthan" },
    type: "state",
    districts: [
      { id: "jaipur", name: "जयपुर", englishName: "Jaipur" },
      { id: "jodhpur", name: "जोधपुर", englishName: "Jodhpur" },
      { id: "kota", name: "कोटा", englishName: "Kota" },
      { id: "bikaner", name: "बीकानेर", englishName: "Bikaner" },
      { id: "udaipur", name: "उदयपुर", englishName: "Udaipur" },
      { id: "ajmer", name: "अजमेर", englishName: "Ajmer" },
      { id: "alwar", name: "अलवर", englishName: "Alwar" },
      { id: "bhilwara", name: "भीलवाड़ा", englishName: "Bhilwara" },
    ],
  },
  {
    code: "DL",
    name: { hi: "दिल्ली", en: "Delhi" },
    type: "ut",
    districts: [
      { id: "new-delhi", name: "नई दिल्ली", englishName: "New Delhi" },
      { id: "north-delhi", name: "उत्तरी दिल्ली", englishName: "North Delhi" },
      { id: "south-delhi", name: "दक्षिणी दिल्ली", englishName: "South Delhi" },
      { id: "east-delhi", name: "पूर्वी दिल्ली", englishName: "East Delhi" },
      { id: "west-delhi", name: "पश्चिमी दिल्ली", englishName: "West Delhi" },
      { id: "central-delhi", name: "मध्य दिल्ली", englishName: "Central Delhi" },
    ],
  },
  {
    code: "MH",
    name: { hi: "महाराष्ट्र", en: "Maharashtra" },
    type: "state",
    districts: [
      { id: "mumbai", name: "मुंबई", englishName: "Mumbai" },
      { id: "pune", name: "पुणे", englishName: "Pune" },
      { id: "nagpur", name: "नागपुर", englishName: "Nagpur" },
      { id: "nashik", name: "नासिक", englishName: "Nashik" },
      { id: "thane", name: "ठाणे", englishName: "Thane" },
      { id: "aurangabad", name: "छत्रपति संभाजीनगर", englishName: "Chhatrapati Sambhajinagar" },
      { id: "solapur", name: "सोलापुर", englishName: "Solapur" },
      { id: "kolhapur", name: "कोल्हापुर", englishName: "Kolhapur" },
    ],
  },
  {
    code: "HR",
    name: { hi: "हरियाणा", en: "Haryana" },
    type: "state",
    districts: [
      { id: "gurugram", name: "गुरुग्राम", englishName: "Gurugram" },
      { id: "faridabad", name: "फरीदाबाद", englishName: "Faridabad" },
      { id: "panipat", name: "पानीपत", englishName: "Panipat" },
      { id: "ambala", name: "अंबाला", englishName: "Ambala" },
      { id: "rohtak", name: "रोहतक", englishName: "Rohtak" },
      { id: "hisar", name: "हिसार", englishName: "Hisar" },
      { id: "karnal", name: "करनाल", englishName: "Karnal" },
    ],
  },
  {
    code: "PB",
    name: { hi: "पंजाब", en: "Punjab" },
    type: "state",
    districts: [
      { id: "chandigarh-pb", name: "चंडीगढ़", englishName: "Chandigarh" },
      { id: "ludhiana", name: "लुधियाना", englishName: "Ludhiana" },
      { id: "amritsar", name: "अमृतसर", englishName: "Amritsar" },
      { id: "jalandhar", name: "जालंधर", englishName: "Jalandhar" },
      { id: "patiala", name: "पटियाला", englishName: "Patiala" },
      { id: "bathinda", name: "बठिंडा", englishName: "Bathinda" },
      { id: "mohali", name: "मोहाली", englishName: "Mohali" },
    ],
  },
  {
    code: "UT",
    name: { hi: "उत्तराखंड", en: "Uttarakhand" },
    type: "state",
    districts: [
      { id: "dehradun", name: "देहरादून", englishName: "Dehradun" },
      { id: "haridwar", name: "हरिद्वार", englishName: "Haridwar" },
      { id: "nainital", name: "नैनीताल", englishName: "Nainital" },
      { id: "rishikesh", name: "ऋषिकेश", englishName: "Rishikesh" },
      { id: "udham-singh-nagar", name: "ऊधम सिंह नगर", englishName: "Udham Singh Nagar" },
      { id: "almora", name: "अल्मोड़ा", englishName: "Almora" },
    ],
  },
  {
    code: "JH",
    name: { hi: "झारखंड", en: "Jharkhand" },
    type: "state",
    districts: [
      { id: "ranchi", name: "रांची", englishName: "Ranchi" },
      { id: "jamshedpur", name: "जमशेदपुर", englishName: "Jamshedpur" },
      { id: "dhanbad", name: "धनबाद", englishName: "Dhanbad" },
      { id: "bokaro", name: "बोकारो", englishName: "Bokaro" },
      { id: "deoghar", name: "देवघर", englishName: "Deoghar" },
      { id: "hazaribagh", name: "हजारीबाग", englishName: "Hazaribagh" },
    ],
  },
  {
    code: "CT",
    name: { hi: "छत्तीसगढ़", en: "Chhattisgarh" },
    type: "state",
    districts: [
      { id: "raipur", name: "रायपुर", englishName: "Raipur" },
      { id: "bilaspur", name: "बिलासपुर", englishName: "Bilaspur" },
      { id: "durg", name: "दुर्ग / भिलाई", englishName: "Durg" },
      { id: "korba", name: "कोरबा", englishName: "Korba" },
      { id: "raigarh", name: "रायगढ़", englishName: "Raigarh" },
    ],
  },
  {
    code: "GJ",
    name: { hi: "गुजरात", en: "Gujarat" },
    type: "state",
    districts: [
      { id: "ahmedabad", name: "अहमदाबाद", englishName: "Ahmedabad" },
      { id: "surat", name: "सूरत", englishName: "Surat" },
      { id: "vadodara", name: "वडोदरा", englishName: "Vadodara" },
      { id: "rajkot", name: "राजकोट", englishName: "Rajkot" },
      { id: "gandhinagar", name: "गांधीनगर", englishName: "Gandhinagar" },
      { id: "bhavnagar", name: "भावनगर", englishName: "Bhavnagar" },
    ],
  },
  {
    code: "HP",
    name: { hi: "हिमाचल प्रदेश", en: "Himachal Pradesh" },
    type: "state",
    districts: [
      { id: "shimla", name: "शिमला", englishName: "Shimla" },
      { id: "mandi", name: "मंडी", englishName: "Mandi" },
      { id: "dharamshala", name: "धर्मशाला / कांगड़ा", englishName: "Dharamshala" },
      { id: "kullu", name: "कुल्लू / मनाली", englishName: "Kullu" },
      { id: "solan", name: "सोलन", englishName: "Solan" },
    ],
  },
  {
    code: "JK",
    name: { hi: "जम्मू और कश्मीर", en: "Jammu and Kashmir" },
    type: "ut",
    districts: [
      { id: "srinagar", name: "श्रीनगर", englishName: "Srinagar" },
      { id: "jammu", name: "जम्मू", englishName: "Jammu" },
      { id: "anantnag", name: "अनंतनाग", englishName: "Anantnag" },
      { id: "baramulla", name: "बारामुला", englishName: "Baramulla" },
      { id: "udhampur", name: "उधमपुर", englishName: "Udhampur" },
    ],
  },
  {
    code: "WB",
    name: { hi: "पश्चिम बंगाल", en: "West Bengal" },
    type: "state",
    districts: [
      { id: "kolkata", name: "कोलकाता", englishName: "Kolkata" },
      { id: "howrah", name: "हावड़ा", englishName: "Howrah" },
      { id: "siliguri", name: "सिलीगुड़ी", englishName: "Siliguri" },
      { id: "asansol", name: "आसनसोल", englishName: "Asansol" },
      { id: "durgapur", name: "दुर्गापुर", englishName: "Durgapur" },
    ],
  },
  {
    code: "OR",
    name: { hi: "ओडिशा", en: "Odisha" },
    type: "state",
    districts: [
      { id: "bhubaneswar", name: "भुवनेश्वर", englishName: "Bhubaneswar" },
      { id: "cuttack", name: "कटक", englishName: "Cuttack" },
      { id: "puri", name: "पुरी", englishName: "Puri" },
      { id: "rourkela", name: "राउरकेला", englishName: "Rourkela" },
    ],
  },
  {
    code: "AP",
    name: { hi: "आंध्र प्रदेश", en: "Andhra Pradesh" },
    type: "state",
    districts: [
      { id: "visakhapatnam", name: "विशाखापत्तनम", englishName: "Visakhapatnam" },
      { id: "vijayawada", name: "विजयवाड़ा", englishName: "Vijayawada" },
      { id: "guntur", name: "गुंटूर", englishName: "Guntur" },
      { id: "tirupati", name: "तिरुपति", englishName: "Tirupati" },
    ],
  },
  {
    code: "TG",
    name: { hi: "तेलंगाना", en: "Telangana" },
    type: "state",
    districts: [
      { id: "hyderabad", name: "हैदराबाद", englishName: "Hyderabad" },
      { id: "warangal", name: "वारंगल", englishName: "Warangal" },
      { id: "nizamabad", name: "निज़ामाबाद", englishName: "Nizamabad" },
    ],
  },
  {
    code: "KA",
    name: { hi: "कर्नाटक", en: "Karnataka" },
    type: "state",
    districts: [
      { id: "bengaluru", name: "बेंगलुरु", englishName: "Bengaluru" },
      { id: "mysuru", name: "मैसूरु", englishName: "Mysuru" },
      { id: "hubballi", name: "हुबली", englishName: "Hubballi" },
      { id: "mangalore", name: "मंगलुरु", englishName: "Mangalore" },
    ],
  },
  {
    code: "TN",
    name: { hi: "तमिलनाडु", en: "Tamil Nadu" },
    type: "state",
    districts: [
      { id: "chennai", name: "चेन्नई", englishName: "Chennai" },
      { id: "coimbatore", name: "कोयंबटूर", englishName: "Coimbatore" },
      { id: "madurai", name: "मदुरै", englishName: "Madurai" },
      { id: "salem", name: "सलेम", englishName: "Salem" },
    ],
  },
  {
    code: "KL",
    name: { hi: "केरल", en: "Kerala" },
    type: "state",
    districts: [
      { id: "thiruvananthapuram", name: "तिरुवनंतपुरम", englishName: "Thiruvananthapuram" },
      { id: "kochi", name: "कोच्चि", englishName: "Kochi" },
      { id: "kozhikode", name: "कोझिकोड", englishName: "Kozhikode" },
    ],
  },
  {
    code: "AS",
    name: { hi: "असम", en: "Assam" },
    type: "state",
    districts: [
      { id: "guwahati", name: "गुवाहाटी", englishName: "Guwahati" },
      { id: "silchar", name: "सिलचर", englishName: "Silchar" },
      { id: "dibrugarh", name: "डिब्रूगढ़", englishName: "Dibrugarh" },
    ],
  },
  {
    code: "GA",
    name: { hi: "गोवा", en: "Goa" },
    type: "state",
    districts: [
      { id: "north-goa", name: "उत्तरी गोवा (पणजी)", englishName: "North Goa" },
      { id: "south-goa", name: "दक्षिणी गोवा (मडगांव)", englishName: "South Goa" },
    ],
  },
  {
    code: "CH",
    name: { hi: "चंडीगढ़", en: "Chandigarh" },
    type: "ut",
    districts: [{ id: "chandigarh-city", name: "चंडीगढ़ नगर", englishName: "Chandigarh" }],
  },
  {
    code: "LA",
    name: { hi: "लद्दाख", en: "Ladakh" },
    type: "ut",
    districts: [
      { id: "leh", name: "लेह", englishName: "Leh" },
      { id: "kargil", name: "कारगिल", englishName: "Kargil" },
    ],
  },
  {
    code: "SK",
    name: { hi: "सिक्किम", en: "Sikkim" },
    type: "state",
    districts: [{ id: "gangtok", name: "गंगटोक", englishName: "Gangtok" }],
  },
  {
    code: "TR",
    name: { hi: "त्रिपुरा", en: "Tripura" },
    type: "state",
    districts: [{ id: "agartala", name: "अगरतला", englishName: "Agartala" }],
  },
  {
    code: "ML",
    name: { hi: "मेघालय", en: "Meghalaya" },
    type: "state",
    districts: [{ id: "shillong", name: "शिलांग", englishName: "Shillong" }],
  },
  {
    code: "MN",
    name: { hi: "मणिपुर", en: "Manipur" },
    type: "state",
    districts: [{ id: "imphal", name: "इम्फाल", englishName: "Imphal" }],
  },
  {
    code: "NL",
    name: { hi: "नागालैंड", en: "Nagaland" },
    type: "state",
    districts: [{ id: "kohima", name: "कोहिमा", englishName: "Kohima" }],
  },
  {
    code: "MZ",
    name: { hi: "मिजोरम", en: "Mizoram" },
    type: "state",
    districts: [{ id: "aizawl", name: "आइजोल", englishName: "Aizawl" }],
  },
  {
    code: "AR",
    name: { hi: "अरुणाचल प्रदेश", en: "Arunachal Pradesh" },
    type: "state",
    districts: [{ id: "itanagar", name: "ईटानगर", englishName: "Itanagar" }],
  },
  {
    code: "PY",
    name: { hi: "पुडुचेरी", en: "Puducherry" },
    type: "ut",
    districts: [{ id: "puducherry-town", name: "पुडुचेरी", englishName: "Puducherry" }],
  },
  {
    code: "AN",
    name: { hi: "अंडमान और निकोबार द्वीप समूह", en: "Andaman and Nicobar Islands" },
    type: "ut",
    districts: [{ id: "port-blair", name: "पोर्ट ब्लेयर", englishName: "Port Blair" }],
  },
  {
    code: "DN",
    name: { hi: "दादरा और नगर हवेली और दमन और दीव", en: "Dadra and Nagar Haveli and Daman and Diu" },
    type: "ut",
    districts: [
      { id: "daman", name: "दमन", englishName: "Daman" },
      { id: "diu", name: "दीव", englishName: "Diu" },
      { id: "silvassa", name: "सिलवासा", englishName: "Silvassa" },
    ],
  },
  {
    code: "LD",
    name: { hi: "लक्षद्वीप", en: "Lakshadweep" },
    type: "ut",
    districts: [{ id: "kavaratti", name: "कवरत्ती", englishName: "Kavaratti" }],
  },
];

export function getAllStates(): StateLocation[] {
  return INDIA_LOCATIONS.filter((loc) => loc.type === "state");
}

export function getUnionTerritories(): StateLocation[] {
  return INDIA_LOCATIONS.filter((loc) => loc.type === "ut");
}

export function getLocationByCode(code: string): StateLocation | undefined {
  return INDIA_LOCATIONS.find((loc) => loc.code.toLowerCase() === code.toLowerCase());
}
