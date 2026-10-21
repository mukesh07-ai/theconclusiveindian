import Link from "next/link";
import { Home, Search, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-red-100 text-[#E52532] rounded-full flex items-center justify-center mx-auto shadow-inner">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-bold uppercase tracking-wider text-[#E52532]">
          त्रुटि कोड 404 (Page Not Found)
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          क्षमा करें, यह पृष्ठ उपलब्ध नहीं है
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          आप जिस खबर या पृष्ठ को ढूंढ रहे हैं, हो सकता है कि उसे हटा दिया गया हो, उसका यूआरएल बदल गया हो, या वह अस्थायी रूप से अनुपलब्ध हो।
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-2.5 bg-[#233768] hover:bg-[#18274b] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" /> मुख्य पृष्ठ पर जाएं (Home)
        </Link>
        <Link
          href="/search"
          className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-200"
        >
          <Search className="w-4 h-4" /> समाचार खोजें
        </Link>
      </div>

      {/* Popular Categories */}
      <div className="pt-8 border-t border-gray-200">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
          प्रमुख समाचार अनुभाग:
        </span>
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          {SITE_CONFIG.categories.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="px-3 py-1 bg-[#F5F6F8] hover:bg-gray-200 text-gray-700 font-medium rounded-full border border-gray-200 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
