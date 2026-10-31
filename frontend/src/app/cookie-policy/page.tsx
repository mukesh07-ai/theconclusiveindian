"use client";

import Link from "next/link";
import {
  Cookie,
  Shield,
  Sliders,
  Settings2,
  ChevronRight,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function CookiePolicyPage() {
  const handleOpenCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("tci-open-cookie-settings"));
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "कुकी नीति (Cookie Policy)",
    url: `${SITE_CONFIG.url}/cookie-policy`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "कुकी नीति",
          item: `${SITE_CONFIG.url}/cookie-policy`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#233768] hover:underline">
            होम
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-900">कुकी नीति</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-6 border-b border-gray-200">
          <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            पारदर्शिता एवं उपयोगकर्ता सहमति
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            कुकी नीति (Cookie Policy)
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-3 flex-wrap">
            <span>प्रभावी तिथि: 1 जनवरी 2024</span>
            <span>•</span>
            <span>अंतिम समीक्षा: 21 अक्टूबर 2026</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium pt-2">
            यह कुकी नीति स्पष्ट करती है कि <strong>{SITE_CONFIG.name}</strong> वेबसाइट पर कुकीज (Cookies) और लोकल स्टोरेज तकनीकों का उपयोग कैसे और किस उद्देश्य से किया जाता है। हम पारदर्शिता और पाठकों की स्वायत्तता में विश्वास रखते हैं।
          </p>
        </header>

        {/* Section 1: What are cookies */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Cookie className="w-5 h-5 text-[#E01F26]" /> 1. कुकीज क्या हैं? (What Are Cookies?)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              कुकीज छोटी टेक्स्ट फाइलें होती हैं जो आपके ब्राउज़र द्वारा आपके कंप्यूटर या मोबाइल डिवाइस पर सहेजी जाती हैं। ये फाइलें वेबसाइट को यह याद रखने में सहायता करती हैं कि आपने कौन सी भाषा चुनी है, आपका फॉन्ट साइज क्या है, और साइट कितनी तेजी से लोड हो रही है।
            </p>
          </div>
        </section>

        {/* Section 2: Cookie Categories Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#233768]" /> 2. हम किन कुकीज का उपयोग करते हैं? (Categories of Cookies)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-[#18274b] text-white">
                <tr>
                  <th className="p-3">कुकी श्रेणी</th>
                  <th className="p-3">उद्देश्य एवं कार्यप्रणाली</th>
                  <th className="p-3">सहमति स्थिति</th>
                  <th className="p-3">अवधि (Lifespan)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                <tr>
                  <td className="p-3 font-bold text-gray-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-green-600 shrink-0" /> आवश्यक कुकीज (Strictly Essential)
                  </td>
                  <td className="p-3">
                    भाषा वरीयता (हिंदी/अंग्रेजी), सुरक्षा टोकन और आपकी कुकी प्राथमिकताओं को सहेजने हेतु।
                  </td>
                  <td className="p-3 font-semibold text-green-700 bg-green-50">
                    हमेशा सक्रिय (अनिवार्य)
                  </td>
                  <td className="p-3">सत्र (Session) अथवा 1 वर्ष</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-900">
                    एनालिटिक्स कुकीज (Analytics & Performance)
                  </td>
                  <td className="p-3">
                    साइट पर आने वाले पाठकों की कुल संख्या और सर्वाधिक पढ़े जाने वाले समाचारों की अनामित गणना हेतु।
                  </td>
                  <td className="p-3 font-semibold text-blue-700 bg-blue-50">
                    वैकल्पिक (सहमति पर निर्भर)
                  </td>
                  <td className="p-3">अधिकतम 13 महीने</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-900">
                    विज्ञापन एवं विपणन (Advertising Cookies)
                  </td>
                  <td className="p-3">
                    प्रासंगिक प्रायोजित सामग्री और गैर-आक्रामक विज्ञापनों के प्रदर्शन हेतु।
                  </td>
                  <td className="p-3 font-semibold text-amber-700 bg-amber-50">
                    वैकल्पिक (सहमति पर निर्भर)
                  </td>
                  <td className="p-3">अधिकतम 12 महीने</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Interactive Preference Trigger */}
        <section className="bg-gradient-to-br from-[#1C2C4E] to-[#121E36] text-white p-6 sm:p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <Settings2 className="w-6 h-6 text-amber-400 shrink-0" />
            <h2 className="text-xl font-bold">अपनी कुकी प्राथमिकताएं किसी भी समय बदलें</h2>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            आप किसी भी समय अपनी पूर्व में दी गई सहमति को बदल सकते हैं अथवा गैर-आवश्यक कुकीज को अस्वीकार कर सकते हैं।
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="px-5 py-2.5 bg-[#E01F26] hover:bg-[#b81722] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Settings2 className="w-4 h-4" />
              <span>कुकी सेटिंग्स पैनल खोलें (Open Cookie Settings)</span>
            </button>
          </div>
        </section>

        {/* Section 4: Browser Management */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#233768]">
            3. ब्राउज़र स्तर पर कुकीज को कैसे नियंत्रित करें? (Browser Settings)
          </h2>
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed pl-7">
            <p>
              आप अपने वेब ब्राउज़र की सेटिंग्स में जाकर भी किसी भी समय कुकीज को हटा या ब्लॉक कर सकते हैं:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>
            <p className="text-xs text-gray-500 pt-1">
              <em>नोट: यदि आप आवश्यक कुकीज को पूरी तरह ब्लॉक कर देते हैं, तो पोर्टल के कुछ फीचर्स (जैसे भाषा चयन) सुचारु रूप से कार्य नहीं कर पाएंगे।</em>
            </p>
          </div>
        </section>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <Info className="w-4 h-4 text-gray-600" />
            <span>विधिक पारदर्शिता नोट (Legal Transparency Notice):</span>
          </div>
          <p>{SITE_CONFIG.compliance.legalReviewDisclaimer}</p>
        </div>
      </div>
    </>
  );
}
