"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
} from "lucide-react";

interface HomepageSectionItem {
  id: string;
  sectionType: string;
  name?: string;
  title?: string;
  description?: string;
  isEnabled: boolean;
  displayOrder: number;
  config?: Record<string, unknown>;
}

export default function AdminPageBuilderPage() {
  const [sections, setSections] = useState<HomepageSectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchSections = async () => {
      try {
        const data = await adminService.getHomepageSections();
        if (isMounted && Array.isArray(data)) {
          const sorted = (data as HomepageSectionItem[]).sort(
            (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
          );
          setSections(sorted);
        }
      } catch (err) {
        console.error("Error loading homepage sections:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchSections();
    return () => {
      isMounted = false;
    };
  }, []);

  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Update display orders
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

  const handleSaveAll = async () => {
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

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            होमपेज लेआउट बिल्डर (Homepage Layout & Sections)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            होमपेज के मुख्य घटकों का प्रदर्शन क्रम, दृश्यता और शीर्षकों का प्रबंधन
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <Save className="w-4 h-4" />
          <span>क्रम एवं लेआउट सुरक्षित करें</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>होमपेज लेआउट सफलतापूर्वक अपडेट हो गया है!</span>
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-sm">लेआउट लोड हो रहा है...</div>
        ) : (
          sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 rounded-2xl border transition-all ${
                sec.isEnabled
                  ? "bg-slate-900 border-slate-800 shadow-sm"
                  : "bg-slate-950/60 border-slate-800/40 opacity-60"
              } flex items-center justify-between gap-4`}
            >
              {/* Order Indicator */}
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                  #{sec.displayOrder}
                </span>

                <div>
                  <input
                    type="text"
                    value={sec.title || sec.name || ""}
                    onChange={(e) => updateTitle(idx, e.target.value)}
                    className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-500 text-white font-bold text-sm focus:outline-none px-1 py-0.5"
                  />
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    प्रकार: {sec.sectionType} • आईडी: {sec.id}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveSection(idx, "up")}
                  disabled={idx === 0}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-30"
                  title="ऊपर ले जाएं"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => moveSection(idx, "down")}
                  disabled={idx === sections.length - 1}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-30"
                  title="नीचे ले जाएं"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleSection(idx)}
                  className={`p-2 rounded-lg transition-colors ${
                    sec.isEnabled
                      ? "text-emerald-400 hover:bg-emerald-500/10"
                      : "text-slate-500 hover:bg-slate-800"
                  }`}
                  title={sec.isEnabled ? "छिपाएं" : "सक्रिय करें"}
                >
                  {sec.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
