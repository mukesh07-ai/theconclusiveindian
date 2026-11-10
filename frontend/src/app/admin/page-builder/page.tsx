"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import {
  Layers,
  FileCode,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  PlusCircle,
  Trash2,
  Edit2,
  ExternalLink,
  Settings,
  Sparkles,
  LayoutTemplate,
} from "lucide-react";

interface HomepageSectionItem {
  id: string;
  sectionType: string;
  title: string;
  displayOrder: number;
  isEnabled: boolean;
  config?: Record<string, unknown>;
}

interface StaticPageItem {
  slug: string;
  title: string;
  hindiTitle: string;
  contentMarkdown: string;
  metaDescription?: string;
  updatedAt?: string;
}

const SECTION_TYPE_LABELS: Record<string, string> = {
  hero: "मुख्य समाचार ग्रिड (Hero Lead Grid)",
  latest: "ताज़ा ख़बरें स्ट्रीम (Latest News Stream)",
  category: "विशिष्ट श्रेणी समाचार (Category Block)",
  videos: "वीडियो बुलेटिन (Video Bulletin Carousel)",
  photos: "फोटो स्टोरीज़ गैलरी (Photo Journalism Gallery)",
  opinion: "संपादकीय एवं विचार (Editorial Voices)",
  ad_banner: "विज्ञापन स्थान (Ad Placement Banner)",
  curated_grid: "विशेष क्यूरेटेड ग्रिड (Curated Custom Grid)",
};

