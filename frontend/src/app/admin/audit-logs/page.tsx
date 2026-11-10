"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import { History, Shield, Search, Clock, User, Filter, RefreshCw } from "lucide-react";

interface AuditLogItem {
  id: number;
  userId?: string;
  userEmail?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resourceFilter, setResourceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const resFilter = resourceFilter === "all" ? undefined : resourceFilter;
      const data = await adminService.getAuditLogs(resFilter, 100);
      if (Array.isArray(data)) {
        setLogs(data);
      }
    } catch (err: unknown) {
      console.error("Error loading audit logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [resourceFilter]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      (log.userEmail && log.userEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.action && log.action.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.resourceType && log.resourceType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-amber-500" />
            <span>सुरक्षा एवं संपादकीय ऑडिट लॉग (Audit Logs)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            संपादकीय और प्रशासनिक गतिविधियों, प्रकाशन, परिवर्तन एवं सुरक्षा घटनाओं का अपरिवर्तनीय इतिहास
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>रिफ्रेश करें</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ईमेल, एक्शन या संसाधन से खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">संसाधन फ़िल्टर:</label>
          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">सभी संसाधन (All Resources)</option>
            <option value="article">आर्टिकल्स (Article)</option>
            <option value="user">उपयोगकर्ता (User)</option>
            <option value="advertisement">विज्ञापन (Advertisement)</option>
            <option value="page">पेज व सेक्शन (Page)</option>
            <option value="category">श्रेणियां (Category)</option>
            <option value="auth">प्रमाणीकरण (Auth)</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">ऑडिट लॉग्स लोड हो रहे हैं...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Shield className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="font-semibold text-white">कोई ऑडिट रिकॉर्ड उपलब्ध नहीं है</p>
            <p className="text-xs text-slate-500 mt-1">नई संपादकीय एवं प्रशासनिक गतिविधियों का रिकॉर्ड यहाँ स्वतः दर्ज होगा।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">समय (Timestamp)</th>
                  <th className="p-4 font-semibold">उपयोगकर्ता (Author/Admin)</th>
                  <th className="p-4 font-semibold">कार्रवाई (Action)</th>
                  <th className="p-4 font-semibold">संसाधन (Resource)</th>
                  <th className="p-4 font-semibold">IP पता</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-xs text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{new Date(log.createdAt).toLocaleString("hi-IN")}</span>
                      </div>
                    </td>

                    <td className="p-4 text-xs">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-medium text-white">{log.userEmail || "System"}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 text-xs text-slate-300">
                      <span className="font-semibold text-white uppercase text-[11px] mr-1.5">{log.resourceType}:</span>
                      <span className="font-mono text-slate-400">{log.resourceId || "-"}</span>
                    </td>

                    <td className="p-4 text-xs font-mono text-slate-400">
                      {log.ipAddress || "127.0.0.1"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
