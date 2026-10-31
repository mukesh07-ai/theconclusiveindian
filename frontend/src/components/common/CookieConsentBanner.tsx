"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Shield, Check, X, Settings2 } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "tci_cookie_consent_v1";

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    // Check if user already set preferences
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // First visit: show consent banner after a brief gentle delay
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted (e.g. strict private browsing)
    }

    // Listen for custom event to reopen preferences from footer / policy page
    const handleReopen = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setPreferences(JSON.parse(stored));
        }
      } catch {
        // Ignore storage access error
      }
      setShowPreferences(true);
      setIsOpen(true);
    };

    window.addEventListener("tci-open-cookie-settings", handleReopen);
    return () => window.removeEventListener("tci-open-cookie-settings", handleReopen);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      setPreferences(prefs);
    } catch {
      // Fallback
    }
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    savePreferences({
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="कुकी सहमति और गोपनीयता प्राथमिकताएं"
      role="region"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 md:p-6 flex justify-center pointer-events-none"
    >
      <div className="bg-[#18274b] text-white w-full max-w-4xl rounded-2xl shadow-2xl border border-white/15 p-4 sm:p-6 pointer-events-auto backdrop-blur-md space-y-4">
        {/* Banner Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E01F26] text-white flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                कुकीज़ एवं गोपनीयता प्राथमिकताएं (Cookie Preferences)
              </h3>
              <span className="text-[11px] text-gray-300">
                द कन्क्लूसिव इंडियन • निष्पक्ष और पारदर्शी डिजिटल पत्रकारिता
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="सहमति विंडो बंद करें"
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Banner Body */}
        <p className="text-xs text-gray-200 leading-relaxed">
          हम आपके पढ़ने के अनुभव को अनुकूलित करने, साइट की गति बनाए रखने और सुरक्षित सेवाएं प्रदान करने हेतु आवश्यक तकनीकी कुकीज का उपयोग करते हैं। हम बिना आपकी सहमति के गैर-आवश्यक विश्लेषणात्मक या विज्ञापन कुकीज सक्रिय नहीं करते हैं। अधिक जानकारी हेतु हमारी{" "}
          <Link
            href="/cookie-policy"
            className="text-white underline font-semibold hover:text-red-300"
          >
            कुकी नीति
          </Link>{" "}
          व{" "}
          <Link
            href="/privacy-policy"
            className="text-white underline font-semibold hover:text-red-300"
          >
            गोपनीयता नीति
          </Link>{" "}
          पढ़ें।
        </p>

        {/* Detailed Preferences Panel (if opened) */}
        {showPreferences && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 space-y-3 text-xs">
            {/* Category 1: Essential */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
              <div>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-400" /> आवश्यक कुकीज (Strictly Essential)
                </span>
                <p className="text-[11px] text-gray-300">
                  भाषा चयन, सुरक्षा एवं साइट नेविगेशन हेतु अनिवार्य। इन्हें बंद नहीं किया जा सकता।
                </p>
              </div>
              <span className="text-[11px] font-semibold text-green-400 bg-green-950/60 border border-green-800/80 px-2 py-0.5 rounded shrink-0">
                सदा सक्रिय
              </span>
            </div>

            {/* Category 2: Analytics */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
              <div>
                <span className="font-bold text-white">
                  विश्लेषण कुकीज (Analytics Cookies)
                </span>
                <p className="text-[11px] text-gray-300">
                  अनामित विज़िट आंकड़े समझकर पत्रकारिता सामग्री और लोड स्पीड को सुधारने हेतु।
                </p>
              </div>
              <label htmlFor="cookie-toggle-analytics" className="relative inline-flex items-center cursor-pointer shrink-0">
                <span className="sr-only">विश्लेषण कुकीज़ चालू अथवा बंद करें</span>
                <input
                  id="cookie-toggle-analytics"
                  type="checkbox"
                  aria-label="विश्लेषण कुकीज़ (Analytics Cookies)"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform after:transition-colors peer-checked:bg-[#E01F26]"></div>
              </label>
            </div>

            {/* Category 3: Marketing */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-white">
                  विज्ञापन व विपणन कुकीज (Marketing Cookies)
                </span>
                <p className="text-[11px] text-gray-300">
                  प्रासंगिक प्रायोजित सामग्री एवं विज्ञापन प्रदर्शन हेतु।
                </p>
              </div>
              <label htmlFor="cookie-toggle-marketing" className="relative inline-flex items-center cursor-pointer shrink-0">
                <span className="sr-only">विज्ञापन व विपणन कुकीज़ चालू अथवा बंद करें</span>
                <input
                  id="cookie-toggle-marketing"
                  type="checkbox"
                  aria-label="विज्ञापन व विपणन कुकीज़ (Marketing Cookies)"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform after:transition-colors peer-checked:bg-[#E01F26]"></div>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-xs text-gray-300 hover:text-white flex items-center justify-center sm:justify-start gap-1 py-1.5 transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{showPreferences ? "सेटिंग्स छिपाएं" : "प्राथमिकताएं कस्टमाइज़ करें"}</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 bg-[#233768] hover:bg-[#18274b] text-white text-xs font-bold rounded-lg border border-white/20 transition-colors cursor-pointer"
              >
                चयनित प्राथमिकताएं सहेजें
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/15 transition-colors cursor-pointer"
              >
                केवल आवश्यक (Reject Optional)
              </button>
            )}

            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-[#E01F26] hover:bg-[#b81722] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>सभी स्वीकार करें (Accept All)</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
