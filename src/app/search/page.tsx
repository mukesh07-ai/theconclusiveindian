import { Metadata } from "next";
import Link from "next/link";
import { Search, HelpCircle, TrendingUp } from "lucide-react";
import { searchArticles, getTrendingArticles, getCategories } from "@/lib/api";
import { SITE_CONFIG } from "@/config/site";
import { NewsCard } from "@/components/news/NewsCard";
import { TrendingNews } from "@/components/news/TrendingNews";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    cat?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q
    ? `"${q}" के लिए खोज परिणाम - ${SITE_CONFIG.name}`
    : `समाचार खोजें - ${SITE_CONFIG.name}`;

  return {
    title,
    description: `The Conclusive Indian पर ताज़ा समाचार खोजें`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", cat = "" } = await searchParams;
  const query = q.trim();

  const [searchRes, trendingArticles, categories] = await Promise.all([
    query ? searchArticles(query, cat || undefined, 1, 20) : null,
    getTrendingArticles(5),
    getCategories(),
  ]);

  const results = searchRes ? searchRes.data : [];
  const totalCount = searchRes ? searchRes.total : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Search Header Form */}
      <div className="bg-[#F5F6F8] rounded-2xl p-6 sm:p-8 border border-gray-200">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            समाचार व विश्लेषण खोजें
          </h1>
          <p className="text-sm text-gray-600">
            हिंदी या अंग्रेजी में कोई भी विषय, राजनेता, घटना, या स्थान खोजें
          </p>
        </div>

        {/* Search Input Bar */}
        <form
          action="/search"
          method="GET"
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="संसद, बजट, क्रिकेट, इसरो, रोजगार, AI..."
              className="w-full pl-11 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#233768] shadow-2xs"
            />
          </div>

          {/* Category Filter Select */}
          <select
            name="cat"
            defaultValue={cat}
            className="px-3 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#233768] shadow-2xs"
          >
            <option value="">सभी श्रेणियां (All Categories)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name} ({c.englishName})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-[#233768] hover:bg-[#18274b] text-white font-bold text-sm rounded-lg transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            खोजें
          </button>
        </form>

        {/* Popular Tags */}
        <div className="max-w-2xl mx-auto mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-gray-500">
          <span className="font-semibold text-gray-700 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#E52532]" /> लोकप्रिय विषय:
          </span>
          {SITE_CONFIG.trendingTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/search?q=${encodeURIComponent(topic.name.replace("#", ""))}`}
              className="text-[#233768] hover:underline"
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Results Column (8 Cols) */}
        <div className="lg:col-span-8">
          {query ? (
            <div>
              {/* Results status banner */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#233768] mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  &ldquo;<span className="text-[#E52532]">{query}</span>&rdquo; के लिए परिणाम:
                </h2>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  कुल {totalCount} लेख मिले
                </span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant="horizontal"
                      className="bg-white border border-gray-200"
                    />
                  ))}
                </div>
              ) : (
                /* No Results State */
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      कोई परिणाम नहीं मिला
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                      &ldquo;{query}&rdquo; के लिए कोई सीधा लेख नहीं मिला। कृपया वर्तनी (Spelling) की जांच करें अथवा अधिक सामान्य शब्दों का उपयोग करें।
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 max-w-sm mx-auto text-left text-xs text-gray-600 space-y-1.5">
                    <p className="font-semibold text-gray-800">खोज सुझाव (Search Tips):</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>संसद, अर्थव्यवस्था, क्रिकेट जैसे सरल शब्द खोजें</li>
                      <li>अंग्रेजी में भी खोज सकते हैं (उदा: &ldquo;cricket&rdquo;, &ldquo;budget&rdquo;)</li>
                      <li>श्रेणी फिल्टर को &lsquo;सभी श्रेणियां&rsquo; पर रीसेट करें</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Initial Empty State */
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#233768]/10 text-[#233768] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                शीर्षक, लेखक या विषय खोजें
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                ऊपर दिए गए खोज बॉक्स में कोई भी कीवर्ड लिखकर सर्च बटन दबाएं। आप हिंदी और अंग्रेजी दोनों भाषाओं में खोज सकते हैं।
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Column (4 Cols) */}
        <div className="lg:col-span-4">
          <TrendingNews articles={trendingArticles} />
        </div>
      </div>
    </div>
  );
}
