"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react";

export type Language = "hi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (hiText: string, enText: string) => string;
}

const STORAGE_KEY = "tci_preferred_lang";

const LanguageContext = createContext<LanguageContextType>({
  language: "hi",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (hiText) => hiText,
});

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("tci_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tci_lang_change", callback);
  };
}

function getSnapshot(): Language {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === "en" ? "en" : "hi";
  } catch {
    return "hi";
  }
}

function getServerSnapshot(): Language {
  return "hi";
}

const emptySubscribe = () => () => {};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const storedLang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const language: Language = isHydrated ? storedLang : "hi";

  const setLanguage = useCallback((lang: Language) => {
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

  const t = useCallback(
    (hiText: string, enText: string) => {
      return language === "en" ? enText : hiText;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "hi" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (hi: string) => hi,
    };
  }
  return context;
}
