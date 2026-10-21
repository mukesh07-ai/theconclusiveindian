import { Article } from "@/types/news";
import { NewsCard } from "./NewsCard";

interface RelatedStoriesProps {
  articles: Article[];
}

export function RelatedStories({ articles }: RelatedStoriesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t-2 border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-5 bg-[#E52532] rounded-xs" />
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          संबंधित खबरें (Related Stories)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.map((art) => (
          <NewsCard
            key={art.id}
            article={art}
            variant="standard"
            showExcerpt={false}
          />
        ))}
      </div>
    </section>
  );
}
