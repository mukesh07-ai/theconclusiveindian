"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import Image from "next/image";
import { UploadCloud, Copy, Check, Trash2 } from "lucide-react";

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [credit, setCredit] = useState("द कन्क्लूसिव इंडियन");

  const refreshMedia = async () => {
    try {
      const data = await adminService.getMedia();
      if (Array.isArray(data)) setMediaList(data);
    } catch (err) {
      console.error("Error loading media:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchMedia = async () => {
      try {
        const data = await adminService.getMedia();
        if (isMounted && Array.isArray(data)) {
          setMediaList(data);
        }
      } catch (err) {
        console.error("Error loading media:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchMedia();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

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
      alert(err instanceof Error ? err.message : "अपलोड करने में त्रुटि");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("क्या आप इस मीडिया फाइल को हटाना चाहते हैं?")) return;
    try {
      await adminService.deleteMedia(id);
      refreshMedia();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "हटाने में त्रुटि");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          मीडिया लाइब्रेरी (Media Asset Library)
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          समाचारों में प्रयुक्त होने वाली उच्च-गुणवत्ता छवियों, फ़ोटो क्रेडिट्स और मेटाडेटा का सुरक्षित भंडार
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-amber-500" />
          <span>नई छवि अपलोड करें (Upload Media Asset)</span>
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                इमेज फ़ाइल चुनें (JPEG, PNG, WebP) *
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 file:cursor-pointer cursor-pointer bg-slate-950 p-2 rounded-xl border border-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                फ़ोटो क्रेडिट (Photo Credit)
              </label>
              <input
                type="text"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                placeholder="द कन्क्लूसिव इंडियन / फोटोग्राफर"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                अल्ट टेक्स्ट (Alt Text)
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="छवि का वर्णनात्मक विवरण"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                कैप्शन (Caption)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="समाचार के नीचे दिखने वाला कैप्शन"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? "अपलोड हो रहा है..." : "सर्वर पर अपलोड करें"}</span>
          </button>
        </form>
      </div>

      {/* Media Assets Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-white mb-4">संग्रहीत मीडिया फाइल्स</h2>

        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">लोड हो रहा है...</div>
        ) : mediaList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            वर्तमान में कोई मीडिया फाइल अपलोड नहीं है।
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaList.map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group"
              >
                <div className="aspect-video bg-slate-900 overflow-hidden relative">
                  <Image
                    src={asset.publicUrl}
                    alt={asset.altText || asset.filename}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>

                <div className="p-3 space-y-2">
                  <p className="text-xs font-medium text-white truncate" title={asset.originalFilename}>
                    {asset.originalFilename}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {(asset.fileSizeBytes / 1024).toFixed(1)} KB • {asset.mimeType.split("/")[1]}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleCopy(asset.id, asset.publicUrl)}
                      className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">कॉपी हुआ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>URL कॉपी</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10"
                      title="हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
