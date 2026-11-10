"use client";

import React, { useState } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  Code,
  Eye,
  Maximize2,
  X,
  FileText,
} from "lucide-react";
import Image from "next/image";

interface RichArticleEditorProps {
  content: string;
  onChange: (newContent: string) => void;
  title?: string;
  excerpt?: string;
  featuredImage?: string;
  imageCaption?: string;
  imageCredit?: string;
  categoryName?: string;
  authorName?: string;
}

export function RichArticleEditor({
  content,
  onChange,
  title,
  excerpt,
  featuredImage,
  imageCaption,
  imageCredit,
  categoryName,
  authorName,
}: RichArticleEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [embedModalType, setEmbedModalType] = useState<"image" | "youtube" | "link" | "table" | null>(null);

  // Embed inputs
  const [imageUrl, setImageUrl] = useState("");
  const [imageCap, setImageCap] = useState("");
  const [imageAlign, setImageAlign] = useState("center");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("article-main-textarea") as HTMLTextAreaElement | null;
    if (!textarea) {
      onChange(content + before + after);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = before + (selected || " ") + after;
    const updated = content.substring(0, start) + replacement + content.substring(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 1));
    }, 10);
  };

  const handleInsertImage = () => {
    if (!imageUrl) return;
    const imgMarkdown = `\n\n![${imageCap || "इमेज"}](${imageUrl})\n*${imageCap || ""}* [align: ${imageAlign}]\n\n`;
    insertText(imgMarkdown);
    setImageUrl("");
    setImageCap("");
    setEmbedModalType(null);
  };

  const handleInsertYouTube = () => {
    if (!youtubeUrl) return;
    let videoId = youtubeUrl;
    if (youtubeUrl.includes("v=")) {
      videoId = youtubeUrl.split("v=")[1]?.split("&")[0] || youtubeUrl;
    } else if (youtubeUrl.includes("youtu.be/")) {
      videoId = youtubeUrl.split("youtu.be/")[1]?.split("?")[0] || youtubeUrl;
    }
    const ytBlock = `\n\n[youtube:${videoId}]\n\n`;
    insertText(ytBlock);
    setYoutubeUrl("");
    setEmbedModalType(null);
  };

  const handleInsertLink = () => {
    if (!linkUrl) return;
    const linkMd = `[${linkText || linkUrl}](${linkUrl})`;
    insertText(linkMd);
    setLinkUrl("");
    setLinkText("");
    setEmbedModalType(null);
  };

  const handleInsertTable = () => {
    const tableMd = `\n\n| क्रम | विवरण | आंकड़े |\n| :--- | :--- | :--- |\n| 1 | प्रथम बिंदु | डेटा 1 |\n| 2 | द्वितीय बिंदु | डेटा 2 |\n\n`;
    insertText(tableMd);
    setEmbedModalType(null);
  };

  // Stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTimeEst = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Editor Toolbar */}
      <div className="bg-slate-950/80 border-b border-slate-800 p-2.5 flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertText("## ", "")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="मुख्य हेडिंग (H2)"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("### ", "")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="उप-शीर्षक (H3)"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("#### ", "")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="लघु हेडिंग (H4)"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-800 mx-1" />

          <button
            type="button"
            onClick={() => insertText("**", "**")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-bold"
            title="बोल्ड (Bold)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors italic"
            title="इटैलिक (Italic)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("> ", "")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="उद्धरण (Blockquote)"
          >
            <Quote className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-800 mx-1" />

          <button
            type="button"
            onClick={() => insertText("\n- ", "")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="बुलेट सूची (Bullet List)"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n1. ", "")}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="क्रमांकित सूची (Numbered List)"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-800 mx-1" />

          <button
            type="button"
            onClick={() => setEmbedModalType("image")}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="इमेज एम्बेड करें (Embed Image)"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setEmbedModalType("youtube")}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="यूट्यूब वीडियो एम्बेड करें (YouTube Embed)"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setEmbedModalType("link")}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="हाइपरलिंक जोड़ें (Hyperlink)"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertTable}
            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="डेटा टेबल (Table)"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Stats & Preview Toggle */}
        <div className="flex items-center gap-3 pr-2">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            {wordCount} शब्द • लगभग {readTimeEst} मिनट पठन
          </span>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>लाइव पूर्वावलोकन (Preview)</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 bg-slate-950">
        <textarea
          id="article-main-textarea"
          required
          rows={18}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="समाचार सामग्री, पृष्ठभूमि, महत्वपूर्ण तथ्य, उद्धरण और पैराग्राफ यहाँ लिखें... टूलबार से हेडिंग, तस्वीरें और वीडियो एम्बेड कर सकते हैं।"
          className="w-full bg-transparent border-0 text-slate-100 placeholder-slate-600 text-sm md:text-base leading-relaxed focus:outline-none resize-y font-sans min-h-[350px]"
        />
      </div>

      {/* Modals for Embeds */}
      {embedModalType === "image" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 rounded-2xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">इमेज एम्बेड करें (Embed Image)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">इमेज URL *</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">कैप्शन (Caption)</label>
                <input
                  type="text"
                  value={imageCap}
                  onChange={(e) => setImageCap(e.target.value)}
                  placeholder="तस्वीर का संक्षिप्त विवरण"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">अलाइनमेंट</label>
                <select
                  value={imageAlign}
                  onChange={(e) => setImageAlign(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                >
                  <option value="center">मध्य (Center)</option>
                  <option value="left">बायाँ (Left)</option>
                  <option value="right">दायाँ (Right)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEmbedModalType(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={handleInsertImage}
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  इमेज जोड़ें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {embedModalType === "youtube" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 rounded-2xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">यूट्यूब वीडियो एम्बेड करें (Embed Video)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Video Link *</label>
                <input
                  type="url"
                  required
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEmbedModalType(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={handleInsertYouTube}
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  वीडियो एम्बेड करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {embedModalType === "link" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 rounded-2xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">हाइपरलिंक जोड़ें (Insert Link)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">लिंक टेक्स्ट (Anchor Text)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="लिंक का शीर्षक"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">गंतव्य URL *</label>
                <input
                  type="url"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEmbedModalType(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={handleInsertLink}
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  लिंक जोड़ें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-white text-[#20242C] max-w-3xl w-full h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Bar */}
            <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">लाइव रीडर पूर्वावलोकन (Reader Preview)</span>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Document View */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 font-sans">
              {/* Category & Tagline */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#E01F26] text-white font-bold text-xs rounded">
                  {categoryName || "देश"}
                </span>
                <span className="text-xs text-gray-500 font-medium">द कन्क्लूसिव इंडियन एक्सक्लूसिव</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {title || "समाचार का मुख्य शीर्षक यहाँ प्रदर्शित होगा"}
              </h1>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed border-l-4 border-amber-500 pl-4">
                  {excerpt}
                </p>
              )}

              {/* Author & Timestamp Bar */}
              <div className="flex items-center gap-3 py-3 border-y border-gray-200 text-xs text-gray-600">
                <span className="font-bold text-gray-900">{authorName || "संवाददाता"}</span>
                <span>•</span>
                <span>अभी-अभी</span>
                <span>•</span>
                <span>{readTimeEst} मिनट पठन</span>
              </div>

              {/* Featured Image */}
              {featuredImage && (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={featuredImage}
                    alt={title || "Featured"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {(imageCaption || imageCredit) && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white p-2 text-xs flex justify-between">
                      <span>{imageCaption}</span>
                      <span className="text-gray-400">{imageCredit}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Rendered Content Text */}
              <div className="prose prose-slate max-w-none text-gray-800 leading-relaxed space-y-4">
                {content ? (
                  content.split("\n\n").map((para, idx) => {
                    if (para.startsWith("## ")) {
                      return <h2 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-2">{para.replace("## ", "")}</h2>;
                    }
                    if (para.startsWith("### ")) {
                      return <h3 key={idx} className="text-lg font-bold text-gray-900 mt-4 mb-2">{para.replace("### ", "")}</h3>;
                    }
                    if (para.startsWith("> ")) {
                      return (
                        <blockquote key={idx} className="border-l-4 border-amber-500 pl-4 italic text-gray-700 my-4 bg-amber-50/50 p-2 rounded-r">
                          {para.replace("> ", "")}
                        </blockquote>
                      );
                    }
                    if (para.startsWith("[youtube:")) {
                      const ytid = para.replace("[youtube:", "").replace("]", "").trim();
                      return (
                        <div key={idx} className="aspect-video w-full my-4 rounded-xl overflow-hidden shadow">
                          <iframe
                            src={`https://www.youtube.com/embed/${ytid}`}
                            className="w-full h-full border-0"
                            allowFullScreen
                          />
                        </div>
                      );
                    }
                    return <p key={idx} className="text-base text-gray-800 leading-relaxed">{para}</p>;
                  })
                ) : (
                  <p className="text-gray-400 italic">सामग्री अभी रिक्त है...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
