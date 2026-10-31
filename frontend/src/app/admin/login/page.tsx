"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminService } from "@/services/adminService";
import { KeyRound, Mail, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("admin@theconclusiveindian.in");
  const [password, setPassword] = useState("Admin@TCI2026!");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await adminService.login(email.trim(), password);
      login(data.access_token, data.user);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "लॉगिन असफल रहा";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-black text-2xl shadow-xl shadow-amber-500/20 mb-4">
          TCI
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          द कन्क्लूसिव इंडियन
        </h2>
        <p className="mt-1 text-sm text-amber-400 font-medium">
          सुरक्षित संपादकीय एवं प्रशासनिक कंसोल
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                आधिकारिक ईमेल (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  placeholder="editor@theconclusiveindian.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                पासवर्ड (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>सत्यापित हो रहा है...</span>
                </>
              ) : (
                <>
                  <span>कंसोल में प्रवेश करें</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Helpers */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-400 mb-3 font-medium text-center">
              त्वरित डेमो क्रेडेंशियल्स (Quick Test Accounts):
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials("admin@theconclusiveindian.in", "Admin@TCI2026!")}
                className="px-2 py-2 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 transition-colors"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("editor@theconclusiveindian.in", "Editor@TCI2026!")}
                className="px-2 py-2 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg border border-slate-700 transition-colors"
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("author@theconclusiveindian.in", "Author@TCI2026!")}
                className="px-2 py-2 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg border border-slate-700 transition-colors"
              >
                Author
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← मुख्य पोर्टल पर वापस जाएं
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
