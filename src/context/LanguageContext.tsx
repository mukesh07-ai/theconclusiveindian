"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "hi" | "en";

interface LanguageContextType {
  language: Language;
  isMounted: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (hiText: string, enText: string) => string;
}

const STORAGE_KEY = "tci_preferred_lang";

const LanguageContext = createContext<LanguageContextType>({
  language: "hi",
  isMounted: false,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (hiText) => hiText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with "hi" and isMounted=false on both server and initial client render pass.
  // This guarantees 100% hydration matching between SSR HTML and Client VDOM.
  const [language, setLanguageState] = useState<Language>("hi");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "en" || saved === "hi") {
          setLanguageState(saved);
          document.documentElement.lang = saved;
        }
      } catch {
        // ignore in restricted environments
      }
    }, 0);

    const handleStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "en" || saved === "hi") {
          setLanguageState(saved);
          document.documentElement.lang = saved;
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("tci_lang_change", handleStorage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("tci_lang_change", handleStorage);
    };
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new Event("tci_lang_change"));
    } catch {
      // ignore in restricted mode
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "hi" ? "en" : "hi");
  }, [language, setLanguage]);

  // Guaranteed: During SSR and initial hydration pass, effectiveLanguage is ALWAYS "hi"
  const effectiveLanguage = isMounted ? language : "hi";

  const t = useCallback(
    (hiText: string, enText: string) => {
      if (!isMounted) return hiText;
      return effectiveLanguage === "en" ? enText : hiText;
    },
    [isMounted, effectiveLanguage]
  );

  return (
    <LanguageContext.Provider
      value={{
        language: effectiveLanguage,
        isMounted,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "hi" as Language,
      isMounted: false,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (hi: string) => hi,
    };
  }
  return context;
}
