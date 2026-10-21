import Link from "next/link";
import Image from "next/image";
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
        className={cn("flex items-center shrink-0 py-0.5", className)}
        aria-label={`${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`}
      >
        <div className="relative h-9 w-[150px] sm:w-[175px]">
          <Image
            src="/logo.png"
            alt={`${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`}
            fill
            sizes="175px"
            priority
            className="object-contain object-left"
          />
        </div>
      </Link>
    );
  }

  if (variant === "footer") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center gap-3 group select-none", className)}
        aria-label={`${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`}
      >
        <div className="bg-white p-2.5 rounded-lg shadow-md border border-white/20">
          <div className="relative h-12 w-[210px]">
            <Image
              src="/logo.png"
              alt={`${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`}
              fill
              sizes="210px"
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    );
  }

  // Desktop header variant - compact & crisp
  return (
    <Link
      href="/"
      className={cn("flex items-center shrink-0 group", className)}
      aria-label={`${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`}
    >
      <div className="relative h-11 w-[210px] lg:w-[245px] group-hover:opacity-95 transition-opacity">
        <Image
          src="/logo.png"
          alt={`${SITE_CONFIG.name} - ${SITE_CONFIG.hindiName}`}
          fill
          sizes="(max-width: 1024px) 210px, 245px"
          priority
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
