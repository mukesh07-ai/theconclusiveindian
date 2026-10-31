"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import { PlusCircle, Trash2, CheckCircle2 } from "lucide-react";

interface AdminCategoryItem {
  id?: string;
  name: string;
  englishName?: string;
  english_name?: string;
  slug: string;
  description?: string;
  color?: string;
  order?: number;
  is_active?: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCat, setNewCat] = useState({
    name: "",
    english_name: "",
    slug: "",
    description: "",
    color: "#1E3A8A",
    order: 1,
  });

  const refreshCategories = async () => {
    try {
      const data = await adminService.getCategories();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      try {
        const data = await adminService.getCategories();
        if (isMounted && Array.isArray(data)) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchCats();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.createCategory({
        name: newCat.name.trim(),
        english_name: newCat.english_name.trim(),
        slug: newCat.slug.trim().toLowerCase(),
        description: newCat.description.trim() || undefined,
        color: newCat.color,
        order: Number(newCat.order),
      });
      setShowAddModal(false);
      setNewCat({
        name: "",
        english_name: "",
        slug: "",
        description: "",
        color: "#1E3A8A",
        order: categories.length + 1,
      });
      refreshCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "श्रेणी बनाने में त्रुटि हुई");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`क्या आप "${name}" श्रेणी को हटाना चाहते हैं?`)) return;
    try {
      await adminService.deleteCategory(id);
      refreshCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "हटाने में त्रुटि");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            श्रेणी एवं टैक्सोनॉमी प्रबंधन (Categories & Taxonomy)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            पोर्टल की 12 मुख्य राष्ट्रीय समाचार श्रेणियों और रंगों का प्रबंधन
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>नई श्रेणी जोड़ें</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            <div className="inline-block w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-xs">श्रेणियां लोड हो रही हैं...</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: cat.color || "#1E3A8A" }}
              />

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    क्रम: #{cat.order || 0}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    /{cat.slug}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <span className="text-xs text-slate-400">({cat.englishName || cat.english_name || cat.slug})</span>
                </div>

                {cat.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>सक्रिय (Active)</span>
                </div>
                <button
                  onClick={() => handleDelete(cat.id || cat.slug, cat.name)}
                  className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">नई समाचार श्रेणी जोड़ें</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  हिंदी नाम (Hindi Name) *
                </label>
                <input
                  type="text"
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="उदा. विज्ञान"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  अंग्रेजी नाम (English Name) *
                </label>
                <input
                  type="text"
                  required
                  value={newCat.english_name}
                  onChange={(e) => setNewCat({ ...newCat, english_name: e.target.value })}
                  placeholder="Science"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  स्लग (URL Slug) *
                </label>
                <input
                  type="text"
                  required
                  value={newCat.slug}
                  onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                  placeholder="science"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  थीम रंग कोड (Color HEX)
                </label>
                <input
                  type="text"
                  value={newCat.color}
                  onChange={(e) => setNewCat({ ...newCat, color: e.target.value })}
                  placeholder="#1E3A8A"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  विवरण (Description)
                </label>
                <textarea
                  rows={2}
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors"
                >
                  श्रेणी सुरक्षित करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
