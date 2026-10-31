"use client";

import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  variant?: "pill" | "compact" | "drawer" | "navbar";
  className?: string;
}

interface VariantProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  className?: string;
}

function DrawerLanguageSelector({ language, setLanguage, className }: VariantProps) {
  return (
    <div className={cn("w-full bg-gray-100 p-1 rounded-xl flex items-center select-none", className)}>
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        suppressHydrationWarning
        className={cn(
          "flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation",
          language === "hi"
            ? "bg-[#263565] text-white shadow-xs"
            : "text-gray-600 hover:text-gray-900"
        )}
        aria-label="हिंदी भाषा चुनें"
      >
        <span>🇮🇳</span>
        <span suppressHydrationWarning>हिंदी (Hindi)</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        suppressHydrationWarning
        className={cn(
          "flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation",
          language === "en"
            ? "bg-[#263565] text-white shadow-xs"
            : "text-gray-600 hover:text-gray-900"
        )}
        aria-label="Select English language"
      >
        <span>🌐</span>
        <span suppressHydrationWarning>English</span>
      </button>
    </div>
  );
}

function CompactLanguageSelector({ language, setLanguage, className }: VariantProps) {
  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
      aria-label={language === "hi" ? "Switch to English" : "हिंदी में बदलें"}
      title={language === "hi" ? "Switch to English" : "हिंदी में बदलें"}
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors border cursor-pointer select-none touch-manipulation",
        language === "hi"
          ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
          : "bg-[#E01F26] text-white border-[#E01F26] hover:bg-[#b81722]",
        className
      )}
    >
      <Globe className="w-3.5 h-3.5" />
      <span suppressHydrationWarning>{language === "hi" ? "English" : "हिंदी"}</span>
    </button>
  );
}

function NavbarLanguageSelector({ language, setLanguage, className }: VariantProps) {
  return (
    <div className={cn("inline-flex items-center bg-white/10 rounded-full p-0.5 border border-white/20 text-[11px] select-none", className)}>
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        suppressHydrationWarning
        className={cn(
          "px-2.5 py-0.5 rounded-full transition-colors font-bold cursor-pointer touch-manipulation",
          language === "hi"
            ? "bg-[#E01F26] text-white shadow-xs"
            : "text-white/80 hover:text-white"
        )}
        aria-label="हिंदी"
      >
        <span suppressHydrationWarning>हिंदी</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        suppressHydrationWarning
        className={cn(
          "px-2.5 py-0.5 rounded-full transition-colors font-bold cursor-pointer touch-manipulation",
          language === "en"
            ? "bg-[#E01F26] text-white shadow-xs"
            : "text-white/80 hover:text-white"
        )}
        aria-label="English"
      >
        <span suppressHydrationWarning>English</span>
      </button>
    </div>
  );
}

function PillLanguageSelector({ language, setLanguage, className }: VariantProps) {
  return (
    <div
      role="group"
      aria-label="भाषा चयन (Language Selection)"
      className={cn(
        "inline-flex items-center bg-black/30 backdrop-blur-xs rounded-full p-0.5 border border-white/15 text-[11px] select-none shrink-0",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        suppressHydrationWarning
        className={cn(
          "px-2.5 py-0.5 rounded-full transition-colors font-semibold flex items-center gap-1 cursor-pointer touch-manipulation",
          language === "hi"
            ? "bg-[#E01F26] text-white font-bold shadow-xs"
            : "text-gray-300 hover:text-white"
        )}
        aria-pressed={language === "hi"}
        aria-label="हिंदी भाषा सक्रिय करें"
      >
        <span className="text-[10px]">🇮🇳</span>
        <span suppressHydrationWarning>हिंदी</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        suppressHydrationWarning
        className={cn(
          "px-2.5 py-0.5 rounded-full transition-colors font-semibold flex items-center gap-1 cursor-pointer touch-manipulation",
          language === "en"
            ? "bg-[#E01F26] text-white font-bold shadow-xs"
            : "text-gray-300 hover:text-white"
        )}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        <span className="text-[10px]">🌐</span>
        <span suppressHydrationWarning>English</span>
      </button>
    </div>
  );
}

export function LanguageSelector({ variant = "pill", className }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "drawer") {
    return <DrawerLanguageSelector language={language} setLanguage={setLanguage} className={className} />;
  }
  if (variant === "compact") {
    return <CompactLanguageSelector language={language} setLanguage={setLanguage} className={className} />;
  }
  if (variant === "navbar") {
    return <NavbarLanguageSelector language={language} setLanguage={setLanguage} className={className} />;
  }
  return <PillLanguageSelector language={language} setLanguage={setLanguage} className={className} />;
}
