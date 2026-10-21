"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteLogo } from "../common/SiteLogo";
import { useLanguage } from "@/context/LanguageContext";

export function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const { language, t } = useLanguage();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      href: SITE_CONFIG.social.whatsapp,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      icon: (
        <MessageCircle className="w-4 h-4 fill-current" />
      ),
    },
    {
      name: "Facebook",
      href: SITE_CONFIG.social.facebook,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: SITE_CONFIG.social.twitter,
      color: "hover:bg-black hover:text-white hover:border-black",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: SITE_CONFIG.social.instagram,
      color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: SITE_CONFIG.social.youtube,
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: SITE_CONFIG.social.telegram,
      color: "hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.196 1.006.128.832.946z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#18274b] text-white border-t-4 border-[#E01F26] mt-10">
      {/* Top Banner: Brand + Social Icons + Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand Info & Mission */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 max-w-lg">
            <SiteLogo variant="footer" />
            <div className="space-y-1">
              <p className="text-xs text-gray-300 leading-relaxed">
                {t(SITE_CONFIG.tagline, SITE_CONFIG.englishTagline)} • {t("सत्य, निष्पक्षता और भारतीय जनसरोकार", "Truth, Fairness & Public Interest")}
              </p>
              <p className="text-[11px] text-gray-400">
                {t("भारत का अग्रणी स्वतंत्र डिजिटल समाचार मंच", "India's Leading Independent Digital News Platform")}
              </p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center lg:items-end gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              {t("सोशल मीडिया पर जुड़ें", "Connect on Social Media")}
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className={`w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white/90 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${item.color}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist Newsletter Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center md:text-left">
            <Mail className="w-4 h-4 text-[#E01F26] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-gray-200">
              {t("दैनिक समाचार बुलेटिन: महत्वपूर्ण खबरें सीधे अपने इनबॉक्स में पाएं", "Daily Newsletter: Key stories delivered directly to your inbox")}
            </span>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full md:w-auto flex items-center gap-2 max-w-md"
          >
            {newsletterSuccess ? (
              <div className="px-3 py-1.5 bg-green-900/80 border border-green-500 rounded-lg text-xs text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-300" />
                <span>{t("सब्सक्रिप्शन दर्ज कर लिया गया है!", "Subscribed successfully!")}</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t("ईमेल पता दर्ज करें...", "Enter your email address...")}
                  required
                  className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#E01F26] min-w-[200px]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#E01F26] hover:bg-[#b81722] text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>{t("सदस्यता लें", "Subscribe")}</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links - Clean 4-Column Minimalist Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Column 1: Top Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 border-l-2 border-[#E01F26] pl-2">
              {t("प्रमुख श्रेणियां", "Top Categories")}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors">
                  {t("होम (मुख्य पृष्ठ)", "Home (Main Page)")}
                </Link>
              </li>
              {SITE_CONFIG.categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {language === "en" ? c.englishName : c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: More Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 border-l-2 border-[#E01F26] pl-2">
              {t("विशेष अनुभाग", "Special Sections")}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {SITE_CONFIG.categories.slice(5, 11).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {language === "en" ? c.englishName : c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Editorial & Institutional */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 border-l-2 border-[#E01F26] pl-2">
              {t("संपादकीय व नीतियां", "Editorial & Policies")}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {SITE_CONFIG.footerLinks.editorial.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white hover:underline transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              {SITE_CONFIG.footerLinks.legal.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white hover:underline transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office Bureau */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 border-l-2 border-[#E01F26] pl-2">
              {t("संपर्क एवं कार्यालय", "Contact & Office")}
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <p className="leading-relaxed">
                <span className="text-gray-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {t("प्रधान कार्यालय", "Head Bureau")}
                </span>
                {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city} - {SITE_CONFIG.address.pin}
              </p>
              <p>
                <span className="text-gray-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {t("संपादकीय ईमेल", "Editorial Desk")}
                </span>
                <a href={`mailto:${SITE_CONFIG.editorialEmail}`} className="text-white hover:text-red-300 underline">
                  {SITE_CONFIG.editorialEmail}
                </a>
              </p>
              <p>
                <span className="text-gray-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {t("हेल्पलाइन / फोन", "Phone Helpline")}
                </span>
                <span className="text-gray-200">{SITE_CONFIG.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Ethical Standards Badge */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
          <span>
            {t(
              "द कन्क्लूसिव इंडियन डिजिटल मीडिया आचार संहिता व भारतीय प्रेस परिषद के नैतिक मानकों के अनुपालन हेतु पूर्णतः प्रतिबद्ध है।",
              "The Conclusive Indian is strictly committed to compliance with ethical digital media standards and code of conduct."
            )}
          </span>
        </div>

        {/* Minimalist Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          {/* Left: Copyright */}
          <p className="text-center sm:text-left">
            © 2026 {SITE_CONFIG.name} ({SITE_CONFIG.hindiName})। {t("सर्वाधिकार सुरक्षित।", "All rights reserved.")}
          </p>

          {/* Right: Designed and developed by TricodX */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>Designed and developed by</span>
            <a
              href="https://tricodx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E01F26] font-bold transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
            >
              TricodX
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
