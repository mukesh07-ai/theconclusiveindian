"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  categoryLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  categoryLabel,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "w-full h-full bg-gradient-to-br from-[#233768]/10 via-[#F5F6F8] to-[#233768]/20 flex flex-col items-center justify-center text-gray-500 p-4 border border-[#E5E7EB]",
          className
        )}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#233768] mb-2">
          <Newspaper className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-gray-600 text-center line-clamp-1">
          {categoryLabel || "The Conclusive Indian"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "News image"}
      className={className}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
