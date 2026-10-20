"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Search, FileText, Info, PhoneCall, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteLogo } from "../common/SiteLogo";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileDrawer({ isOpen, onClose, onOpenSearch }: MobileDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#F5F6F8]">
          <SiteLogo variant="mobile" />
          <button
            type="button"
            onClick={onClose}
            aria-label="मेनू बंद करें"
            className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button in Drawer */}
        <div className="p-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <Search className="w-4 h-4 text-[#233768]" />
            <span>खबरें खोजें...</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="py-2 flex-1">
          <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            प्रमुख श्रेणियां (Categories)
          </div>
          <nav className="divide-y divide-gray-100">
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors",
                pathname === "/"
                  ? "bg-[#233768]/10 text-[#233768] font-bold"
                  : "text-gray-800 hover:bg-gray-50"
              )}
            >
              <span>होम (Home)</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            {SITE_CONFIG.categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-[#233768]/10 text-[#233768] font-bold"
                      : "text-gray-800 hover:bg-gray-50"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{cat.name}</span>
                    <span className="text-[11px] text-gray-400">{cat.englishName}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              );
            })}
          </nav>

          {/* Quick Informational Links */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              संपादकीय एवं संपर्क
            </div>
            <div className="px-2 space-y-1">
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Info className="w-4 h-4 text-[#233768]" /> हमारे बारे में (About Us)
              </Link>
              <Link
                href="/editorial-policy"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#233768]" /> संपादकीय नीति (Editorial Policy)
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#233768]" /> संपर्क करें (Contact Us)
              </Link>
              <Link
                href="/privacy-policy"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4 text-[#233768]" /> गोपनीयता नीति (Privacy)
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#F5F6F8] border-t border-gray-200 text-xs text-gray-500">
          <p className="font-semibold text-gray-700">{SITE_CONFIG.name}</p>
          <p className="text-[11px] mt-0.5">{SITE_CONFIG.tagline}</p>
          <p className="text-[10px] text-gray-400 mt-2">
            © 2026 सर्वाधिकार सुरक्षित
          </p>
        </div>
      </div>
    </div>
  );
}
