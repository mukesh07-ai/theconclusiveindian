import Link from "next/link";
import { Play, Video, Clock } from "lucide-react";
import { VideoStory } from "@/types/news";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";

interface VideoNewsSectionProps {
  videos: VideoStory[];
}

export function VideoNewsSection({ videos }: VideoNewsSectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="w-full bg-[#18274b] text-white py-10 px-4 rounded-2xl my-8 shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E52532] flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                वीडियो बुलेटिन (Video News)
              </h2>
              <span className="text-xs text-gray-400">
                विशेष ग्राउंड रिपोर्ट और साक्षात्कार
              </span>
            </div>
          </div>
          <Link
            href="/search?q=video"
            className="text-xs font-bold text-red-400 hover:text-white transition-colors"
          >
            सभी वीडियो देखें →
          </Link>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((vid) => (
            <article key={vid.id} className="group flex flex-col">
              <Link
                href={`/news/${vid.slug}`}
                className="relative aspect-16/10 rounded-lg overflow-hidden bg-black/40 shadow-sm block"
              >
                <ImageWithFallback
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 opacity-85 group-hover:opacity-95 transition-all duration-300"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#E52532]/90 group-hover:bg-[#E52532] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                {/* Duration Badge */}
                <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {vid.duration}
                </span>
              </Link>

              <div className="mt-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-wide">
                    {vid.category.name}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-red-300 line-clamp-2 mt-1 leading-snug transition-colors">
                    <Link href={`/news/${vid.slug}`}>{vid.title}</Link>
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                  <span>{vid.views || "1 लाख+ व्यूज"}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTimeHindi(vid.publishedAt)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
