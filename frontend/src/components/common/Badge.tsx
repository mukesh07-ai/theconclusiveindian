import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "breaking" | "secondary" | "outline" | "live";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#233768] text-white hover:bg-[#18274b]",
    breaking: "bg-[#E52532] text-white font-bold",
    secondary: "bg-[#F5F6F8] text-[#20242C] border border-[#E5E7EB] hover:bg-gray-200",
    outline: "bg-transparent text-[#233768] border border-[#233768]/30",
    live: "bg-[#E52532] text-white flex items-center gap-1.5 font-bold uppercase tracking-wider",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded-sm font-semibold",
    md: "text-xs px-2.5 py-1 rounded font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {variant === "live" && (
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      )}
      {children}
    </span>
  );
}
