"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { adminService } from "@/services/adminService";
import {
  FileText,
  Zap,
  FolderTree,
  Inbox,
  PlusCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface DashboardArticle {
  id: string;
  title: string;
  slug?: string;
  category?: { name?: string; slug?: string } | string;
  author?: { name?: string; slug?: string; role?: string } | string;
  author_name?: string;
  status: string;
  views?: number;
  published_at?: string;
  created_at?: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    breakingCount: 0,
    categoriesCount: 0,
    feedbackCount: 0,
  });
  const [recentArticles, setRecentArticles] = useState<DashboardArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [articlesRes, breakingRes, categoriesRes, feedbackRes] =
          await Promise.allSettled([
            adminService.getArticles({ limit: 5 }),
            adminService.getBreakingNews(),
            adminService.getCategories(),
            adminService.getFeedback("pending"),
          ]);

        const articles =
          articlesRes.status === "fulfilled" ? articlesRes.value : { total: 0, data: [] };
        const breaking = breakingRes.status === "fulfilled" ? breakingRes.value : [];
        const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value : [];
        const feedback = feedbackRes.status === "fulfilled" ? feedbackRes.value : [];

        setStats({
          totalArticles: articles.total || articles.data?.length || 0,
          breakingCount: breaking.length || 0,
          categoriesCount: categories.length || 0,
          feedbackCount: feedback.length || 0,
        });

        setRecentArticles(articles.data || []);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            संपादकीय डैशबोर्ड (Editorial Dashboard)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            द कन्क्लूसिव इंडियन के सभी माइक्रोसर्विसेज और संपादकीय तंत्र का केंद्रीय नियंत्रण
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

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Articles */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              कुल प्रकाशित समाचार
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {isLoading ? "..." : stats.totalArticles}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>लाइव डिजिटल आर्काइव</span>
          </div>
        </div>

        {/* Breaking News */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              लाइव ब्रेकिंग टिकर
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {isLoading ? "..." : stats.breakingCount}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>ताज़ा सुर्खियां सक्रिय</span>
          </div>
        </div>

        {/* Categories */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              सक्रिय श्रेणियां
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {isLoading ? "..." : stats.categoriesCount}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>पूर्ण टैक्सोनॉमी कवरेज</span>
          </div>
        </div>

        {/* Grievances / Feedback */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              लंबित शिकायत / फीडबैक
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {isLoading ? "..." : stats.feedbackCount}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>IT Rules 2021 निवारण</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          त्वरित संपादकीय कार्य (Quick Actions)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/articles/create"
            className="flex flex-col items-center justify-center p-4 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">नया समाचार</span>
            <span className="text-[10px] text-slate-400 mt-0.5">आर्टिकल लिखें</span>
          </Link>

          <Link
            href="/admin/breaking-news"
            className="flex flex-col items-center justify-center p-4 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">ब्रेकिंग न्यूज़</span>
            <span className="text-[10px] text-slate-400 mt-0.5">टिकर अपडेट करें</span>
          </Link>

          <Link
            href="/admin/page-builder"
            className="flex flex-col items-center justify-center p-4 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FolderTree className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">होमपेज लेआउट</span>
            <span className="text-[10px] text-slate-400 mt-0.5">सेक्शन व्यवस्थित करें</span>
          </Link>

          <Link
            href="/admin/contact-feedback"
            className="flex flex-col items-center justify-center p-4 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">शिकायत निवारण</span>
            <span className="text-[10px] text-slate-400 mt-0.5">टिकट समीक्षा</span>
          </Link>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">हालिया समाचार (Recent Articles)</h2>
            <p className="text-xs text-slate-400 mt-0.5">ताज़ा प्रकाशित एवं समीक्षाधीन समाचार सूची</p>
          </div>
          <Link
            href="/admin/articles"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>सभी देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">शीर्षक (Headline)</th>
                <th className="py-3 px-4 font-semibold">श्रेणी (Category)</th>
                <th className="py-3 px-4 font-semibold">लेखक (Author)</th>
                <th className="py-3 px-4 font-semibold">स्थिति (Status)</th>
                <th className="py-3 px-4 font-semibold text-right">कार्य (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                    कोई समाचार उपलब्ध नहीं है।
                  </td>
                </tr>
              ) : (
                recentArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white max-w-md truncate">
                      {art.title}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                        {typeof art.category === "object" ? art.category?.name : art.category || "देश"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {typeof art.author === "object" ? art.author?.name : art.author || art.author_name || "संपादक"}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          art.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : art.status === "scheduled"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {art.status === "published"
                          ? "प्रकाशित"
                          : art.status === "scheduled"
                          ? "शेड्यूल"
                          : "ड्राफ्ट"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs">
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className="text-amber-400 hover:text-amber-300 font-semibold px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                      >
                        संपादित करें
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
