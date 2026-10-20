"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
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

  if (!isOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="समाचार खोजें"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E5E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center border-b border-gray-200">
          <div className="pl-4 text-[#233768]">
            <Search className="w-5 h-5" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="समाचार, मुद्दे, या विषय खोजें (उदा: संसद, बजट, क्रिकेट)..."
            className="w-full py-4 pl-3 pr-12 text-base text-[#20242C] placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label="खोज बंद करें"
            className="absolute right-3 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Suggestion list */}
        <div className="p-4 bg-[#F5F6F8]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#E52532]" /> लोकप्रिय खोजें
          </div>
          <div className="flex flex-wrap gap-2">
            {SITE_CONFIG.trendingTopics.map((topic) => (
              <button
                key={topic.slug}
                type="button"
                onClick={() => handleTopicClick(topic.name)}
                className="px-3 py-1.5 bg-white text-xs font-medium text-gray-700 hover:text-[#233768] hover:border-[#233768] border border-gray-200 rounded-full transition-all shadow-2xs"
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
              <strong>&ldquo;{query}&rdquo;</strong> के लिए सभी परिणाम देखें
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1 font-semibold text-[#233768] hover:text-[#E52532]"
            >
              खोजें <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
