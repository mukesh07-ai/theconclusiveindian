"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import Image from "next/image";
import {
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Search,
  Filter,
  Eye,
  FileText,
  Video,
  X,
  ExternalLink,
  Layers,
} from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  originalFilename: string;
  mimeType: string;
  fileSizeBytes: number;
  publicUrl: string;
  altText?: string;
  caption?: string;
  credit?: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  // Upload Form
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [credit, setCredit] = useState("द कन्क्लूसिव इंडियन");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const refreshMedia = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getMedia();
      if (Array.isArray(data)) setMediaList(data);
    } catch (err) {
      console.error("Error loading media:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshMedia();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploadError(null);

    // Validate size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadError("फ़ाइल का आकार 10MB से अधिक नहीं होना चाहिए।");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (altText) formData.append("alt_text", altText);
      if (caption) formData.append("caption", caption);
      if (credit) formData.append("credit", credit);

      await adminService.uploadMedia(formData);
      setSelectedFile(null);
      setAltText("");
      setCaption("");
      refreshMedia();
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "अपलोड करने में त्रुटि हुई");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`क्या आप निश्चित रूप से मीडिया फ़ाइल "${item.originalFilename || item.filename}" को हटाना चाहते हैं?`)) {
      return;
    }
    try {
      await adminService.deleteMedia(item.id);
      refreshMedia();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "हटाने में त्रुटि");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredMedia = mediaList.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.filename.toLowerCase().includes(q) ||
      m.originalFilename?.toLowerCase().includes(q) ||
      m.caption?.toLowerCase().includes(q) ||
      m.altText?.toLowerCase().includes(q);

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "image" && m.mimeType.startsWith("image/")) ||
      (typeFilter === "video" && m.mimeType.startsWith("video/")) ||
      (typeFilter === "document" && !m.mimeType.startsWith("image/") && !m.mimeType.startsWith("video/"));

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <UploadCloud className="w-6 h-6 text-amber-500" />
          <span>केंद्रीय डिजिटल मीडिया लाइब्रेरी (Media Library)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          वेबसाइट सामग्री, समाचार आलेखों और विज्ञापनों हेतु उच्च-रिज़ॉल्यूशन मीडिया फ़ाइलों का सुरक्षित प्रबंधन
        </p>
      </div>

      {/* Upload Zone Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          नई फ़ाइल अपलोड करें (Upload Media Asset)
        </h2>

        {uploadError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {uploadError}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-2xl p-6 text-center bg-slate-950/60 transition-colors">
            <input
              type="file"
              id="mediaFileInput"
              accept="image/jpeg,image/png,image/webp,image/avif,video/mp4"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label htmlFor="mediaFileInput" className="cursor-pointer flex flex-col items-center">
              <UploadCloud className="w-10 h-10 text-amber-400 mb-2" />
              <span className="text-sm font-bold text-white">
                {selectedFile ? selectedFile.name : "फ़ाइल चुनें अथवा यहाँ ड्रैग करें"}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                JPEG, PNG, WebP, AVIF, MP4 (अधिकतम 10MB)
              </span>
            </label>
          </div>

          {selectedFile && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ऑल्ट टेक्स्ट (Alt Text)</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="तस्वीर का संक्षिप्त विवरण"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">फ़ोटो कैप्शन</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="कैप्शन"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">क्रेडिट</label>
                <input
                  type="text"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  placeholder="द कन्क्लूसिव इंडियन"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>
          )}

          {selectedFile && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                {isUploading ? "अपलोड हो रहा है..." : "सर्वर पर सुरक्षित अपलोड करें"}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="फ़ाइल नाम, कैप्शन या ऑल्ट टेक्स्ट से खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">प्रकार फ़िल्टर:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">सभी मीडिया (All)</option>
            <option value="image">तस्वीरें (Images)</option>
            <option value="video">वीडियो (Videos)</option>
            <option value="document">दस्तावेज़ (Documents)</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">मीडिया लाइब्रेरी लोड हो रही है...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl">
          <Layers className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <p className="font-semibold text-white">कोई मीडिया फ़ाइल नहीं मिली</p>
          <p className="text-xs text-slate-500 mt-1">नई मीडिया फ़ाइल अपलोड करने हेतु ऊपर दिए गए बॉक्स का उपयोग करें।</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((m) => {
            const isImage = m.mimeType.startsWith("image/");
            return (
              <div
                key={m.id}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:border-slate-700 transition-all"
              >
                {/* Media Thumbnail */}
                <div className="aspect-square bg-slate-950 relative overflow-hidden">
                  {isImage ? (
                    <Image
                      src={m.publicUrl}
                      alt={m.altText || m.filename}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Video className="w-8 h-8" />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => setPreviewMedia(m)}
                      className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                      title="पूर्वावलोकन देखें"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(m.id, m.publicUrl)}
                      className="p-1.5 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 transition-colors"
                      title="URL कॉपी करें"
                    >
                      {copiedId === m.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(m)}
                      className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-900/50 transition-colors"
                      title="हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-2.5 text-xs flex-1 flex flex-col justify-between">
                  <p className="font-semibold text-white truncate text-[11px]" title={m.originalFilename || m.filename}>
                    {m.originalFilename || m.filename}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">
                    {formatFileSize(m.fileSizeBytes)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full p-6 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-3 truncate">
              {previewMedia.originalFilename || previewMedia.filename}
            </h3>

            <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
              <Image
                src={previewMedia.publicUrl}
                alt={previewMedia.altText || "Preview"}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <p><strong>URL:</strong> <code className="font-mono text-amber-400 break-all">{previewMedia.publicUrl}</code></p>
              {previewMedia.altText && <p><strong>Alt Text:</strong> {previewMedia.altText}</p>}
              {previewMedia.caption && <p><strong>Caption:</strong> {previewMedia.caption}</p>}
              {previewMedia.credit && <p><strong>Credit:</strong> {previewMedia.credit}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => handleCopy(previewMedia.id, previewMedia.publicUrl)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                {copiedId === previewMedia.id ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === previewMedia.id ? "कॉपी हो गया!" : "URL कॉपी करें"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
