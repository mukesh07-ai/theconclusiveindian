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
  Megaphone,
  Users,
  ShieldCheck,
  Compass,
  Image as ImageIcon,
  Activity,
  Lock,
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

interface DashboardAuditLog {
  id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    breakingCount: 0,
    categoriesCount: 0,
    feedbackCount: 0,
    activeAdsCount: 0,
    usersCount: 0,
    reviewPendingCount: 0,
  });
  const [recentArticles, setRecentArticles] = useState<DashboardArticle[]>([]);
  const [recentAudits, setRecentAudits] = useState<DashboardAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [
          articlesRes,
          breakingRes,
          categoriesRes,
          feedbackRes,
          adsRes,
          usersRes,
          auditsRes,
        ] = await Promise.allSettled([
          adminService.getArticles({ limit: 6 }),
          adminService.getBreakingNews(),
          adminService.getCategories(),
          adminService.getFeedback("pending"),
          adminService.getAds(),
          adminService.getUsers(),
          adminService.getAuditLogs(undefined, 6),
        ]);

        const articles =
          articlesRes.status === "fulfilled" ? articlesRes.value : { total: 0, data: [] };
        const breaking = breakingRes.status === "fulfilled" ? breakingRes.value : [];
        const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value : [];
        const feedback = feedbackRes.status === "fulfilled" ? feedbackRes.value : [];
        const ads = adsRes.status === "fulfilled" ? adsRes.value : [];
        const users = usersRes.status === "fulfilled" ? usersRes.value : [];
        const audits = auditsRes.status === "fulfilled" ? auditsRes.value : [];

        const activeAds = Array.isArray(ads) ? ads.filter((a: any) => a.is_active) : [];
        const articlesList = articles.data || [];
        const pendingArticles = articlesList.filter(
          (a: DashboardArticle) => a.status === "review" || a.status === "draft"
        ).length;

        setStats({
          totalArticles: articles.total || articlesList.length || 0,
          breakingCount: breaking.length || 0,
          categoriesCount: categories.length || 0,
          feedbackCount: feedback.length || 0,
          activeAdsCount: activeAds.length || ads.length || 0,
          usersCount: users.length || 0,
          reviewPendingCount: pendingArticles,
        });

        setRecentArticles(articlesList);
        setRecentAudits(audits);
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
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>संपादकीय एवं CMS डैशबोर्ड</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              v2.0 Pro
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            द कन्क्लूसिव इंडियन के संपूर्ण न्यूज़रूम, कंटेंट, विज्ञापनों एवं सुरक्षा का केंद्रीय नियंत्रण
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/advertisements"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all"
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            <span>विज्ञापन प्रबंधन</span>
          </Link>

          <Link
            href="/admin/articles/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>नया समाचार लिखें</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards (6 Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Articles */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              कुल समाचार
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {isLoading ? "..." : stats.totalArticles}
          </div>
          <div className="mt-1 text-[10px] text-blue-400 font-medium">लाइव आर्काइव</div>
        </div>

        {/* Breaking News */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ब्रेकिंग टिकर
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {isLoading ? "..." : stats.breakingCount}
          </div>
          <div className="mt-1 text-[10px] text-rose-400 font-medium">सक्रिय सुर्खियां</div>
        </div>

        {/* Active Ads */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              सक्रिय विज्ञापन
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {isLoading ? "..." : stats.activeAdsCount}
          </div>
          <div className="mt-1 text-[10px] text-purple-400 font-medium">कैंपेन लाइव</div>
        </div>

        {/* Staff / Users */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              न्यूज़रूम टीम
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {isLoading ? "..." : stats.usersCount}
          </div>
          <div className="mt-1 text-[10px] text-emerald-400 font-medium">RBAC अधिकृत</div>
        </div>

        {/* Categories */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              श्रेणियां
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {isLoading ? "..." : stats.categoriesCount}
          </div>
          <div className="mt-1 text-[10px] text-amber-400 font-medium">टैक्सोनॉमी</div>
        </div>

        {/* Grievances / Feedback */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              लंबित शिकायतें
            </span>
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {isLoading ? "..." : stats.feedbackCount}
          </div>
          <div className="mt-1 text-[10px] text-orange-400 font-medium">IT Rules 2021</div>
        </div>
      </div>

      {/* Quick Actions Grid (8 Actions) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          त्वरित संपादकीय कार्य (Quick Actions)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          <Link
            href="/admin/articles/create"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">नया लेख</span>
            <span className="text-[9px] text-slate-400">आर्टिकल लिखें</span>
          </Link>

          <Link
            href="/admin/advertisements"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Megaphone className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">विज्ञापन</span>
            <span className="text-[9px] text-slate-400">कैंपेन प्रबंध</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">उपयोगकर्ता</span>
            <span className="text-[9px] text-slate-400">RBAC टीम</span>
          </Link>

          <Link
            href="/admin/breaking-news"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">ब्रेकिंग टिकर</span>
            <span className="text-[9px] text-slate-400">सुर्खियां</span>
          </Link>

          <Link
            href="/admin/page-builder"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <FolderTree className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">पेज बिल्डर</span>
            <span className="text-[9px] text-slate-400">लेआउट सेक्शन</span>
          </Link>

          <Link
            href="/admin/navigation"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">मेन्यू लिंक</span>
            <span className="text-[9px] text-slate-400">नेविगेशन</span>
          </Link>

          <Link
            href="/admin/media"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">मीडिया लाइब्रेरी</span>
            <span className="text-[9px] text-slate-400">चित्र व फाइल्स</span>
          </Link>

          <Link
            href="/admin/audit-logs"
            className="flex flex-col items-center justify-center p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 rounded-xl text-center group transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">ऑडिट लॉग्स</span>
            <span className="text-[9px] text-slate-400">सुरक्षा ट्रैक</span>
          </Link>
        </div>
      </div>

      {/* Main Content Grid: Recent Articles & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Articles (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">हालिया समाचार (Recent Articles)</h2>
              <p className="text-xs text-slate-400">प्रकाशित एवं समीक्षाधीन समाचार सूची</p>
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
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3.5 font-semibold">शीर्षक</th>
                  <th className="py-2.5 px-3 font-semibold">स्थिति</th>
                  <th className="py-2.5 px-3 font-semibold text-right">कार्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentArticles.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-slate-500">
                      कोई समाचार उपलब्ध नहीं है।
                    </td>
                  </tr>
                ) : (
                  recentArticles.slice(0, 6).map((art) => (
                    <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="font-medium text-white truncate max-w-[260px] sm:max-w-xs">
                          {art.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                          <span className="text-amber-400 font-medium">
                            {typeof art.category === "object" ? art.category?.name : art.category || "देश"}
                          </span>
                          <span>•</span>
                          <span>
                            {typeof art.author === "object"
                              ? art.author?.name
                              : art.author || art.author_name || "संपादक"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            art.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : art.status === "scheduled"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : art.status === "review"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {art.status === "published"
                            ? "प्रकाशित"
                            : art.status === "scheduled"
                            ? "शेड्यूल"
                            : art.status === "review"
                            ? "समीक्षा"
                            : "ड्राफ्ट"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          className="text-amber-400 hover:text-amber-300 font-semibold px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 transition-colors text-[11px]"
                        >
                          एडिट
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & Activity Audit Log Snapshot (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">हालिया गतिविधि व सुरक्षा</h2>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>लॉग्स</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 divide-y divide-slate-800/80">
            {recentAudits.length === 0 ? (
              <div className="py-6 text-center text-slate-500 text-xs">
                हालिया गतिविधि रिकॉर्ड लोड हो रहे हैं...
              </div>
            ) : (
              recentAudits.slice(0, 5).map((log) => (
                <div key={log.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-slate-500 shrink-0">
                        {new Date(log.created_at).toLocaleTimeString("hi-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {log.resource_type}: {log.details || log.resource_id || "सिस्टम अपडेट"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              सिस्टम सक्रिय व सुरक्षित
            </span>
            <span>Hostinger Cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
}
