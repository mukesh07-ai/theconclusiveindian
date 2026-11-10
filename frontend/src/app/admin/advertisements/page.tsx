"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import Image from "next/image";
import {
  Megaphone,
  PlusCircle,
  Search,
  ExternalLink,
  Eye,
  MousePointerClick,
  TrendingUp,
  Calendar,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit2,
  Layers,
  Sparkles,
} from "lucide-react";

interface AdvertisementItem {
  id: string;
  title: string;
  advertiserName: string;
  destinationUrl: string;
  creativeDesktopUrl: string;
  creativeMobileUrl?: string;
  placementPositions: string[];
  adType: string;
  startDate?: string;
  endDate?: string;
  priority: number;
  isActive: boolean;
  impressionsCount: number;
  clicksCount: number;
  ctr: number;
  createdAt?: string;
}

const PLACEMENT_OPTIONS = [
  { id: "header", label: "शीर्ष हेडर विज्ञापन (Header 728x90)" },
  { id: "homepage_top", label: "होमपेज टॉप बैनर (Homepage Top Leaderboard)" },
  { id: "homepage_middle", label: "होमपेज मध्य बैनर (Homepage Middle Stream)" },
  { id: "homepage_sidebar", label: "होमपेज साइडबार (Homepage Sidebar 300x250)" },
  { id: "article_sidebar", label: "आर्टिकल साइडबार (Article Sidebar Rect)" },
  { id: "article_inline", label: "आर्टिकल सामग्री के बीच (Article In-feed)" },
  { id: "category_sidebar", label: "कैटेगरी साइडबार (Category Sidebar)" },
  { id: "footer", label: "फुटर बैनर (Footer Banner)" },
  { id: "custom", label: "कस्टम प्लेसमेंट (Custom Pages)" },
];

