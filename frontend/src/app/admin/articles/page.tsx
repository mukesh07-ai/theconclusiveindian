"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { adminService } from "@/services/adminService";
import Image from "next/image";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  featuredImage?: string;
  featured_image?: string;
  category?: { name?: string; slug?: string } | string;
  author?: { name?: string; slug?: string; role?: string } | string;
  author_name?: string;
  excerpt?: string;
  viewCount?: number;
  views?: number;
  status: string;
  isBreaking?: boolean;
  is_breaking?: boolean;
  isFeatured?: boolean;
  is_featured?: boolean;
  published_at?: string;
  created_at?: string;
}

interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  englishName?: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    adminService.getCategories().then((data) => {
      if (Array.isArray(data)) setCategories(data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadArticles = async () => {
      try {
        const res = await adminService.getArticles({
          page,
          limit: 15,
          category: selectedCategory || undefined,
          status: statusFilter === "all" ? undefined : statusFilter,
        });
        if (isMounted) {
          setArticles(res.data || []);
          setTotalPages(res.totalPages || 1);
        }
      } catch (err) {
        console.error("Error loading articles:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadArticles();
    return () => {
      isMounted = false;
    };
  }, [page, selectedCategory, statusFilter]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`क्या आप निश्चित रूप से "${title}" को हटाना चाहते हैं?`)) return;
    try {
      await adminService.deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "हटाने में त्रुटि हुई");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await adminService.updateArticleStatus(id, newStatus);
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "स्थिति बदलने में त्रुटि हुई");
    }
  };

  const filteredArticles = articles.filter((a) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const authorName =
      (typeof a.author === "object" && a.author ? a.author.name : null) ||
      (typeof a.author === "string" ? a.author : null) ||
      a.author_name ||
      "";
    return (
      a.title?.toLowerCase().includes(q) ||
      a.excerpt?.toLowerCase().includes(q) ||
      authorName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            समाचार प्रबंधन (Article Management)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            पोर्टल पर प्रकाशित, ड्राफ्ट एवं शेड्यूल्ड समाचारों का संपूर्ण नियंत्रण
          </p>
        </div>

        <Link
          href="/admin/articles/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>नया समाचार लिखें</span>
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          {[
            { id: "all", label: "सभी (All)" },
            { id: "published", label: "प्रकाशित (Published)" },
            { id: "review", label: "समीक्षाधीन (Review)" },
            { id: "approved", label: "अनुमोदित (Approved)" },
            { id: "draft", label: "ड्राफ्ट (Draft)" },
            { id: "scheduled", label: "शेड्यूल (Scheduled)" },
            { id: "archived", label: "आर्काइव (Archived)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="शीर्षक, सारांश या लेखक के नाम से खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:w-60">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">सभी श्रेणियां (All Categories)</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.englishName || c.slug})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">समाचार शीर्षक (Headline)</th>
                <th className="py-3 px-4 font-semibold">श्रेणी (Category)</th>
                <th className="py-3 px-4 font-semibold">लेखक (Author)</th>
                <th className="py-3 px-4 font-semibold">व्यूज (Views)</th>
                <th className="py-3 px-4 font-semibold">स्थिति (Status)</th>
                <th className="py-3 px-4 font-semibold text-right">कार्य (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="inline-block w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                    <p className="text-xs">समाचार लोड हो रहे हैं...</p>
                  </td>
                </tr>
              ) : filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    कोई समाचार प्राप्त नहीं हुआ।
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white max-w-sm">
                      <div className="flex items-start gap-3">
                        <Image
                          src={art.featuredImage || "https://images.unsplash.com/photo-1544735716-392fe2489ffa"}
                          alt={art.title}
                          width={48}
                          height={40}
                          className="w-12 h-10 object-cover rounded-lg flex-shrink-0 bg-slate-800"
                          unoptimized
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm leading-snug">{art.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {(art.isBreaking || art.is_breaking) && (
                              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                                ब्रेकिंग
                              </span>
                            )}
                            {(art.isFeatured || art.is_featured) && (
                              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                फीचर्ड
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                        {typeof art.category === "object" ? art.category?.name : art.category || "देश"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {typeof art.author === "object" ? art.author?.name : art.author || art.author_name || "संपादक"}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-300 font-mono">
                      {(art.viewCount || art.views || 0).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-xs">
                      <select
                        value={art.status}
                        onChange={(e) => handleStatusChange(art.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none bg-slate-950 ${
                          art.status === "published"
                            ? "text-emerald-400 border-emerald-500/30"
                            : art.status === "scheduled"
                            ? "text-purple-400 border-purple-500/30"
                            : "text-amber-400 border-amber-500/30"
                        }`}
                      >
                        <option value="published">प्रकाशित (Live)</option>
                        <option value="draft">ड्राफ्ट</option>
                        <option value="review">समीक्षाधीन (Review)</option>
                        <option value="approved">अनुमोदित (Approved)</option>
                        <option value="scheduled">शेड्यूल</option>
                        <option value="archived">आर्काइव</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          title="वेबसाइट पर देखें"
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          title="संपादित करें"
                          className="p-1.5 text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(art.id, art.title)}
                          title="हटाएं"
                          className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white"
          >
            पिछला (Prev)
          </button>
          <span>पृष्ठ {page} / {totalPages}</span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white"
          >
            अगला (Next)
          </button>
        </div>
      )}
    </div>
  );
}
