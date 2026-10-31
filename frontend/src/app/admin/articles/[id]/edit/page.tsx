"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { adminService } from "@/services/adminService";
import Image from "next/image";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

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
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            tags_text: (current.tags || []).map((t) => (typeof t === "string" ? t : t.name)).join(", "),
            status: current.status || "published",
            is_breaking: current.isBreaking || current.is_breaking || false,
            is_featured: current.isFeatured || current.is_featured || false,
            is_trending: current.isTrending || current.is_trending || false,
          });
        }
      } catch (err) {
        console.error("Failed to load article:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (articleId) {
      loadData();
    }
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const tags = formData.tags_text
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload = {
        title: formData.title.trim(),
        english_title: formData.english_title.trim() || undefined,
        slug: formData.slug.trim(),
        category_slug: formData.category_slug,
        category_name: formData.category_name,
        author_slug: formData.author_slug,
        author_name: formData.author_name,
        author_role: formData.author_role,
        featured_image: formData.featured_image.trim(),
        image_alt: formData.image_alt.trim() || formData.title.trim(),
        image_caption: formData.image_caption.trim() || undefined,
        image_credit: formData.image_credit.trim() || undefined,
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        tags,
        status: formData.status,
        is_breaking: formData.is_breaking,
        is_featured: formData.is_featured,
        is_trending: formData.is_trending,
      };

      await adminService.updateArticle(articleId, payload);
      router.push("/admin/articles");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "अपडेट करने में त्रुटि");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm">समाचार डेटा लोड हो रहा है...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white">समाचार संपादित करें (Edit Article)</h1>
            <p className="text-xs text-slate-400">आईडी: {articleId}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  मुख्य शीर्षक (Hindi Headline) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  यूआरएल स्लग (URL Slug) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

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

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                विस्तृत सामग्री (Content) *
              </label>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                प्रकाशन सेटिंग्स (Publishing)
              </h2>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">स्थिति (Status)</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="published">प्रकाशित (Published)</option>
                  <option value="draft">ड्राफ्ट (Draft)</option>
                  <option value="review">समीक्षाधीन (Review)</option>
                  <option value="scheduled">शेड्यूल (Scheduled)</option>
                  <option value="archived">आर्काइव (Archived)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_breaking}
                    onChange={(e) => setFormData({ ...formData, is_breaking: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500"
                  />
                  <span>ब्रेकिंग न्यूज़ टिकर</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500"
                  />
                  <span>होमपेज लीड स्टोरी</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_trending}
                    onChange={(e) => setFormData({ ...formData, is_trending: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500"
                  />
                  <span>ट्रेंडिंग सेक्शन</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 text-sm"
              >
                {isSubmitting ? (
                  <span>सहेजा जा रहा है...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>परिवर्तन सुरक्षित करें</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                टैक्सोनॉमी
              </h2>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">श्रेणी</label>
                <select
                  value={formData.category_slug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const cat = categories.find((c) => c.slug === slug);
                    setFormData({
                      ...formData,
                      category_slug: slug,
                      category_name: cat ? cat.name : "देश",
                    });
                  }}
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
                <label className="block text-xs text-slate-400 mb-1 font-medium">टैग</label>
                <input
                  type="text"
                  value={formData.tags_text}
                  onChange={(e) => setFormData({ ...formData, tags_text: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                इमेज यूआरएल
              </h2>
              <input
                type="url"
                required
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