export default function AdminAdvertisementsPage() {
  const [ads, setAds] = useState<AdvertisementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [placementFilter, setPlacementFilter] = useState("all");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeAd, setActiveAd] = useState<AdvertisementItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    advertiserName: "",
    destinationUrl: "https://",
    creativeDesktopUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
    creativeMobileUrl: "",
    placementPositions: ["homepage_top", "homepage_sidebar"] as string[],
    adType: "image_banner",
    startDate: "",
    endDate: "",
    priority: 1,
    isActive: true,
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchAds = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getAds();
      if (Array.isArray(data)) {
        setAds(data);
      }
    } catch (err: unknown) {
      console.error("Error loading ads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (formData.placementPositions.length === 0) {
      setNotification({ type: "error", message: "कृपया कम से कम एक प्लेसमेंट स्थिति चुनें।" });
      return;
    }

    try {
      await adminService.createAd({
        title: formData.title.trim(),
        advertiserName: formData.advertiserName.trim(),
        destinationUrl: formData.destinationUrl.trim(),
        creativeDesktopUrl: formData.creativeDesktopUrl.trim(),
        creativeMobileUrl: formData.creativeMobileUrl.trim() || undefined,
        placementPositions: formData.placementPositions,
        adType: formData.adType,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        priority: Number(formData.priority) || 1,
        isActive: formData.isActive,
      });

      setNotification({ type: "success", message: "विज्ञापन अभियान सफलतापूर्वक शुरू किया गया!" });
      setShowAddModal(false);
      setFormData({
        title: "",
        advertiserName: "",
        destinationUrl: "https://",
        creativeDesktopUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
        creativeMobileUrl: "",
        placementPositions: ["homepage_top"],
        adType: "image_banner",
        startDate: "",
        endDate: "",
        priority: 1,
        isActive: true,
      });
      fetchAds();
    } catch (err: unknown) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "विज्ञापन बनाने में त्रुटि हुई",
      });
    }
  };

  const handleUpdateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAd) return;
    setNotification(null);

    try {
      await adminService.updateAd(activeAd.id, {
        title: formData.title.trim(),
        advertiserName: formData.advertiserName.trim(),
        destinationUrl: formData.destinationUrl.trim(),
        creativeDesktopUrl: formData.creativeDesktopUrl.trim(),
        creativeMobileUrl: formData.creativeMobileUrl.trim() || undefined,
        placementPositions: formData.placementPositions,
        adType: formData.adType,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        priority: Number(formData.priority) || 1,
        isActive: formData.isActive,
      });

      setNotification({ type: "success", message: "विज्ञापन विवरण सफलतापूर्वक अपडेट किया गया!" });
      setShowEditModal(false);
      setActiveAd(null);
      fetchAds();
    } catch (err: unknown) {
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "विज्ञापन अपडेट करने में त्रुटि",
      });
    }
  };

  const handleToggleStatus = async (ad: AdvertisementItem) => {
    try {
      await adminService.toggleAdStatus(ad.id, !ad.isActive);
      fetchAds();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "स्थिति बदलने में त्रुटि");
    }
  };

  const handleDeleteAd = async (ad: AdvertisementItem) => {
    if (!confirm(`क्या आप निश्चित रूप से विज्ञापन "${ad.title}" को हटाना चाहते हैं?`)) {
      return;
    }
    try {
      await adminService.deleteAd(ad.id);
      fetchAds();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "विज्ञापन हटाने में त्रुटि");
    }
  };

  const openEditModal = (ad: AdvertisementItem) => {
    setActiveAd(ad);
    setFormData({
      title: ad.title,
      advertiserName: ad.advertiserName,
      destinationUrl: ad.destinationUrl,
      creativeDesktopUrl: ad.creativeDesktopUrl,
      creativeMobileUrl: ad.creativeMobileUrl || "",
      placementPositions: ad.placementPositions || [],
      adType: ad.adType || "image_banner",
      startDate: ad.startDate ? ad.startDate.slice(0, 16) : "",
      endDate: ad.endDate ? ad.endDate.slice(0, 16) : "",
      priority: ad.priority || 1,
      isActive: ad.isActive,
    });
    setShowEditModal(true);
  };

  // Metrics
  const totalImpressions = ads.reduce((acc, a) => acc + (a.impressionsCount || 0), 0);
  const totalClicks = ads.reduce((acc, a) => acc + (a.clicksCount || 0), 0);
  const activeAdsCount = ads.filter((a) => a.isActive).length;
  const overallCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00";

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.advertiserName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlacement =
      placementFilter === "all" || ad.placementPositions.includes(placementFilter);
    return matchesSearch && matchesPlacement;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-amber-500" />
            <span>विज्ञापन एवं अभियान प्रबंधन (Advertisement Manager)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            वेबसाइट पर विज्ञापन अभियान, क्रिएटिव बैनर, क्लिक-थ्रू ट्रैकिंग एवं प्लेसमेंट का केंद्रीय नियंत्रण
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
          <span>नया विज्ञापन जोड़ें</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">सक्रिय विज्ञापन</p>
            <p className="text-xl font-black text-white">{activeAdsCount}</p>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">कुल व्यूज (Impressions)</p>
            <p className="text-xl font-black text-white">{totalImpressions.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">कुल क्लिक्स (Clicks)</p>
            <p className="text-xl font-black text-white">{totalClicks.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">औसत CTR दर</p>
            <p className="text-xl font-black text-white">{overallCtr}%</p>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
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

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="विज्ञापन शीर्षक या विज्ञापनदाता खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">स्थान फ़िल्टर:</label>
          <select
            value={placementFilter}
            onChange={(e) => setPlacementFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">सभी प्लेसमेंट (All Placements)</option>
            {PLACEMENT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ads List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">विज्ञापन सूची लोड हो रही है...</p>
          </div>
        ) : filteredAds.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Megaphone className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="font-semibold text-white">कोई विज्ञापन नहीं मिला</p>
            <p className="text-xs text-slate-500 mt-1">
              वेबसाइट पर प्रचार शुरू करने हेतु &quot;नया विज्ञापन जोड़ें&quot; बटन पर क्लिक करें।
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">क्रिएटिव एवं शीर्षक</th>
                  <th className="p-4 font-semibold">विज्ञापनदाता</th>
                  <th className="p-4 font-semibold">प्लेसमेंट स्थान</th>
                  <th className="p-4 font-semibold text-center">इम्प्रेशन्स</th>
                  <th className="p-4 font-semibold text-center">क्लिक्स</th>
                  <th className="p-4 font-semibold text-center">CTR</th>
                  <th className="p-4 font-semibold">स्थिति</th>
                  <th className="p-4 font-semibold text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAds.map((ad) => (
                  <tr key={ad.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative flex-shrink-0">
                          {ad.creativeDesktopUrl ? (
                            <Image
                              src={ad.creativeDesktopUrl}
                              alt={ad.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-white truncate text-sm">{ad.title}</p>
                          <a
                            href={ad.destinationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-400 hover:underline flex items-center gap-1 truncate"
                          >
                            <span>{ad.destinationUrl}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-xs text-slate-300 font-medium">
                      {ad.advertiserName}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {ad.placementPositions.map((pos) => (
                          <span
                            key={pos}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {pos}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 text-center font-mono text-xs text-slate-300">
                      {ad.impressionsCount.toLocaleString()}
                    </td>

                    <td className="p-4 text-center font-mono text-xs text-emerald-400 font-bold">
                      {ad.clicksCount.toLocaleString()}
                    </td>

                    <td className="p-4 text-center font-mono text-xs text-amber-400 font-bold">
                      {ad.ctr}%
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(ad)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                          ad.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {ad.isActive ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>सक्रिय</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>निष्क्रिय</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(ad)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="संपादित करें"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAd(ad)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                          title="हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create/Edit Advertisement */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-1">
              {showAddModal ? "नया विज्ञापन अभियान सृजित करें" : "विज्ञापन अभियान संपादित करें"}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              रचनात्मक क्रिएटिव, विज्ञापनदाता, लक्ष्य URL एवं प्लेसमेंट कॉन्फ़िगर करें
            </p>

            <form onSubmit={showAddModal ? handleCreateAd : handleUpdateAd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">अभियान का नाम / शीर्षक</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="उदा. दीवाली स्पेशल प्रमोशन 2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">विज्ञापनदाता (Advertiser)</label>
                  <input
                    type="text"
                    required
                    value={formData.advertiserName}
                    onChange={(e) => setFormData({ ...formData, advertiserName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="उदा. Reliance Digital"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  गंतव्य URL (Destination Link)
                </label>
                <input
                  type="url"
                  required
                  value={formData.destinationUrl}
                  onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="https://example.com/landing"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  डेस्कटॉप क्रिएटिव बैनर URL (Creative Image)
                </label>
                <input
                  type="url"
                  required
                  value={formData.creativeDesktopUrl}
                  onChange={(e) => setFormData({ ...formData, creativeDesktopUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  मोबाइल विशिष्ट बैनर URL (वैकल्पिक)
                </label>
                <input
                  type="url"
                  value={formData.creativeMobileUrl}
                  onChange={(e) => setFormData({ ...formData, creativeMobileUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="https://..."
                />
              </div>

              {/* Placements */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  वेबसाइट प्लेसमेंट स्थान (जहाँ विज्ञापन प्रदर्शित होगा)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PLACEMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:bg-slate-800/40 cursor-pointer text-xs text-slate-300"
                    >
                      <input
                        type="checkbox"
                        checked={formData.placementPositions.includes(opt.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData((prev) => ({
                            ...prev,
                            placementPositions: checked
                              ? [...prev.placementPositions, opt.id]
                              : prev.placementPositions.filter((p) => p !== opt.id),
                          }));
                        }}
                        className="w-3.5 h-3.5 rounded text-amber-500 bg-slate-900 border-slate-700"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">प्राथमिकता (Priority 1-10)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">शुरुआती तारीख</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">अंतिम तारीख</label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="adActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
                />
                <label htmlFor="adActiveToggle" className="text-xs text-slate-300 select-none">
                  यह विज्ञापन अभियान अभी सक्रिय रखें (Live Campaign)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                >
                  {showAddModal ? "अभियान प्रकाशित करें" : "परिवर्तन सहेजें"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
