import { Article } from "@/types/news";

/**
 * Clean and normalize query text for both Hindi and English
 */
export function normalizeSearchQuery(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    // normalize common unicode characters (nuktas, zero-width joiners)
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // replace punctuation with space
    .replace(/[।,\.\?!:;\-_"'\(\)\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Search articles using normalized bilingual matching across title, excerpt, content, tags, and category
 */
export function filterArticlesByQuery(
  articles: Article[],
  rawQuery: string,
  categorySlug?: string
): Article[] {
  const query = normalizeSearchQuery(rawQuery);

  let filtered = articles;

  if (categorySlug && categorySlug !== "all") {
    filtered = filtered.filter(
      (a) => a.category.slug.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  if (!query) {
    return filtered;
  }

  const queryTerms = query.split(" ").filter((t) => t.length > 0);

  // Score articles for relevance ranking
  const scored = filtered.map((article) => {
    const titleNorm = normalizeSearchQuery(article.title);
    const engTitleNorm = normalizeSearchQuery(article.englishTitle || "");
    const excerptNorm = normalizeSearchQuery(article.excerpt);
    const catNorm = normalizeSearchQuery(article.category.name + " " + article.category.englishName);
    const tagsNorm = normalizeSearchQuery(article.tags.join(" "));
    const authorNorm = normalizeSearchQuery(article.author.name);
    const contentNorm = normalizeSearchQuery(article.content);

    let score = 0;

    for (const term of queryTerms) {
      if (titleNorm.includes(term)) score += 10;
      if (engTitleNorm.includes(term)) score += 10;
      if (tagsNorm.includes(term)) score += 6;
      if (catNorm.includes(term)) score += 5;
      if (excerptNorm.includes(term)) score += 4;
      if (authorNorm.includes(term)) score += 3;
      if (contentNorm.includes(term)) score += 1;
    }

    return { article, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);
}
