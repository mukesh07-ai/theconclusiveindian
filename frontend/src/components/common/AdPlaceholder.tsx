"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/adminService";
import { ExternalLink } from "lucide-react";

interface AdPlaceholderProps {
  format: "leaderboard" | "sidebar" | "in-feed";
  placement?: string;
  className?: string;
}

interface ActiveAd {
  id: string;
  title: string;
  advertiserName: string;
  destinationUrl: string;
  creativeDesktopUrl: string;
  creativeMobileUrl?: string;
}

export function AdPlaceholder({ format, placement, className }: AdPlaceholderProps) {
  const [ad, setAd] = useState<ActiveAd | null>(null);

  const formatConfig = {
    leaderboard: {
      dimensions: "728 × 90 px (Leaderboard)",
      containerClass: "w-full max-w-[728px] h-[90px] mx-auto",
    },
    sidebar: {
      dimensions: "300 × 250 px (Medium Rectangle)",
      containerClass: "w-full max-w-[300px] h-[250px] mx-auto",
    },
    "in-feed": {
      dimensions: "Responsive Feed Banner",
      containerClass: "w-full h-[100px] sm:h-[120px]",
    },
  };

  const current = formatConfig[format];
  const targetPlacement = placement || (format === "leaderboard" ? "homepage_top" : format === "sidebar" ? "sidebar" : "article_inline");

  useEffect(() => {
    let isMounted = true;
    async function fetchAd() {
      try {
        const ads = await adminService.getActiveAdsForPlacement(targetPlacement);
        if (isMounted && Array.isArray(ads) && ads.length > 0) {
          const selected = ads[0];
          setAd(selected);
          adminService.trackAdImpression(selected.id);
        }
      } catch {
        // Fallback to placeholder
      }
    }
    fetchAd();
    return () => {
      isMounted = false;
    };
  }, [targetPlacement]);

  if (ad) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded shadow-sm border border-gray-200 group transition-all",
          current.containerClass,
          className
        )}
      >
        <span className="absolute top-1 right-1 z-10 text-[9px] uppercase tracking-wider bg-black/60 text-white px-1 rounded backdrop-blur-xs font-semibold">
          विज्ञापन
        </span>
        <a
          href={ad.destinationUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full h-full relative"
          title={`${ad.title} - ${ad.advertiserName}`}
        >
          <Image
            src={ad.creativeDesktopUrl}
            alt={ad.title}
            fill
            sizes="(max-width: 768px) 100vw, 728px"
            className="object-cover group-hover:opacity-95 transition-opacity"
          />
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-[#F5F6F8] border border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-center p-2 relative overflow-hidden select-none",
        current.containerClass,
        className
      )}
      aria-label="विज्ञापन स्थान"
    >
      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
        विज्ञापन / ADVERTISEMENT
      </span>
      <div className="text-xs text-gray-400 font-medium">
        {SITE_NAME_CONFIG} • {current.dimensions}
      </div>
    </div>
  );
}

const SITE_NAME_CONFIG = "The Conclusive Indian";
