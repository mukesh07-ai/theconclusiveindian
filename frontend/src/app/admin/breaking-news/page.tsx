"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import { Zap, Trash2 } from "lucide-react";

interface BreakingNewsItem {
  id: string;
  title: string;
  slug?: string;
  category?: string;
  isUrgent?: boolean;
  is_urgent?: boolean;
  timestamp?: string;
  published_at?: string;
}

export default function AdminBreakingNewsPage() {
  const [items, setItems] = useState<BreakingNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newCategory, setNewCategory] = useState("देश");
  const [isUrgent, setIsUrgent] = useState(true);

  const refreshBreakingNews = async () => {
    try {
      const data = await adminService.getBreakingNews();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error("Error loading breaking news:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchBreaking = async () => {
      try {
        const data = await adminService.getBreakingNews();
        if (isMounted && Array.isArray(data)) {
          setItems(data);
        }
      } catch (err) {
        console.error("Error loading breaking news:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchBreaking();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsSubmitting(true);

    try {
      await adminService.createBreakingNews({
        title: newTitle.trim(),
        slug: newSlug.trim() || `breaking-${Date.now()}`,
        category: newCategory,
        is_urgent: isUrgent,
      });
      setNewTitle("");
      setNewSlug("");
      refreshBreakingNews();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "अलर्ट जोड़ने में त्रुटि");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("क्या आप इस ब्रेकिंग न्यूज़ को टिकर से हटाना चाहते हैं?")) return;
    try {
      await adminService.deleteBreakingNews(id);
      refreshBreakingNews();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "हटाने में त्रुटि");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          लाइव ब्रेकिंग टिकर प्रबंधन (Live Breaking News Ticker)
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          होमपेज के शीर्ष पर स्क्रॉल होने वाले तात्कालिक अलर्ट और अति-महत्वपूर्ण समाचारों का नियंत्रण
        </p>
      </div>

      {/* Add Breaking News Alert Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-rose-500" />
          <span>नया ब्रेकिंग अलर्ट जोड़ें (Broadcast Urgent Alert)</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
              अलर्ट शीर्षक (Hindi Alert Headline) *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (!newSlug) {
                  setNewSlug(`alert-${Date.now().toString().slice(-6)}`);
                }
              }}
              placeholder="उदा. चंबल अभयारण्य में डॉल्फिन और घड़ियाल संरक्षण को मिली नई रफ्तार..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                श्रेणी (Category)
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="देश"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                संबंधित समाचार स्लग (Target URL Slug)
              </label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="chambal-revival-report"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-rose-500"
              />
              <span>अति-महत्वपूर्ण फ्लैश अलर्ट (Mark as Urgent)</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>{isSubmitting ? "प्रसारित हो रहा है..." : "टिकर में प्रसारित करें"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Active Stream Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">वर्तमान सक्रिय ब्रेकिंग टिकर समाचार</h2>
          <span className="text-xs text-slate-400 font-mono">{items.length} सक्रिय</span>
        </div>

        <div className="divide-y divide-slate-800">
          {isLoading ? (
            <div className="py-8 text-center text-slate-400 text-xs">लोड हो रहा है...</div>
          ) : items.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              वर्तमान में कोई ब्रेकिंग न्यूज़ सक्रिय नहीं है।
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      item.isUrgent || item.is_urgent ? "bg-rose-500 animate-ping" : "bg-blue-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {item.category}
                      </span>
                      <span>•</span>
                      <span>{item.timestamp || item.published_at || "अभी-अभी"}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex-shrink-0"
                  title="हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
