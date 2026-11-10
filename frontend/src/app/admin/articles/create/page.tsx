"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminService } from "@/services/adminService";
import { RichArticleEditor } from "@/components/admin/RichArticleEditor";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Sparkles,
  AlertCircle,
  Search,
  Globe,
  Share2,
  FileCheck,
  Calendar,
} from "lucide-react";

interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  englishName?: string;
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
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
    featured_image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
    image_alt: "",
    image_caption: "",
    image_credit: "द कन्क्लूसिव इंडियन",
    excerpt: "",
    content: "",
    tags_text: "देश,राष्ट्रीय,ताज़ा ख़बर",
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
    adminService
      .getCategories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category_slug: cats[0].slug,
            category_name: cats[0].name,
          }));
        }
      })
      .catch(() => {});
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      slug: clean || `story-${Date.now()}`,
      seo_title: prev.seo_title || prev.title,
      meta_description: prev.meta_description || prev.excerpt,
    }));
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

      const payload = {
        title: formData.title.trim(),
        english_title: formData.english_title.trim() || undefined,
        slug: formData.slug.trim() || `story-${Date.now()}`,
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

      await adminService.createArticle(payload);
      router.push("/admin/articles");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "समाचार प्रकाशित करने में त्रुटि हुई");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>समाचार सूची पर वापस जाएं</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">नया समाचार आलेख लिखें</h1>
          <p className="text-xs text-slate-400 mt-1">
            समृद्ध संपादकीय प्रारूप, बहुमाध्यम एम्बेड, एसईओ सेटिंग्स एवं कार्यप्रवाह नियंत्रण
          </p>
        </div>
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
                  मुख्य समाचार शीर्षक (Hindi Headline) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="उदा. चंबल सेंचुरी में जलीय जीवों के संरक्षण को मिली ऐतिहासिक सफलता..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  अंग्रेजी शीर्षक (English Headline - वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={formData.english_title}
                  onChange={(e) => setFormData({ ...formData, english_title: e.target.value })}
                  placeholder="Chambal Sanctuary achieves historic aquatic conservation milestone..."
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Slug generator */}
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
                    <span>शीर्षक से स्लग बनाएं</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="chambal-sanctuary-conservation-success"
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
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
                placeholder="2-3 पंक्तियों में समाचार का मुख्य सार लिखें जो कार्ड और सोशल मीडिया में दिखेगा..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Advanced Rich-Text Editor Component */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                विस्तृत समाचार सामग्री (Rich Editorial Content) *
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

            {/* SEO & Social Optimization Accordion */}
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
                    placeholder={formData.title || "सर्च इंजन में दिखने वाला शीर्षक..."}
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
                    placeholder="गूगल और सोशल शेयरिंग में दिखने वाला संक्षिप्त विवरण..."
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
                      placeholder="उदा. चंबल संरक्षण, घड़ियाल"
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
                      placeholder="https://..."
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
                    placeholder="https://... (रिक्त छोड़ने पर मुख्य इमेज का उपयोग होगा)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="noIndexCheck"
                    checked={formData.no_index}
                    onChange={(e) => setFormData({ ...formData, no_index: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="noIndexCheck" className="text-xs text-slate-400 select-none">
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
                  <option value="published">तुरंत लाइव प्रकाशित करें (Publish Live)</option>
                  <option value="draft">ड्राफ्ट के रूप में सहेजें (Save Draft)</option>
                  <option value="review">संपादकीय समीक्षा हेतु भेजें (Send for Review)</option>
                  <option value="approved">अनुमोदित (Approved by Editor)</option>
                  <option value="scheduled">निर्धारित समय पर शेड्यूल करें (Schedule)</option>
                  <option value="archived">संग्रहीत करें (Archive)</option>
                </select>
              </div>

              {formData.status === "scheduled" && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">
                    प्रकाशन तिथि व समय *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              {/* Editorial Notes */}
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
                    <span>समाचार सुरक्षित व लागू करें</span>
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
                  placeholder="https://images.unsplash.com/..."
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
                  placeholder="दृष्टिहीन पाठकों और एसईओ हेतु विवरण"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">फ़ोटो कैप्शन</label>
                <input
                  type="text"
                  value={formData.image_caption}
                  onChange={(e) => setFormData({ ...formData, image_caption: e.target.value })}
                  placeholder="तस्वीर के नीचे दिखने वाला कैप्शन"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">फ़ोटो क्रेडिट</label>
                <input
                  type="text"
                  value={formData.image_credit}
                  onChange={(e) => setFormData({ ...formData, image_credit: e.target.value })}
                  placeholder="द कन्क्लूसिव इंडियन"
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
