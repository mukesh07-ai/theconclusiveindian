"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteLogo } from "../common/SiteLogo";

export function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <footer className="w-full bg-[#18274b] text-white border-t-4 border-[#E52532] mt-12">
      {/* Newsletter Signup Strip */}
      <div className="bg-[#233768] py-8 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-[#E52532]" />
              दैनिक समाचार बुलेटिन (Daily Newsletter)
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              देश, दुनिया और महत्वपूर्ण नीतिगत मुद्दों का सटीक संपादकीय विश्लेषण सीधे अपने इनबॉक्स में पाएं।
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row gap-2"
          >
            {newsletterSuccess ? (
              <div className="w-full p-2.5 bg-green-900/80 border border-green-500 rounded text-sm text-white flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                धन्यवाद! आपका सब्सक्रिप्शन दर्ज कर लिया गया है।
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="अपना ईमेल पता दर्ज करें..."
                  required
                  className="flex-1 px-4 py-2.5 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E52532]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E52532] hover:bg-[#b81722] text-white font-semibold text-sm rounded flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4" /> सदस्यता लें
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <SiteLogo variant="footer" />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p>
                <strong className="text-gray-300">प्रधान कार्यालय:</strong> {SITE_CONFIG.address.street},{" "}
                {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} - {SITE_CONFIG.address.pin}
              </p>
              <p>
                <strong className="text-gray-300">संपादकीय संपर्क:</strong> {SITE_CONFIG.editorialEmail}
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#E52532] pl-2.5">
              प्रमुख श्रेणियां
            </h4>
            <ul className="space-y-2 text-xs">
              {SITE_CONFIG.categories.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-gray-300 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-gray-400">{c.englishName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#E52532] pl-2.5">
              विशेष अनुभाग
            </h4>
            <ul className="space-y-2 text-xs">
              {SITE_CONFIG.categories.slice(7).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-gray-300 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-gray-400">{c.englishName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#E52532] pl-2.5">
              संपादकीय व नीति
            </h4>
            <ul className="space-y-2 text-xs">
              {SITE_CONFIG.footerLinks.editorial.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {SITE_CONFIG.footerLinks.legal.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ethical Commitment Banner */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
            <span>
              द कन्क्लूसिव इंडियन भारतीय प्रेस परिषद और डिजिटल मीडिया आचार संहिता 2021 के नैतिक मानकों के अनुपालन हेतु प्रतिबद्ध है।
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#E52532] fill-current" />
            <span>in New Delhi, India</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-gray-400">
          <p>
            © 2026 {SITE_CONFIG.name} ({SITE_CONFIG.hindiName})। सर्वाधिकार सुरक्षित। सामग्री का अनधिकृत पुनरुत्पादन प्रतिबंधित है।
          </p>
        </div>
      </div>
    </footer>
  );
}
