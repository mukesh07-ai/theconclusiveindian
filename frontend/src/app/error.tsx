"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, Mail } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log non-sensitive error metadata for debugging
    console.error("Application error:", error.message);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <AlertOctagon className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          तकनीकी समस्या (Application Error)
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 pt-2">
          पृष्ठ लोड करने में रुकावट आई
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          सर्वर से संवाद अथवा डेटा लोड करते समय अप्रत्याशित समस्या हुई है। हमारी तकनीकी टीम को सूचित कर दिया गया है।
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          type="button"
          onClick={() => reset()}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#233768] hover:bg-[#18274b] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> पुनः प्रयास करें (Retry)
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-200"
        >
          <Home className="w-4 h-4" /> मुख्य पृष्ठ पर जाएं
        </Link>
      </div>

      {/* Report Technical Issue */}
      <div className="pt-8 border-t border-gray-200 text-xs text-gray-500">
        <p>
          यदि यह समस्या निरंतर बनी रहे, तो कृपया हमें सूचित करें:{" "}
          <Link href="/contact-us" className="text-[#233768] font-bold hover:underline inline-flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> तकनीकी सहायता डेस्क
          </Link>
        </p>
      </div>
    </div>
  );
}
