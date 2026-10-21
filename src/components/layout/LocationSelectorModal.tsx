"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Search, MapPin, ChevronRight, ArrowLeft, Globe, Building2 } from "lucide-react";
import { INDIA_LOCATIONS, StateLocation, District } from "@/data/indiaLocations";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMounted } from "@/lib/useIsMounted";

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationSelectorModal({ isOpen, onClose }: LocationSelectorModalProps) {
  const isMounted = useIsMounted();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<StateLocation | null>(null);
  const { language, t } = useLanguage();
  const router = useRouter();
  const mountedAtRef = useRef<number>(0);

  const handleClose = useCallback(() => {
    setSelectedState(null);
    setSearchQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      mountedAtRef.current = Date.now();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (Date.now() - mountedAtRef.current < 350) return;
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return INDIA_LOCATIONS;
    const q = searchQuery.toLowerCase().trim();
    return INDIA_LOCATIONS.filter(
      (loc) =>
        loc.name.hi.toLowerCase().includes(q) ||
        loc.name.en.toLowerCase().includes(q) ||
        loc.districts.some(
          (d) => d.name.toLowerCase().includes(q) || d.englishName.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  const handleStateClick = (state: StateLocation) => {
    if (state.districts.length > 0) {
      setSelectedState(state);
    } else {
      handleClose();
      router.push(`/category/state?state=${state.code}`);
    }
  };

  const handleDistrictSelect = (state: StateLocation, district: District) => {
    handleClose();
    const queryTerm = language === "en" ? district.englishName : district.name;
    router.push(`/search?q=${encodeURIComponent(queryTerm)}`);
  };

  const handleAllStateNews = (state: StateLocation) => {
    handleClose();
    const queryTerm = language === "en" ? state.name.en : state.name.hi;
    router.push(`/search?q=${encodeURIComponent(queryTerm)}`);
  };

  const handleAllNationalNews = () => {
    handleClose();
    router.push("/category/national");
  };

  if (!isMounted || !isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={t("राज्य और ज़िला चुनें", "Select State and District")}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[88dvh] overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#263565] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {selectedState ? (
              <button
                type="button"
                onClick={() => setSelectedState(null)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors mr-1 cursor-pointer"
                aria-label={t("वापस राज्यों की सूची पर जाएं", "Back to states list")}
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            ) : (
              <MapPin className="w-5 h-5 text-[#E01F26]" />
            )}
            <div>
              <h2 className="text-sm sm:text-base font-bold leading-tight">
                {selectedState
                  ? `${language === "en" ? selectedState.name.en : selectedState.name.hi} - ${t("के सभी ज़िले", "All Districts")}`
                  : t("देश व राज्य चुनें (Select State & District)", "Select State & District (देश व राज्य)")}
              </h2>
              <p className="text-[11px] text-white/80">
                {selectedState
                  ? t("ताज़ा स्थानीय समाचार देखने के लिए अपना ज़िला चुनें", "Select your district to view local news")
                  : t("भारत के 28 राज्य और 8 केंद्र शासित प्रदेशों की ताज़ा खबरें", "Latest news from 28 states and 8 union territories of India")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label={t("बंद करें", "Close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Quick "All National News" Link */}
        <div className="p-3 bg-gray-50 border-b border-gray-200 shrink-0 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                "राज्य या ज़िला खोजें (उदा: उत्तर प्रदेश, लखनऊ, पटना, जयपुर)...",
                "Search state or district (e.g. Uttar Pradesh, Lucknow, Patna, Jaipur)..."
              )}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#263565]"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleAllNationalNews}
              className="inline-flex items-center gap-1.5 font-bold text-[#E01F26] hover:text-[#b81722] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t("सभी देश व राष्ट्रीय समाचार देखें →", "View All National News →")}</span>
            </button>
            <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
              {t(`कुल ${INDIA_LOCATIONS.length} राज्य व केंद्र शासित प्रदेश`, `Total ${INDIA_LOCATIONS.length} States & UTs`)}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 divide-y divide-gray-100">
          {selectedState ? (
            /* District List for Selected State */
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 bg-red-50 rounded-xl border border-red-200">
                <div>
                  <span className="text-[10px] text-red-600 font-semibold block uppercase">
                    {t("संपूर्ण राज्य", "Entire State")}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    {language === "en" ? `${selectedState.name.en} News` : `${selectedState.name.hi} के सभी समाचार`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAllStateNews(selectedState)}
                  className="px-3 py-1 bg-[#E01F26] text-white text-xs font-bold rounded-lg hover:bg-[#b81722] transition-colors cursor-pointer"
                >
                  {t("देखें", "View")}
                </button>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#263565]" />
                  <span>{t("प्रमुख ज़िले एवं शहर (Districts)", "Districts & Cities (प्रमुख ज़िले)")}</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedState.districts.map((district) => (
                    <button
                      key={district.id}
                      type="button"
                      onClick={() => handleDistrictSelect(selectedState, district)}
                      className="p-2 bg-gray-50 hover:bg-[#263565] hover:text-white rounded-lg border border-gray-200 text-left transition-all group cursor-pointer"
                    >
                      <div className="font-semibold text-xs sm:text-[13px] text-gray-900 group-hover:text-white">
                        {language === "en" ? district.englishName : district.name}
                      </div>
                      <div className="text-[10px] text-gray-500 group-hover:text-white/80">
                        {language === "en" ? district.name : district.englishName}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* States & UTs Grid */
            <div className="space-y-4">
              {/* States Section */}
              <div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {t("भारत के राज्य (States of India)", "States of India (भारत के राज्य)")}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {filteredStates
                    .filter((s) => s.type === "state")
                    .map((state) => (
                      <button
                        key={state.code}
                        type="button"
                        onClick={() => handleStateClick(state)}
                        className="flex items-center justify-between p-2 bg-gray-50 hover:bg-red-50 hover:border-[#E01F26] rounded-xl border border-gray-200 text-left transition-all group cursor-pointer"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-[13px] text-gray-900 group-hover:text-[#E01F26]">
                            {language === "en" ? state.name.en : state.name.hi}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {language === "en" ? state.name.hi : state.name.en}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E01F26] shrink-0" />
                      </button>
                    ))}
                </div>
              </div>

              {/* Union Territories Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {t("केंद्र शासित प्रदेश (Union Territories)", "Union Territories (केंद्र शासित प्रदेश)")}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {filteredStates
                    .filter((s) => s.type === "ut")
                    .map((ut) => (
                      <button
                        key={ut.code}
                        type="button"
                        onClick={() => handleStateClick(ut)}
                        className="flex items-center justify-between p-2 bg-gray-50 hover:bg-red-50 hover:border-[#E01F26] rounded-xl border border-gray-200 text-left transition-all group cursor-pointer"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-[13px] text-gray-900 group-hover:text-[#E01F26]">
                            {language === "en" ? ut.name.en : ut.name.hi}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {language === "en" ? ut.name.hi : ut.name.en}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E01F26] shrink-0" />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0 text-xs text-gray-500">
          <span>The Conclusive Indian • {t("निष्पक्ष समाचार", "Unbiased News")}</span>
          <button
            type="button"
            onClick={handleClose}
            className="px-3.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors cursor-pointer text-xs"
          >
            {t("बंद करें", "Close")}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
