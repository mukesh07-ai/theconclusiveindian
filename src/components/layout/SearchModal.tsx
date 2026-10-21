"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMounted } from "@/lib/useIsMounted";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const isMounted = useIsMounted();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const mountedAtRef = useRef<number>(0);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      mountedAtRef.current = Date.now();
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        try {
          inputRef.current?.focus();
        } catch {
          // ignore mobile focus restrictions
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (Date.now() - mountedAtRef.current < 350) return;
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isMounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleTopicClick = (topicName: string) => {
    const cleaned = topicName.replace("#", "");
    handleClose();
    router.push(`/search?q=${encodeURIComponent(cleaned)}`);
  };

  const content = (
    <div
      className="fixed inset-0 z-[99999] flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={t("समाचार खोजें", "Search News")}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center border-b border-gray-200 bg-white">
          <div className="pl-4 text-[#263565]">
            <Search className="w-5 h-5 pointer-events-none" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "समाचार, मुद्दे, या विषय खोजें (उदा: संसद, बजट, क्रिकेट)...",
              "Search news, topics, or issues (e.g. Parliament, Budget, Cricket)..."
            )}
            className="w-full py-3.5 sm:py-4 pl-3 pr-12 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label={t("खोज बंद करें", "Close search")}
            className="absolute right-3 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer touch-manipulation"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </form>

        {/* Suggestion list */}
        <div className="p-4 bg-gray-50">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#E01F26]" />
            <span>{t("लोकप्रिय खोजें (Trending Searches)", "Trending Searches (लोकप्रिय खोजें)")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SITE_CONFIG.trendingTopics.map((topic) => (
              <button
                key={topic.slug}
                type="button"
                onClick={() => handleTopicClick(topic.name)}
                className="px-3 py-1.5 bg-white text-xs font-semibold text-gray-700 hover:text-[#263565] hover:border-[#263565] border border-gray-200 rounded-full transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom submit prompt */}
        {query.trim().length > 0 && (
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>
              {t(
                `"${query}" के लिए सभी परिणाम देखें`,
                `View all results for "${query}"`
              )}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1 font-bold text-[#E01F26] hover:text-[#b81722] cursor-pointer touch-manipulation px-2 py-1"
            >
              <span>{t("खोजें", "Search")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
