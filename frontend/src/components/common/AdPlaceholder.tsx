import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  format: "leaderboard" | "sidebar" | "in-feed";
  className?: string;
}

export function AdPlaceholder({ format, className }: AdPlaceholderProps) {
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
