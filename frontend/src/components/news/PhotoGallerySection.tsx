import Link from "next/link";
import { Camera, Image as ImageIcon } from "lucide-react";
import { PhotoStory } from "@/types/news";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface PhotoGallerySectionProps {
  photos: PhotoStory[];
}

export function PhotoGallerySection({ photos }: PhotoGallerySectionProps) {
  if (!photos || photos.length === 0) return null;

  return (
    <section className="w-full py-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#233768] mb-5">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#E52532]" />
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            फोटो गैलरी (Photo Stories)
          </h2>
        </div>
        <span className="text-xs font-semibold text-gray-400">तस्वीरों में आज की बड़ी खबरें</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {photos.map((item) => (
          <article
            key={item.id}
            className="group relative rounded-xl overflow-hidden aspect-16/10 bg-gray-900 shadow-xs"
          >
            <Link href={`/news/${item.slug}`} className="relative block w-full h-full">
              <ImageWithFallback
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
              />
              {/* Photo Count Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                <ImageIcon className="w-3.5 h-3.5 text-yellow-300" />
                <span>{item.photoCount} तस्वीरें</span>
              </div>

              {/* Title Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wide mb-1">
                  {item.category.name}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:underline line-clamp-2 leading-snug">
                  {item.title}
                </h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