export default function AdminPageBuilderPage() {
  const [activeTab, setActiveTab] = useState<"sections" | "pages">("sections");

  // Sections State
  const [sections, setSections] = useState<HomepageSectionItem[]>([]);
  const [isSectionsLoading, setIsSectionsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSection, setNewSection] = useState({
    title: "",
    sectionType: "category",
    limit: 6,
    category: "national",
    layout: "split",
  });

  // Pages State
  const [pages, setPages] = useState<StaticPageItem[]>([]);
  const [isPagesLoading, setIsPagesLoading] = useState(true);
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [showEditPageModal, setShowEditPageModal] = useState(false);
  const [activePage, setActivePage] = useState<StaticPageItem | null>(null);

  const [pageFormData, setPageFormData] = useState({
    slug: "",
    title: "",
    hindiTitle: "",
    contentMarkdown: "",
    metaDescription: "",
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Fetch sections
  const fetchSections = async () => {
    try {
      setIsSectionsLoading(true);
      const data = await adminService.getHomepageSections();
      if (Array.isArray(data)) {
        const sorted = (data as HomepageSectionItem[]).sort(
          (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
        );
        setSections(sorted);
      }
    } catch (err: unknown) {
      console.error("Error loading sections:", err);
    } finally {
      setIsSectionsLoading(false);
    }
  };

  // Fetch pages
  const fetchPages = async () => {
    try {
      setIsPagesLoading(true);
      const data = await adminService.getPages();
      if (Array.isArray(data)) {
        setPages(data);
      }
    } catch (err: unknown) {
      console.error("Error loading pages:", err);
    } finally {
      setIsPagesLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchPages();
  }, []);

  // Section actions
  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    newSections.forEach((s, idx) => {
      s.displayOrder = idx + 1;
    });

    setSections(newSections);
  };

  const toggleSection = (index: number) => {
    const newSections = [...sections];
    newSections[index].isEnabled = !newSections[index].isEnabled;
    setSections(newSections);
  };

  const updateTitle = (index: number, title: string) => {
    const newSections = [...sections];
    newSections[index].title = title;
    setSections(newSections);
  };

  const handleSaveAllSections = async () => {
    try {
      await Promise.all(
        sections.map((sec) =>
          adminService.updateHomepageSection(sec.id, {
            title: sec.title,
            displayOrder: sec.displayOrder,
            isEnabled: sec.isEnabled,
            config: sec.config,
          })
        )
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "सेव करने में त्रुटि");
    }
  };

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    try {
      const config: Record<string, unknown> = {
        limit: Number(newSection.limit) || 6,
        layout: newSection.layout,
      };
      if (newSection.sectionType === "category") {
        config.category = newSection.category;
      }

      await adminService.createHomepageSection({
        sectionType: newSection.sectionType,
        title: newSection.title.trim(),
        displayOrder: sections.length + 1,
        isEnabled: true,
        config: config,
      });

      setNotification({ type: "success", message: "नया सेक्शन सफलतापूर्वक जोड़ा गया!" });
      setShowAddSectionModal(false);
      setNewSection({ title: "", sectionType: "category", limit: 6, category: "national", layout: "split" });
      fetchSections();
    } catch (err: unknown) {
      setNotification({ type: "error", message: err instanceof Error ? err.message : "सेक्शन बनाने में त्रुटि" });
    }
  };

  const handleDeleteSection = async (sec: HomepageSectionItem) => {
    if (!confirm(`क्या आप निश्चित रूप से सेक्शन "${sec.title}" को हटाना चाहते हैं?`)) return;
    try {
      await adminService.deleteHomepageSection(sec.id);
      fetchSections();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "सेक्शन हटाने में त्रुटि");
    }
  };

  // Page actions
  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    try {
      await adminService.createPage({
        slug: pageFormData.slug.trim(),
        title: pageFormData.title.trim(),
        hindiTitle: pageFormData.hindiTitle.trim(),
        contentMarkdown: pageFormData.contentMarkdown.trim(),
        metaDescription: pageFormData.metaDescription.trim() || undefined,
      });

      setNotification({ type: "success", message: "नया पेज सफलतापूर्वक प्रकाशित किया गया!" });
      setShowAddPageModal(false);
      setPageFormData({ slug: "", title: "", hindiTitle: "", contentMarkdown: "", metaDescription: "" });
      fetchPages();
    } catch (err: unknown) {
      setNotification({ type: "error", message: err instanceof Error ? err.message : "पेज बनाने में त्रुटि" });
    }
  };

  const handleUpdatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePage) return;
    setNotification(null);
    try {
      await adminService.updatePage(activePage.slug, {
        title: pageFormData.title.trim(),
        hindiTitle: pageFormData.hindiTitle.trim(),
        contentMarkdown: pageFormData.contentMarkdown.trim(),
        metaDescription: pageFormData.metaDescription.trim() || undefined,
      });

      setNotification({ type: "success", message: "पेज सामग्री सफलतापूर्वक अपडेट की गई!" });
      setShowEditPageModal(false);
      setActivePage(null);
      fetchPages();
    } catch (err: unknown) {
      setNotification({ type: "error", message: err instanceof Error ? err.message : "पेज अपडेट करने में त्रुटि" });
    }
  };

  const handleDeletePage = async (page: StaticPageItem) => {
    if (!confirm(`क्या आप निश्चित रूप से पेज "${page.hindiTitle}" (${page.slug}) को हटाना चाहते हैं?`)) return;
    try {
      await adminService.deletePage(page.slug);
      fetchPages();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "पेज हटाने में त्रुटि");
    }
  };

  const openEditPageModal = (page: StaticPageItem) => {
    setActivePage(page);
    setPageFormData({
      slug: page.slug,
      title: page.title,
      hindiTitle: page.hindiTitle,
      contentMarkdown: page.contentMarkdown,
      metaDescription: page.metaDescription || "",
    });
    setShowEditPageModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <LayoutTemplate className="w-6 h-6 text-amber-500" />
            <span>डायनेमिक पेज एवं सेक्शन प्रबंधन (Page & Section Builder)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            बिना कोड बदले वेबसाइट के होमपेज सेक्शन, क्रम, दृश्यता एवं नए लैंडिंग पेजों का विन्यास करें
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "sections" ? (
            <>
              <button
                onClick={() => setShowAddSectionModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>नया सेक्शन जोड़ें</span>
              </button>
              <button
                onClick={handleSaveAllSections}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>सभी सेक्शन क्रम सेव करें</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setPageFormData({ slug: "", title: "", hindiTitle: "", contentMarkdown: "", metaDescription: "" });
                setShowAddPageModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>नया पेज बनाएं</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>होमपेज सेक्शन लेआउट और प्राथमिकताएं सफलतापूर्वक सहेज ली गईं!</span>
        </div>
      )}

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

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("sections")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "sections"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>होमपेज सेक्शन एवं क्रम ({sections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "pages"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>वेबसाइट पेज बिल्डर ({pages.length})</span>
        </button>
      </div>

      {/* TAB 1: Dynamic Sections Management */}
      {activeTab === "sections" && (
        <div className="space-y-3">
          {isSectionsLoading ? (
            <div className="p-12 text-center text-slate-400">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">सेक्शन लोड हो रहे हैं...</p>
            </div>
          ) : sections.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="font-semibold text-white">कोई सेक्शन कॉन्फ़िगर नहीं है</p>
            </div>
          ) : (
            sections.map((section, idx) => (
              <div
                key={section.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                  section.isEnabled
                    ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                    : "bg-slate-950/60 border-slate-900 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-0">
                  {/* Order Controls */}
                  <div className="flex flex-col gap-1 items-center justify-center p-1 bg-slate-950 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, "up")}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-20 rounded hover:bg-slate-800 transition-colors"
                      title="ऊपर ले जाएं"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {section.displayOrder}
                    </span>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveSection(idx, "down")}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-20 rounded hover:bg-slate-800 transition-colors"
                      title="नीचे ले जाएं"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Section Title & Type */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateTitle(idx, e.target.value)}
                        className="font-bold text-sm bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-500 focus:outline-none text-white py-0.5 px-1 rounded transition-colors"
                      />
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {SECTION_TYPE_LABELS[section.sectionType] || section.sectionType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>ID: <code className="font-mono text-slate-500">{section.id}</code></span>
                      {Boolean(section.config?.limit) && (
                        <span>सीमा: <strong className="text-white">{String(section.config?.limit)}</strong> लेख</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => toggleSection(idx)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      section.isEnabled
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                    }`}
                  >
                    {section.isEnabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>सक्रिय (Live)</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>छिपा हुआ (Hidden)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteSection(section)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="सेक्शन हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: Dynamic Page Builder */}
      {activeTab === "pages" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {isPagesLoading ? (
            <div className="p-12 text-center text-slate-400">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">पेज लोड हो रहे हैं...</p>
            </div>
          ) : pages.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FileCode className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="font-semibold text-white">कोई पेज नहीं मिला</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">पेज शीर्षक (Hindi Title)</th>
                    <th className="p-4 font-semibold">URL पथ (Slug)</th>
                    <th className="p-4 font-semibold">अंतिम अद्यतन</th>
                    <th className="p-4 font-semibold text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {pages.map((p) => (
                    <tr key={p.slug} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-white text-sm">{p.hindiTitle || p.title}</p>
                        <p className="text-xs text-slate-400">{p.title}</p>
                      </td>

                      <td className="p-4 font-mono text-xs text-amber-400">
                        <a
                          href={`/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <span>/{p.slug}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      <td className="p-4 text-xs text-slate-400">
                        {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("hi-IN") : "-"}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditPageModal(p)}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                            title="पेज संपादित करें"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePage(p)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                            title="पेज हटाएं"
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
      )}

      {/* Modal: Add Section */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">नया होमपेज सेक्शन जोड़ें</h2>
            <p className="text-xs text-slate-400 mb-6">वेबसाइट लेआउट में नया डायनेमिक सेक्शन शामिल करें</p>

            <form onSubmit={handleCreateSection} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सेक्शन का शीर्षक *</label>
                <input
                  type="text"
                  required
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  placeholder="उदा. संपादकीय ख़ास रपट"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सेक्शन का प्रकार (Component Type) *</label>
                <select
                  value={newSection.sectionType}
                  onChange={(e) => setNewSection({ ...newSection, sectionType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="category">विशिष्ट श्रेणी समाचार (Category News)</option>
                  <option value="hero">मुख्य समाचार ग्रिड (Hero Lead Grid)</option>
                  <option value="latest">ताज़ा ख़बरें स्ट्रीम (Latest News Stream)</option>
                  <option value="videos">वीडियो बुलेटिन (Video Bulletin)</option>
                  <option value="photos">फोटो स्टोरीज़ गैलरी (Photo Gallery)</option>
                  <option value="opinion">संपादकीय एवं विचार (Opinion Section)</option>
                  <option value="ad_banner">विज्ञापन स्थान (Ad Placement Banner)</option>
                </select>
              </div>

              {newSection.sectionType === "category" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">श्रेणी स्लग (Category Slug)</label>
                  <input
                    type="text"
                    value={newSection.category}
                    onChange={(e) => setNewSection({ ...newSection, category: e.target.value })}
                    placeholder="national, politics, business, etc."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">आर्टिकल्स की संख्या (Limit)</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={newSection.limit}
                  onChange={(e) => setNewSection({ ...newSection, limit: parseInt(e.target.value, 10) || 6 })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddSectionModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                >
                  सेक्शन जोड़ें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Static Page */}
      {(showAddPageModal || showEditPageModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-1">
              {showAddPageModal ? "नया वेबसाइट पेज बनाएं" : "पेज सामग्री संपादित करें"}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              लैंडिंग पेज, नीतियां, संस्थागत विवरण अथवा विशेष अभियान पेज तैयार करें
            </p>

            <form onSubmit={showAddPageModal ? handleCreatePage : handleUpdatePage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">हिंदी शीर्षक *</label>
                  <input
                    type="text"
                    required
                    value={pageFormData.hindiTitle}
                    onChange={(e) => setPageFormData({ ...pageFormData, hindiTitle: e.target.value })}
                    placeholder="उदा. हमारे बारे में"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">अंग्रेजी शीर्षक *</label>
                  <input
                    type="text"
                    required
                    value={pageFormData.title}
                    onChange={(e) => setPageFormData({ ...pageFormData, title: e.target.value })}
                    placeholder="About Us"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL स्लग (Slug Path) *</label>
                <input
                  type="text"
                  required
                  disabled={showEditPageModal}
                  value={pageFormData.slug}
                  onChange={(e) => setPageFormData({ ...pageFormData, slug: e.target.value })}
                  placeholder="about-us or terms-and-conditions"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मेटा विवरण (SEO Description)</label>
                <textarea
                  rows={2}
                  value={pageFormData.metaDescription}
                  onChange={(e) => setPageFormData({ ...pageFormData, metaDescription: e.target.value })}
                  placeholder="सर्च इंजन और सोशल शेयरिंग में दिखने वाला विवरण..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">पेज सामग्री (Markdown / Text) *</label>
                <textarea
                  required
                  rows={10}
                  value={pageFormData.contentMarkdown}
                  onChange={(e) => setPageFormData({ ...pageFormData, contentMarkdown: e.target.value })}
                  placeholder="पेज की विस्तृत सामग्री दर्ज करें... हेडिंग हेतु ##, सूचियों हेतु -, और पैराग्राफ का उपयोग करें।"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPageModal(false);
                    setShowEditPageModal(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                >
                  {showAddPageModal ? "पेज प्रकाशित करें" : "परिवर्तन सहेजें"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
