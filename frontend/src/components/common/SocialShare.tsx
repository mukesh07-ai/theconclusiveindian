"use client";

import { useState, useSyncExternalStore } from "react";
import { Share2, Check, MessageCircle, Link2, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  url: string;
  title: string;
  excerpt?: string;
  image?: string;
  className?: string;
  variant?: "standard" | "compact" | "banner";
}

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getClientOrigin(): string {
  return typeof window !== "undefined" ? window.location.origin : "";
}

function getServerOrigin(): string {
  return "";
}

/**
 * Dynamically resolves URL to match the current environment:
 * - In local dev (localhost/127.0.0.1) -> resolves to window.location.origin
 * - On the live website -> resolves to the canonical/live origin
 * - Safe for SSR and client hydration
 */
function resolveDynamicUrl(inputUrl: string, baseOrigin?: string): string {
  const defaultBase = (SITE_CONFIG?.url || "https://theconclusiveindian.com").replace(/\/$/, "");
  const base = baseOrigin ? baseOrigin.replace(/\/$/, "") : defaultBase;

  try {
    if (inputUrl.startsWith("http://") || inputUrl.startsWith("https://")) {
      const parsed = new URL(inputUrl);

      // On localhost, always rewrite origin to match current localhost environment
      if (typeof window !== "undefined") {
        const isCurrentLocal =
          window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        if (isCurrentLocal) {
          return `${window.location.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
      }

      // If an explicit baseOrigin was provided (e.g. from window.location.origin post-mount)
      // and the parsed host matches either localhost or the canonical domain, adapt to baseOrigin
      const canonicalHost = new URL(SITE_CONFIG.url).host;
      if (
        baseOrigin &&
        (parsed.host === canonicalHost ||
          parsed.hostname === "localhost" ||
          parsed.hostname === "127.0.0.1")
      ) {
        return `${base}${parsed.pathname}${parsed.search}${parsed.hash}`;
      }

      return inputUrl;
    }
  } catch {
    // fallback to path join
  }

  const cleanPath = inputUrl.startsWith("/") ? inputUrl : `/${inputUrl}`;
  return `${base}${cleanPath}`;
}

export function SocialShare({
  url,
  title,
  excerpt,
  image,
  className,
  variant = "standard",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  // Safely subscribe to client origin without cascading renders or hydration mismatch
  const browserOrigin = useSyncExternalStore(subscribe, getClientOrigin, getServerOrigin);

  // During SSR & initial hydration, browserOrigin is "" -> resolves canonical base identically
  // After hydration on client, browserOrigin matches window.location.origin -> dynamically updates!
  const shareUrl = resolveDynamicUrl(url, browserOrigin || undefined);

  // Clean snippet for heading/excerpt portion
  const snippet = excerpt
    ? excerpt.length > 140
      ? `${excerpt.slice(0, 140).trim()}...`
      : excerpt.trim()
    : "";

  // Real-time URL helper for immediate click actions
  const getActiveUrl = () => {
    if (typeof window !== "undefined") {
      return resolveDynamicUrl(url, window.location.origin);
    }
    return shareUrl;
  };

  // Build rich Instagram / News style message for WhatsApp
  const buildWhatsAppMessage = (targetUrl: string) => {
    const lines: string[] = [];

    // 1. Post headline in bold
    lines.push(`*${title.trim()}*`);

    // 2. Portion of heading / excerpt snippet
    if (snippet) {
      lines.push(snippet);
    }

    // 3. Dynamic link (pointing to localhost on dev, live domain on production)
    lines.push(`🔗 *पूरी खबर पढ़ें:* ${targetUrl}`);

    // 4. Image preview reference if available
    if (image && (image.startsWith("http://") || image.startsWith("https://"))) {
      lines.push(`🖼️ *फोटो:* ${image}`);
    }

    // 5. Publisher brand
    lines.push(`📰 *The Conclusive Indian*`);

    return lines.join("\n\n");
  };

  const encodedWhatsAppText = encodeURIComponent(buildWhatsAppMessage(shareUrl));
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedWhatsAppText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      snippet ? `${title.slice(0, 100)}...\n\n${snippet.slice(0, 80)}...` : title
    )}&url=${encodedUrl}&via=tci2024`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
      `*${title}*${snippet ? `\n\n${snippet}` : ""}`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handlePlatformClick = (platform: keyof typeof shareLinks, e: React.MouseEvent) => {
    e.preventDefault();
    const activeUrl = getActiveUrl();
    let targetLink = "";

    switch (platform) {
      case "whatsapp": {
        const msg = buildWhatsAppMessage(activeUrl);
        targetLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
        break;
      }
      case "twitter": {
        const tweetText = snippet ? `${title.slice(0, 100)}...\n\n${snippet.slice(0, 80)}...` : title;
        targetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(activeUrl)}&via=tci2024`;
        break;
      }
      case "facebook":
        targetLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activeUrl)}`;
        break;
      case "telegram":
        targetLink = `https://t.me/share/url?url=${encodeURIComponent(activeUrl)}&text=${encodeURIComponent(`*${title}*${snippet ? `\n\n${snippet}` : ""}`)}`;
        break;
      case "linkedin":
        targetLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(activeUrl)}`;
        break;
    }

    if (typeof window !== "undefined" && targetLink) {
      window.open(targetLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleNativeShare = async () => {
    const activeUrl = getActiveUrl();
    const shareData = {
      title,
      text: snippet ? `${title}\n\n${snippet}` : title,
      url: activeUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed
      }
    }
    handleCopyLink();
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const activeUrl = getActiveUrl();
        await navigator.clipboard.writeText(activeUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-1", className)}>
        {/* Quick WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          onClick={(e) => handlePlatformClick("whatsapp", e)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp पर शेयर करें"
          title="WhatsApp"
          className="w-7 h-7 rounded-full bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
        </a>

        {/* Quick Facebook */}
        <a
          href={shareLinks.facebook}
          onClick={(e) => handlePlatformClick("facebook", e)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook पर शेयर करें"
          title="Facebook"
          className="w-7 h-7 rounded-full bg-[#1877F2]/15 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* Quick Copy Link / Native Share */}
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="शेयर करें"
          title="शेयर करें"
          className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 hover:bg-[#263565] hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <Share2 className="w-3 h-3" />
        </button>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "p-4 bg-gradient-to-r from-red-50 to-gray-50 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-3",
          className
        )}
      >
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Share2 className="w-5 h-5 text-[#E01F26] shrink-0" />
          <div>
            <span className="font-bold text-sm text-gray-900 block">
              {t("इस खबर को अपने मित्रों व परिवार से शेयर करें", "Share this story with friends and family")}
            </span>
            <span className="text-[11px] text-gray-500">
              {t("सत्य और निष्पक्ष पत्रकारिता का प्रसार करें", "Help spread truthful and independent journalism")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* WhatsApp Button with text */}
          <a
            href={shareLinks.whatsapp}
            onClick={(e) => handlePlatformClick("whatsapp", e)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            href={shareLinks.facebook}
            onClick={(e) => handlePlatformClick("facebook", e)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#1567d3] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer",
              copied
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            )}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{copied ? t("कॉपी हुआ!", "Copied!") : t("लिंक कॉपी", "Copy Link")}</span>
          </button>
        </div>
      </div>
    );
  }

  // Standard variant
  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2 flex-wrap", className)}>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mr-1">
        <Share2 className="w-3.5 h-3.5 text-gray-400" />
        <span>{t("शेयर करें:", "Share:")}</span>
      </span>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        onClick={(e) => handlePlatformClick("whatsapp", e)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp पर शेयर करें"
        className="w-8 h-8 rounded-full bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        title="WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        onClick={(e) => handlePlatformClick("facebook", e)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook पर शेयर करें"
        className="w-8 h-8 rounded-full bg-[#1877F2]/15 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        title="Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Twitter / X */}
      <a
        href={shareLinks.twitter}
        onClick={(e) => handlePlatformClick("twitter", e)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter) पर शेयर करें"
        className="w-8 h-8 rounded-full bg-black/10 text-gray-900 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        title="X (Twitter)"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Telegram */}
      <a
        href={shareLinks.telegram}
        onClick={(e) => handlePlatformClick("telegram", e)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram पर शेयर करें"
        className="w-8 h-8 rounded-full bg-[#0088cc]/15 text-[#0088cc] hover:bg-[#0088cc] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        title="Telegram"
      >
        <Send className="w-3.5 h-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        onClick={(e) => handlePlatformClick("linkedin", e)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn पर शेयर करें"
        className="w-8 h-8 rounded-full bg-[#0A66C2]/15 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        title="LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="लिंक कॉपी करें"
        className={cn(
          "h-8 px-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border cursor-pointer select-none",
          copied
            ? "bg-green-600 text-white border-green-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>{t("कॉपी हुआ!", "Copied!")}</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            <span>{t("कॉपी", "Copy")}</span>
          </>
        )}
      </button>

      {/* Native Web Share Button (Mobile/Device) */}
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="अन्य ऐप्स पर शेयर करें"
        title="अन्य ऐप्स पर शेयर करें"
        className="h-8 px-2.5 rounded-full text-xs font-semibold bg-[#263565] text-white hover:bg-[#1a2548] flex items-center gap-1 transition-all duration-200 cursor-pointer"
      >
        <Share2 className="w-3 h-3" />
        <span>{t("अन्य", "More")}</span>
      </button>
    </div>
  );
}
