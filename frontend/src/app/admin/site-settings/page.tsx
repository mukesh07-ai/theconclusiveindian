"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import { Save, CheckCircle2, Globe, Mail, ShieldCheck } from "lucide-react";

interface SiteConfigRecord {
  hindiName?: string;
  name?: string;
  tagline?: string;
  englishTagline?: string;
  editorialEmail?: string;
  contactEmail?: string;
  phone?: string;
  contactPhone?: string;
  contactAddress?: string;
  address?: { street?: string; [key: string]: unknown };
  compliance?: {
    grievanceOfficer?: {
      name?: string;
      email?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  socialLinks?: Record<string, string>;
  [key: string]: unknown;
}

export default function AdminSiteSettingsPage() {
  const [config, setConfig] = useState<SiteConfigRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await adminService.getSiteConfig();
        setConfig(data);
      } catch (err) {
        console.error("Error loading site config:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setIsSubmitting(true);
    try {
      await adminService.updateSiteConfig(config as Record<string, unknown>);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "सेटिंग्स सेव करने में त्रुटि");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !config) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm">साइट सेटिंग्स लोड हो रही हैं...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            ग्लोबल साइट सेटिंग्स (Global Site Settings)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            ब्रांडिंग, संपर्क विवरण, सोशल मीडिया और IT Rules 2021 शिकायत निवारण अधिकारी की जानकारी
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? "सहेजा जा रहा है..." : "सेटिंग्स सुरक्षित करें"}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>साइट सेटिंग्स सफलतापूर्वक अपडेट हो गई हैं!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branding */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-500" />
            <span>पोर्टल ब्रांडिंग एवं पहचान (Portal Branding)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                पोर्टल का नाम (Hindi Name)
              </label>
              <input
                type="text"
                value={config.hindiName || ""}
                onChange={(e) => setConfig({ ...config, hindiName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                अंग्रेजी नाम (English Name)
              </label>
              <input
                type="text"
                value={config.name || ""}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                आदर्श वाक्य (Hindi Tagline)
              </label>
              <input
                type="text"
                value={config.tagline || ""}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                English Tagline
              </label>
              <input
                type="text"
                value={config.englishTagline || ""}
                onChange={(e) => setConfig({ ...config, englishTagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span>आधिकारिक संपर्क एवं पता (Contact Information)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                संपादकीय ईमेल (Editorial Email)
              </label>
              <input
                type="email"
                value={config.editorialEmail || ""}
                onChange={(e) => setConfig({ ...config, editorialEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                सामान्य संपर्क ईमेल
              </label>
              <input
                type="email"
                value={config.contactEmail || ""}
                onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                फोन नंबर (Phone)
              </label>
              <input
                type="text"
                value={config.phone || ""}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              मुख्यालय पता (Office Street Address)
            </label>
            <input
              type="text"
              value={config.address?.street || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  address: { ...config.address, street: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Compliance / IT Rules 2021 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>IT Rules 2021 शिकायत निवारण अधिकारी (Grievance Officer)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                अधिकारी का नाम (Officer Name)
              </label>
              <input
                type="text"
                value={config.compliance?.grievanceOfficer?.name || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    compliance: {
                      ...config.compliance,
                      grievanceOfficer: {
                        ...config.compliance?.grievanceOfficer,
                        name: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                अधिकारी का ईमेल
              </label>
              <input
                type="email"
                value={config.compliance?.grievanceOfficer?.email || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    compliance: {
                      ...config.compliance,
                      grievanceOfficer: {
                        ...config.compliance?.grievanceOfficer,
                        email: e.target.value,
                      },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
