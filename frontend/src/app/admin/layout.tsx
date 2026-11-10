"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "@/context/AdminAuthContext";
import { adminService } from "@/services/adminService";
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
  Users,
  Megaphone,
  MenuSquare,
  History,
  KeyRound,
  Plus,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface NavGroup {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    requiredRole?: string;
  }[];
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, updateUser, logout, isAuthenticated, isLoading } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Password Change Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // If on login page, render children directly without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">एडमिन कंसोल लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect or show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-8 rounded-2xl text-center shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">एडमिन प्रमाणीकरण आवश्यक है</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            संपादकीय और प्रशासनिक नियंत्रण हेतु कृपया अपने अधिकृत क्रेडेंशियल्स से लॉगिन करें।
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            एडमिन लॉगिन करें
          </Link>
        </div>
      </div>
    );
  }

  // Forced password change if user must change password
  const mustChange = Boolean(user?.must_change_password);

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError("पासवर्ड कम से कम 8 वर्णों का होना चाहिए।");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।");
      return;
    }

    setIsChangingPassword(true);
    try {
      await adminService.changePassword(newPassword, currentPassword || undefined);
      setPasswordSuccess("पासवर्ड सफलतापूर्वक बदल दिया गया है!");
      updateUser({ must_change_password: false });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(null);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }, 1500);
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : "पासवर्ड बदलने में त्रुटि हुई।");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const navGroups: NavGroup[] = [
    {
      title: "डैशबोर्ड",
      items: [
        { label: "डैशबोर्ड Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "समाचार एवं संपादकीय CMS",
      items: [
        { label: "सभी समाचार (Articles)", href: "/admin/articles", icon: FileText },
        { label: "नया समाचार लिखें", href: "/admin/articles/create", icon: Plus },
        { label: "लाइव ब्रेकिंग टिकर", href: "/admin/breaking-news", icon: Zap },
        { label: "श्रेणी एवं टैग", href: "/admin/categories", icon: FolderTree },
      ],
    },
    {
      title: "पेज व वेबसाइट सेक्शन",
      items: [
        { label: "डायनेमिक सेक्शन बिल्डर", href: "/admin/page-builder", icon: LayoutTemplate },
        { label: "नेविगेशन मेन्यू", href: "/admin/navigation", icon: MenuSquare },
      ],
    },
    {
      title: "मुद्रीकरण एवं विज्ञापन",
      items: [
        { label: "विज्ञापन प्रबंधन (Ads)", href: "/admin/advertisements", icon: Megaphone },
      ],
    },
    {
      title: "डिजिटल मीडिया",
      items: [
        { label: "मीडिया लाइब्रेरी", href: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      title: "प्रशासन, सुरक्षा व फीडबैक",
      items: [
        { label: "उपयोगकर्ता व RBAC", href: "/admin/users", icon: Users },
        { label: "शिकायत व फीडबैक", href: "/admin/contact-feedback", icon: Inbox },
        { label: "सुरक्षा व ऑडिट लॉग", href: "/admin/audit-logs", icon: History },
        { label: "साइट सेटिंग्स", href: "/admin/site-settings", icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-amber-500/20">
            TCI
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">द कन्क्लूसिव इंडियन</span>
            <span className="text-[10px] text-amber-400 font-medium">एडमिन एवं संपादकीय कंसोल</span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="मेनू टॉगल करें"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-72 h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center font-black text-base shadow-lg shadow-amber-500/20">
              TCI
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white">THE CONCLUSIVE INDIAN</h1>
              <p className="text-[11px] text-amber-400 font-medium">संपादकीय एवं प्रशासनिक CMS</p>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {group.title}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" &&
                    item.href !== "/admin/articles/create" &&
                    pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Card & Utility Actions */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-2.5 mb-2.5 p-2 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-xs flex-shrink-0">
              {user?.full_name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.full_name}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider font-mono font-bold truncate">
                  {user?.roles?.[0] || "Staff"}
                </span>
                {mustChange && (
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="अस्थाई पासवर्ड बदलें" />
                )}
              </div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-700/50 transition-colors"
              title="पासवर्ड बदलें"
            >
              <KeyRound className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>लाइव साइट</span>
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Top Utility Bar */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Utility Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">एडमिन कंसोल</span>
            <span>/</span>
            <span className="text-white font-medium capitalize">
              {pathname.replace("/admin/", "").replace(/-/g, " ") || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/create"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-amber-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>नया समाचार</span>
            </Link>
            <Link
              href="/admin/advertisements"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors border border-slate-700"
            >
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>विज्ञापन अभियान</span>
            </Link>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>पासवर्ड</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>वेबसाइट</span>
            </Link>
          </div>
        </header>

        {/* Warning Banner if Temporary Password in Use */}
        {mustChange && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between text-amber-300 text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                <strong>सुरक्षा सूचना:</strong> आप प्रारंभिक अस्थाई पासवर्ड से लॉगिन हैं। कृपया अपने खाते की सुरक्षा हेतु नया पासवर्ड सेट करें।
              </span>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="underline font-bold hover:text-white"
            >
              अभी पासवर्ड बदलें &rarr;
            </button>
          </div>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Password Change Modal (Forced or Voluntary) */}
      {(showPasswordModal || mustChange) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl relative">
            {!mustChange && (
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">पासवर्ड बदलें (Change Password)</h3>
                <p className="text-xs text-slate-400">सुरक्षित पासवर्ड क्रेडेंशियल्स अपडेट करें</p>
              </div>
            </div>

            {mustChange && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
                वेबसाइट व्यवस्थापक द्वारा प्रदत्त प्रारंभिक पासवर्ड को बदलना अनिवार्य है ताकि आपके खाते पर पूर्ण नियंत्रण सुरक्षित रहे।
              </div>
            )}

            {passwordError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              {!mustChange && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    वर्तमान पासवर्ड (Current Password)
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="••••••••••••"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  नया पासवर्ड (New Password - न्यूनतम 8 वर्ण)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  नए पासवर्ड की पुष्टि करें (Confirm Password)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {!mustChange && (
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    रद्द करें
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isChangingPassword ? "परिवर्तित किया जा रहा है..." : "पासवर्ड अपडेट करें"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
