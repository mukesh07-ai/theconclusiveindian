"use client";

import { useState } from "react";
import { Share2, Check, MessageCircle, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

export function SocialShare({ url, title, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-gray-400" /> शेयर करें:
      </span>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp पर शेयर करें"
        className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200"
        title="WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
      </a>

      {/* Twitter / X (SVG) */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter) पर शेयर करें"
        className="w-8 h-8 rounded-full bg-black/5 text-gray-900 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-200"
        title="X (Twitter)"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Facebook (SVG) */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook पर शेयर करें"
        className="w-8 h-8 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200"
        title="Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="लिंक कॉपी करें"
        className={cn(
          "h-8 px-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 border cursor-pointer",
          copied
            ? "bg-green-600 text-white border-green-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" /> कॉपी हुआ!
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" /> लिंक कॉपी
          </>
        )}
      </button>
    </div>
  );
}
