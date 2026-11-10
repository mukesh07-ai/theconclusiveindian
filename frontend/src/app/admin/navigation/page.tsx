"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import {
  MenuSquare,
  PlusCircle,
  ExternalLink,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Layers,
} from "lucide-react";

interface NavItem {
  id: string;
  menuLocation: string;
  label: string;
  href: string;
  displayOrder: number;
  isActive: boolean;
}

const MENU_LOCATIONS = [
  { id: "header", label: "मुख्य हेडर मेन्यू (Main Header Bar)" },
  { id: "topbar", label: "शीर्ष उपयोगिता बार (Top Utility Bar)" },
  { id: "footer_editorial", label: "फुटर: संपादकीय श्रेणियां (Footer Editorial)" },
  { id: "footer_legal", label: "फुटर: नीतियां एवं विधिक (Footer Policies)" },
  { id: "footer_corporate", label: "फुटर: कंपनी व संपर्क (Footer Corporate)" },
];

export default function AdminNavigationPage() {
  const [groupedNav, setGroupedNav] = useState<Record<string, NavItem[]>>({});
  const [activeTab, setActiveTab] = useState("header");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState({
    label: "",
    href: "/",
    displayOrder: 1,
    isActive: true,
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchNavigation = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getNavigation();
      if (data && typeof data === "object") {
        setGroupedNav(data);
      }
    } catch (err: unknown) {
      console.error("Error loading navigation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    try {
      await adminService.createNavigationItem({
        menuLocation: activeTab,
        label: newItem.label.trim(),
        href: newItem.href.trim(),
        displayOrder: Number(newItem.displayOrder) || 1,
        isActive: newItem.isActive,
      });

      setNotification({ type: "success", message: "मेन्यू आइटम सफलतापूर्वक जोड़ा गया!" });
      setShowAddModal(false);
      setNewItem({ label: "", href: "/", displayOrder: 1, isActive: true });
      fetchNavigation();
    } catch (err: unknown) {
      setNotification({ type: "error", message: err instanceof Error ? err.message : "मेन्यू जोड़ने में त्रुटि" });
    }
  };

  const handleDeleteItem = async (item: NavItem) => {
    if (!confirm(`क्या आप मेन्यू लिंक "${item.label}" को हटाना चाहते हैं?`)) return;
    try {
      await adminService.deleteNavigationItem(item.id);
      fetchNavigation();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "मेन्यू हटाने में त्रुटि");
    }
  };

  const currentItems = groupedNav[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <MenuSquare className="w-6 h-6 text-amber-500" />
            <span>नेविगेशन एवं मेन्यू प्रबंधन (Website Navigation)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            हेडर, टॉपबार एवं फुटर मेन्यू लिंक्स, क्रम एवं दृश्यता को बिना कोड बदले नियंत्रित करें
          </p>
        </div>

        <button
          onClick={() => {
            setNotification(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>नया मेन्यू लिंक जोड़ें</span>
        </button>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center justify-between ${
            notification.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white text-xs">
            बंद करें
          </button>
        </div>
      )}

      {/* Menu Location Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {MENU_LOCATIONS.map((loc) => {
          const count = (groupedNav[loc.id] || []).length;
          return (
            <button
              key={loc.id}
              onClick={() => setActiveTab(loc.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === loc.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>{loc.label}</span>
              <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-black/30">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Items Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">मेन्यू लोड हो रहा है...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <MenuSquare className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="font-semibold text-white">इस लोकेशन में कोई मेन्यू लिंक नहीं है</p>
            <p className="text-xs text-slate-500 mt-1">&quot;नया मेन्यू लिंक जोड़ें&quot; पर क्लिक कर लिंक सृजित करें।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">क्रम (Order)</th>
                  <th className="p-4 font-semibold">लेबल (Title)</th>
                  <th className="p-4 font-semibold">गंतव्य पथ (Href)</th>
                  <th className="p-4 font-semibold">स्थिति (Status)</th>
                  <th className="p-4 font-semibold text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono text-amber-400 font-bold text-xs">
                      #{item.displayOrder}
                    </td>

                    <td className="p-4 font-bold text-white text-sm">
                      {item.label}
                    </td>

                    <td className="p-4">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1"
                      >
                        <span>{item.href}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    <td className="p-4">
                      {item.isActive ? (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>सक्रिय</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">निष्क्रिय</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">नया मेन्यू लिंक जोड़ें</h2>
            <p className="text-xs text-slate-400 mb-6">
              स्थान: <strong className="text-amber-400">{MENU_LOCATIONS.find((m) => m.id === activeTab)?.label}</strong>
            </p>

            <form onSubmit={handleCreateItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मेन्यू लेबल (शीर्षक)</label>
                <input
                  type="text"
                  required
                  value={newItem.label}
                  onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="उदा. विशेष रिपोर्ट्स"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">गंतव्य URL अथवा पथ (Href)</label>
                <input
                  type="text"
                  required
                  value={newItem.href}
                  onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="/category/special or https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">प्रदर्शन क्रम (Display Order)</label>
                <input
                  type="number"
                  min={1}
                  value={newItem.displayOrder}
                  onChange={(e) => setNewItem({ ...newItem, displayOrder: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                >
                  लिंक जोड़ें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
