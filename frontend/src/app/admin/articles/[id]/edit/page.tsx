"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { adminService } from "@/services/adminService";
import { RichArticleEditor } from "@/components/admin/RichArticleEditor";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Sparkles,
  AlertCircle,
  Globe,
  Share2,
  FileCheck,
  Calendar,
  ExternalLink,
} from "lucide-react";

interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  englishName?: string;
}

interface ArticleRecord {
  id: string;
  title?: string;
  englishTitle?: string;
  slug?: string;
  category?: { slug?: string; name?: string };
  author?: { slug?: string; name?: string; role?: string };
  featuredImage?: string;
  featured_image?: string;
  imageAlt?: string;
  image_alt?: string;
  imageCaption?: string;
  image_caption?: string;
  imageCredit?: string;
  image_credit?: string;
  excerpt?: string;
  content?: string;
  tags?: Array<{ name: string } | string>;
  status?: string;
  isBreaking?: boolean;
  is_breaking?: boolean;
  isFeatured?: boolean;
  is_featured?: boolean;
  isTrending?: boolean;
  is_trending?: boolean;
  editorialNotes?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  scheduledAt?: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalSlug, setOriginalSlug] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    english_title: "",
    slug: "",
    category_slug: "national",
    category_name: "देश",
    author_slug: "raghavendra-shukla",
    author_name: "राघवेंद्र शुक्ल",
    author_role: "विशेष संवाददाता (पर्यावरण)",
    featured_image: "",
    image_alt: "",
    image_caption: "",
    image_credit: "द कन्क्लूसिव इंडियन",
    excerpt: "",
    content: "",
    tags_text: "",
    status: "published",
    is_breaking: false,
    is_featured: false,
    is_trending: false,
    scheduled_at: "",
    // Editorial & SEO
    editorial_notes: "",
    seo_title: "",
    meta_description: "",
    focus_keyword: "",
    canonical_url: "",
    og_image: "",
    no_index: false,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, artsRes] = await Promise.all([
          adminService.getCategories(),
          adminService.getArticles({ limit: 100 }),
        ]);
        setCategories(cats);

        const current = (artsRes.data as ArticleRecord[] || []).find((a) => a.id === articleId);
        if (current) {
          setOriginalSlug(current.slug || "");
          const tagString = Array.isArray(current.tags)
            ? current.tags
                .map((t) => (typeof t === "object" && t ? t.name : t))
                .join(", ")
            : "";

          setFormData({
            title: current.title || "",
            english_title: current.englishTitle || "",
            slug: current.slug || "",
            category_slug: current.category?.slug || "national",
            category_name: current.category?.name || "देश",
            author_slug: current.author?.slug || "raghavendra-shukla",
            author_name: current.author?.name || "राघवेंद्र शुक्ल",
            author_role: current.author?.role || "",
            featured_image: current.featuredImage || current.featured_image || "",
            image_alt: current.imageAlt || current.image_alt || "",
            image_caption: current.imageCaption || current.image_caption || "",
            image_credit: current.imageCredit || current.image_credit || "द कन्क्लूसिव इंडियन",
            excerpt: current.excerpt || "",
            content: current.content || "",
            tags_text: tagString,
            status: current.status || "published",
            is_breaking: current.isBreaking || current.is_breaking || false,
            is_featured: current.isFeatured || current.is_featured || false,
            is_trending: current.isTrending || current.is_trending || false,
            scheduled_at: current.scheduledAt ? current.scheduledAt.slice(0, 16) : "",
            editorial_notes: current.editorialNotes || "",
            seo_title: current.seoTitle || "",
            meta_description: current.metaDescription || "",
            focus_keyword: current.focusKeyword || "",
            canonical_url: current.canonicalUrl || "",
            og_image: current.ogImage || "",
            no_index: Boolean(current.noIndex),
          });
        }
      } catch (err) {
        console.error("Error loading article data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [articleId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const cat = categories.find((c) => c.slug === slug);
    setFormData((prev) => ({
      ...prev,
      category_slug: slug,
      category_name: cat ? cat.name : "देश",
    }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const clean = formData.title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s\u0900-\u097F-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);
    setFormData((prev) => ({ ...prev, slug: clean || `story-${Date.now()}` }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const tags = formData.tags_text
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const newSlug = formData.slug.trim() || `story-${Date.now()}`;

      // Check if published URL modified -> create automatic 301 redirect
      if (originalSlug && newSlug !== originalSlug) {
        try {
          await adminService.createRedirect(`/news/${originalSlug}`, `/news/${newSlug}`, 301);
        } catch {
          // Continue if redirect fails
        }
      }

      const payload = {
        title: formData.title.trim(),
        english_title: formData.english_title.trim() || undefined,
        slug: newSlug,
        category_slug: formData.category_slug,
        category_name: formData.category_name,
        author_slug: formData.author_slug,
        author_name: formData.author_name,
        author_role: formData.author_role,
        featured_image: formData.featured_image.trim(),
        image_alt: formData.image_alt.trim() || formData.title.trim(),
        image_caption: formData.image_caption.trim() || undefined,
        image_credit: formData.image_credit.trim() || "द कन्क्लूसिव इंडियन",
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        tags: tags,
        status: formData.status,
        is_breaking: formData.is_breaking,
        is_featured: formData.is_featured,
        is_trending: formData.is_trending,
        scheduled_at: formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : undefined,
        editorial_notes: formData.editorial_notes.trim() || undefined,
        seo_title: formData.seo_title.trim() || undefined,
        meta_description: formData.meta_description.trim() || undefined,
        focus_keyword: formData.focus_keyword.trim() || undefined,
        canonical_url: formData.canonical_url.trim() || undefined,
        og_image: formData.og_image.trim() || undefined,
        no_index: formData.no_index,
      };

      await adminService.updateArticle(articleId, payload);
      router.push("/admin/articles");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "समाचार अपडेट करने में त्रुटि हुई");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>समाचार सूची पर वापस जाएं</span>
        </Link>
        {formData.slug && (
          <Link
            href={`/news/${formData.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline"
          >
            <span>लाइव आर्टिकल देखें</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">समाचार आलेख संपादित करें</h1>
        <p className="text-xs text-slate-400 mt-1">
          ID: <code className="font-mono text-amber-400">{articleId}</code>
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editing Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  मुख्य समाचार शीर्षक (Headline) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  अंग्रेजी शीर्षक (English Headline)
                </label>
                <input
                  type="text"
                  value={formData.english_title}
                  onChange={(e) => setFormData({ ...formData, english_title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    कस्टम URL स्लग (Slug) *
                  </label>
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>शीर्षक से नया स्लग बनाएं</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {originalSlug && formData.slug !== originalSlug && (
                  <p className="text-[11px] text-amber-400 mt-1">
                    सूचना: स्लग बदलने पर पुराने URL <code>/news/{originalSlug}</code> से नए URL पर स्वतः 301 रीडायरेक्ट सक्रिय हो जाएगा।
                  </p>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                समाचार सारांश / इंट्रो (Excerpt) *
              </label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Rich Editor */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                विस्तृत समाचार सामग्री (Rich Article Content) *
              </label>
              <RichArticleEditor
                content={formData.content}
                onChange={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))}
                title={formData.title}
                excerpt={formData.excerpt}
                featuredImage={formData.featured_image}
                imageCaption={formData.image_caption}
                imageCredit={formData.image_credit}
                categoryName={formData.category_name}
                authorName={formData.author_name}
              />
            </div>

            {/* SEO & Meta */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Globe className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  सर्च इंजन एवं सोशल अनुकूलन (SEO & Meta Settings)
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="font-semibold text-slate-300">SEO शीर्षक (SEO Title)</label>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {formData.seo_title.length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    placeholder={formData.title}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="font-semibold text-slate-300">मेटा विवरण (Meta Description)</label>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {formData.meta_description.length}/160
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder={formData.excerpt}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      फोकस कीवर्ड (Focus Keyword)
                    </label>
                    <input
                      type="text"
                      value={formData.focus_keyword}
                      onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      कैनोनिकल URL (Canonical URL Override)
                    </label>
                    <input
                      type="url"
                      value={formData.canonical_url}
                      onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    सोशल शेयरिंग इमेज (Open Graph Image Override)
                  </label>
                  <input
                    type="url"
                    value={formData.og_image}
                    onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="noIndexEditCheck"
                    checked={formData.no_index}
                    onChange={(e) => setFormData({ ...formData, no_index: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="noIndexEditCheck" className="text-xs text-slate-400 select-none">
                    इस समाचार को सर्च इंजन से छिपाएं (No-Index Robots)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Publish Action Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                प्रकाशन एवं संपादकीय कार्यप्रवाह
              </h2>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">कार्यप्रवाह स्थिति (Status)</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="published">लाइव प्रकाशित (Published)</option>
                  <option value="draft">ड्राफ्ट (Draft)</option>
                  <option value="review">संपादकीय समीक्षाधीन (Under Review)</option>
                  <option value="approved">अनुमोदित (Approved)</option>
                  <option value="scheduled">निर्धारित समय पर शेड्यूल (Scheduled)</option>
                  <option value="archived">संग्रहीत (Archived)</option>
                </select>
              </div>

              {formData.status === "scheduled" && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">
                    प्रकाशन तिथि व समय *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">
                  संपादकीय टिप्पणियां (Editorial Notes / Feedback)
                </label>
                <textarea
                  rows={2}
                  value={formData.editorial_notes}
                  onChange={(e) => setFormData({ ...formData, editorial_notes: e.target.value })}
                  placeholder="संपादकीय डेस्क हेतु आंतरिक निर्देश अथवा टिप्पणी..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_breaking}
                    onChange={(e) => setFormData({ ...formData, is_breaking: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>ब्रेकिंग न्यूज़ टिकर में दिखाएं</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>होमपेज लीड/फीचर्ड स्टोरी बनाएं</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_trending}
                    onChange={(e) => setFormData({ ...formData, is_trending: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <span>ट्रेंडिंग सेक्शन में शामिल करें</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 focus:outline-none shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 text-sm"
              >
                {isSubmitting ? (
                  <span>सहेजा जा रहा है...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>परिवर्तन सहेजें एवं लागू करें</span>
                  </>
                )}
              </button>
            </div>

            {/* Category & Author Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                टैक्सोनॉमी एवं लेखक
              </h2>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">समाचार श्रेणी *</label>
                <select
                  value={formData.category_slug}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.englishName || c.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">संवाददाता / लेखक</label>
                <select
                  value={formData.author_slug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    let name = "राघवेंद्र शुक्ल";
                    let role = "विशेष संवाददाता";
                    if (slug === "meenakshi-joshi") {
                      name = "मीनाक्षी जोशी";
                      role = "वरिष्ठ राजनीतिक विश्लेषक";
                    } else if (slug === "vikram-singh") {
                      name = "विक्रम सिंह";
                      role = "सामरिक विशेषज्ञ";
                    } else if (slug === "priya-sharma") {
                      name = "प्रिया शर्मा";
                      role = "कृषि संपादक";
                    }
                    setFormData({
                      ...formData,
                      author_slug: slug,
                      author_name: name,
                      author_role: role,
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="raghavendra-shukla">राघवेंद्र शुक्ल (पर्यावरण)</option>
                  <option value="meenakshi-joshi">मीनाक्षी जोशी (राजनीति)</option>
                  <option value="vikram-singh">विक्रम सिंह (रक्षा व सामरिक)</option>
                  <option value="priya-sharma">प्रिया शर्मा (कृषि व अर्थव्यवस्था)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">टैग (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.tags_text}
                  onChange={(e) => setFormData({ ...formData, tags_text: e.target.value })}
                  placeholder="चंबल, पर्यावरण, संरक्षण"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                फ़ीचर्ड इमेज (Featured Media)
              </h2>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">इमेज यूआरएल *</label>
                <input
                  type="url"
                  required
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              {formData.featured_image && (
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-950 relative">
                  <Image
                    src={formData.featured_image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">इमेज ऑल्ट टेक्स्ट</label>
                <input
                  type="text"
                  value={formData.image_alt}
                  onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">फ़ोटो कैप्शन</label>
                <input
                  type="text"
                  value={formData.image_caption}
                  onChange={(e) => setFormData({ ...formData, image_caption: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">फ़ोटो क्रेडिट</label>
                <input
                  type="text"
                  value={formData.image_credit}
                  onChange={(e) => setFormData({ ...formData, image_credit: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
