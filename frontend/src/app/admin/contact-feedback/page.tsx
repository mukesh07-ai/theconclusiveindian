"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
interface FeedbackItem {
  id: string;
  ticketId?: string;
  ticket_id?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone?: string;
  submission_type?: string;
  category?: string;
  subject: string;
  message: string;
  article_url?: string;
  status: string;
  resolvedAt?: string;
  createdAt?: string;
  created_at?: string;
}

export default function AdminContactFeedbackPage() {
  const [submissions, setSubmissions] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const refreshFeedback = async () => {
    try {
      const data = await adminService.getFeedback(
        statusFilter === "all" ? undefined : statusFilter
      );
      if (Array.isArray(data)) setSubmissions(data);
    } catch (err) {
      console.error("Error loading feedback:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchFeedback = async () => {
      try {
        const data = await adminService.getFeedback(
          statusFilter === "all" ? undefined : statusFilter
        );
        if (isMounted && Array.isArray(data)) {
          setSubmissions(data);
        }
      } catch (err) {
        console.error("Error loading feedback:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchFeedback();
    return () => {
      isMounted = false;
    };
  }, [statusFilter]);

  const handleStatusUpdate = async (ticketId: string, newStatus: string) => {
    try {
      await adminService.updateFeedbackStatus(ticketId, newStatus);
      refreshFeedback();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "स्थिति बदलने में त्रुटि");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            शिकायत निवारण एवं पाठक फीडबैक (Grievances & Feedback)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            IT Rules 2021 के तहत प्राप्त औपचारिक शिकायतों, संपादकीय सुधारों एवं समाचार सुझावों की समीक्षा
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        {[
          { id: "all", label: "सभी (All)" },
          { id: "pending", label: "लंबित (Pending)" },
          { id: "under_review", label: "समीक्षाधीन (Under Review)" },
          { id: "resolved", label: "समाधानित (Resolved)" },
          { id: "dismissed", label: "खारिज (Dismissed)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === tab.id
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-sm">लोड हो रहा है...</div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500">
            इस श्रेणी में कोई शिकायत या संदेश उपलब्ध नहीं है।
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {sub.ticketId || sub.ticket_id}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {sub.fullName || sub.name} ({sub.email})
                  </span>
                  {sub.phone && (
                    <span className="text-xs text-slate-500 font-mono">{sub.phone}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {sub.createdAt || sub.created_at
                      ? new Date(sub.createdAt || sub.created_at || "").toLocaleDateString("hi-IN")
                      : "—"}
                  </span>
                  <select
                    value={sub.status}
                    onChange={(e) => handleStatusUpdate(sub.ticketId || sub.ticket_id || "", e.target.value)}
                    className="text-xs font-bold px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="pending">लंबित (Pending)</option>
                    <option value="under_review">समीक्षाधीन (Under Review)</option>
                    <option value="resolved">समाधानित (Resolved)</option>
                    <option value="dismissed">खारिज (Dismissed)</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1">{sub.subject}</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 font-sans">
                  {sub.message}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>श्रेणी: {sub.category}</span>
                {sub.resolvedAt && (
                  <span className="text-emerald-400">
                    समाधान तिथि: {new Date(sub.resolvedAt).toLocaleDateString("hi-IN")}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
