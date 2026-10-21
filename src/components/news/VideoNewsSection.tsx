"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Video, Clock, X, ExternalLink } from "lucide-react";
import { VideoStory } from "@/types/news";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { formatRelativeTimeHindi } from "@/lib/dateFormat";
import { SITE_CONFIG } from "@/config/site";

interface VideoNewsSectionProps {
  videos: VideoStory[];
}

export function VideoNewsSection({ videos }: VideoNewsSectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoStory | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      <section className="w-full bg-[#18274b] text-white py-10 px-4 rounded-2xl my-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E52532] flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>वीडियो बुलेटिन एवं पॉडकास्ट</span>
                  <span className="text-xs bg-[#E52532] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider hidden sm:inline-block">
                    The Conclusive Indian
                  </span>
                </h2>
                <span className="text-xs text-gray-400">
                  विशेष ग्राउंड रिपोर्ट, डिजिटल पॉडकास्ट और साक्षात्कार
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E52532] hover:bg-[#b81722] text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>यूट्यूब चैनल (@theconclusiveindian)</span>
              </a>

              <Link
                href="/search?q=video"
                className="text-xs font-bold text-gray-300 hover:text-white transition-colors"
              >
                सभी वीडियो →
              </Link>
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.map((vid) => {
              const hasYoutube = Boolean(vid.youtubeId);

              return (
                <article key={vid.id} className="group flex flex-col bg-white/5 rounded-xl p-2.5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-black/60 shadow-sm block">
                    <ImageWithFallback
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 opacity-85 group-hover:opacity-95 transition-all duration-300"
                    />

                    {/* Play Button Overlay */}
                    <button
                      type="button"
                      onClick={() => hasYoutube && setActiveVideo(vid)}
                      aria-label={`${vid.title} चलाएं`}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#E52532]/90 group-hover:bg-[#E52532] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </button>

                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {vid.duration}
                    </span>

                    {/* Featured / Podcast Badge */}
                    {vid.isFeatured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
                        ★ शून्य से शिखर तक
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-red-400 uppercase tracking-wide">
                          {vid.category?.name || "वीडियो"}
                        </span>
                        {vid.views && (
                          <span className="text-gray-400 font-medium">{vid.views}</span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-red-300 line-clamp-2 leading-snug transition-colors">
                        <Link href={`/news/${vid.slug}`}>{vid.title}</Link>
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 mt-3 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => hasYoutube && setActiveVideo(vid)}
                        className="text-red-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>वीडियो देखें</span>
                      </button>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTimeHindi(vid.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Video Player Modal */}
      {activeVideo && activeVideo.youtubeId && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#18274b] rounded-2xl shadow-2xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3 sm:p-4 bg-[#111c36] border-b border-white/10 flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2 truncate">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-bold truncate">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="वीडियो बंद करें"
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Embedded Responsive YouTube Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer with Channel Link and Full Article Link */}
            <div className="p-3 sm:p-4 bg-[#111c36] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">चैनल:</span>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline font-bold flex items-center gap-1"
                >
                  <span>The Conclusive Indian (@theconclusiveindian)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/news/${activeVideo.slug}`}
                  onClick={() => setActiveVideo(null)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
                >
                  पूरी रिपोर्ट पढ़ें →
                </Link>
                <a
                  href={activeVideo.youtubeUrl || `https://youtu.be/${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#E01F26] hover:bg-[#b81722] text-white rounded-lg font-bold transition-colors"
                >
                  यूट्यूब पर खोलें
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
