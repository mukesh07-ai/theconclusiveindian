"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context/AdminAuthContext";
import {
  LayoutDashboard,
  FileText,
  Zap,
  FolderTree,
  LayoutTemplate,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  User,
} from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render children directly without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">एडमिन कंसोल लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect or show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 max-w-md w-full p-8 rounded-2xl text-center shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">एडमिन प्रमाणीकरण आवश्यक है</h2>
          <p className="text-slate-400 text-sm mb-6">
            संपादकीय और प्रशासनिक नियंत्रण हेतु कृपया अपने अधिकृत क्रेडेंशियल्स से लॉगिन करें।
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-colors"
          >
            एडमिन लॉगिन करें
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "डैशबोर्ड", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "समाचार प्रबंधन", href: "/admin/articles", icon: FileText },
    { label: "लाइव ब्रेकिंग टिकर", href: "/admin/breaking-news", icon: Zap },
    { label: "श्रेणी एवं टैग", href: "/admin/categories", icon: FolderTree },
    { label: "पेज बिल्डर", href: "/admin/page-builder", icon: LayoutTemplate },
    { label: "शिकायत व फीडबैक", href: "/admin/contact-feedback", icon: Inbox },
    { label: "मीडिया लाइब्रेरी", href: "/admin/media", icon: ImageIcon },
    { label: "साइट सेटिंग्स", href: "/admin/site-settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            TCI
          </div>
          <span className="font-bold text-sm tracking-wide">द कन्क्लूसिव इंडियन एडमिन</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              TCI
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white">THE CONCLUSIVE INDIAN</h1>
              <p className="text-[11px] text-amber-400 font-medium">एडमिन एवं संपादकीय कंसोल</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.full_name}</p>
              <p className="text-[10px] text-amber-400 uppercase tracking-wider font-mono">
                {user?.roles?.[0] || "Staff"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>वेबसाइट</span>
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-slate-950 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
