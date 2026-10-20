import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  variant?: "header" | "mobile" | "footer";
}

export function SiteLogo({ className, variant = "header" }: SiteLogoProps) {
  if (variant === "mobile") {
    return (
      <Link
        href="/"
        className={cn("flex items-center gap-2 group select-none py-1", className)}
        aria-label={SITE_CONFIG.name}
      >
        <div className="w-8 h-8 rounded bg-[#233768] text-white flex items-center justify-center font-bold text-base shadow-sm border border-[#18274b] shrink-0">
          <span className="text-[#E52532] mr-0.5 font-black">T</span>CI
        </div>
        <div className="flex flex-col">
          <span className="text-base font-extrabold tracking-tight text-[#233768] leading-none group-hover:text-[#E52532] transition-colors">
            {SITE_CONFIG.name}
          </span>
          <span className="text-[10px] font-medium text-gray-500 leading-tight mt-0.5">
            {SITE_CONFIG.hindiName}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "footer") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center gap-3 group select-none", className)}
        aria-label={SITE_CONFIG.name}
      >
        <div className="w-10 h-10 rounded-lg bg-white text-[#233768] flex items-center justify-center font-black text-lg shadow-md shrink-0">
          <span className="text-[#E52532]">T</span>CI
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-white leading-none">
            {SITE_CONFIG.name}
          </span>
          <span className="text-xs font-medium text-gray-300 mt-1">
            {SITE_CONFIG.hindiName} • {SITE_CONFIG.tagline}
          </span>
        </div>
      </Link>
    );
  }

  // Desktop header variant
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 group select-none py-1", className)}
      aria-label={SITE_CONFIG.name}
    >
      <div className="w-11 h-11 rounded-lg bg-[#233768] text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-slate-200/40 shrink-0 group-hover:scale-105 transition-transform">
        <span className="text-[#E52532] mr-0.5">T</span>CI
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black tracking-tight text-[#233768] leading-none group-hover:text-[#E52532] transition-colors">
            {SITE_CONFIG.name}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold text-[#20242C] tracking-wide">
            {SITE_CONFIG.hindiName}
          </span>
          <span className="text-[10px] text-gray-400">•</span>
          <span className="text-[11px] font-medium text-[#E52532]">
            {SITE_CONFIG.tagline}
          </span>
        </div>
      </div>
    </Link>
  );
}
