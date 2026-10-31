import {
  Article,
  Author,
  Category,
  BreakingNewsItem,
  VideoStory,
  PhotoStory,
  OpinionArticle,
  PaginationResponse,
} from "@/types/news";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_ARTICLES } from "@/data/mockArticles";
import { MOCK_AUTHORS } from "@/data/mockAuthors";
import { MOCK_BREAKING_NEWS } from "@/data/mockBreakingNews";
import { MOCK_VIDEOS, MOCK_PHOTO_STORIES, MOCK_OPINIONS } from "@/data/mockMultimedia";
import { filterArticlesByQuery } from "./search";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Check if a live backend is configured and enabled
 */
export const isLiveApiEnabled = Boolean(API_BASE_URL && API_BASE_URL.startsWith("http"));

/**
 * Get all configured news categories
 */
export async function getCategories(): Promise<Category[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 60 } });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to local config on network error
    }
  }
  return SITE_CONFIG.categories;
}

/**
 * Get category by its slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${slug.toLowerCase()}`, { next: { revalidate: 60 } });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }
  const cat = SITE_CONFIG.categories.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
  return cat || null;
}

/**
 * Get breaking news items for the ticker
 */
export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/breaking-news`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }
  return MOCK_BREAKING_NEWS;
}

/**
 * Get featured articles for the homepage hero section
 */
export async function getFeaturedArticles(): Promise<{
  lead: Article;
  secondary: Article[];
}> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/articles/featured`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.lead) {
          return {
            lead: data.lead,
            secondary: data.secondary || [],
          };
        }
      }
    } catch {
      // Fallback
    }
  }

  const featured = MOCK_ARTICLES.filter((a) => a.isFeatured);
  const lead = featured[0] || MOCK_ARTICLES[0];
  const secondary = featured.slice(1, 4);

  return {
    lead,
    secondary,
  };
}

/**
 * Get latest articles with pagination support
 */
export async function getLatestArticles(
  page: number = 1,
  limit: number = 10
): Promise<PaginationResponse<Article>> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=${limit}&sort=latest`, {
        cache: "no-store",
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const sorted = [...MOCK_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = sorted.slice(start, end);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}

/**
 * Get trending articles
 */
export async function getTrendingArticles(limit: number = 5): Promise<Article[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/articles/trending?limit=${limit}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }

  const trending = MOCK_ARTICLES.filter((a) => a.isTrending)
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);

  return trending.length > 0 ? trending : MOCK_ARTICLES.slice(0, limit);
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${slug.toLowerCase()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const article = MOCK_ARTICLES.find(
    (a) => a.slug.toLowerCase() === slug.toLowerCase()
  );
  return article || null;
}

/**
 * Get related articles for an article
 */
export async function getRelatedArticles(
  article: Article,
  limit: number = 4
): Promise<Article[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${article.slug}/related?limit=${limit}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }

  const related = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id && a.category.slug === article.category.slug
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const others = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id && a.category.slug !== article.category.slug
  );
  return [...related, ...others].slice(0, limit);
}

/**
 * Get articles for a specific category with pagination
 */
export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginationResponse<Article>> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles?category=${categorySlug.toLowerCase()}&page=${page}&limit=${limit}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const filtered = MOCK_ARTICLES.filter(
    (a) => a.category.slug.toLowerCase() === categorySlug.toLowerCase()
  ).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}

/**
 * Search articles by query and optional category filter
 */
export async function searchArticles(
  query: string,
  categorySlug?: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginationResponse<Article>> {
  if (isLiveApiEnabled) {
    try {
      const catParam = categorySlug ? `&category=${categorySlug.toLowerCase()}` : "";
      const res = await fetch(
        `${API_BASE_URL}/articles/search?q=${encodeURIComponent(query)}${catParam}&page=${page}&limit=${limit}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const results = filterArticlesByQuery(MOCK_ARTICLES, query, categorySlug);

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = results.slice(start, end);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}

/**
 * Get multimedia video stories
 */
export async function getVideoStories(): Promise<VideoStory[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/multimedia/videos`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }
  return MOCK_VIDEOS;
}

/**
 * Get photo galleries
 */
export async function getPhotoStories(): Promise<PhotoStory[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/multimedia/photos`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }
  return MOCK_PHOTO_STORIES;
}

/**
 * Get editorial opinion articles
 */
export async function getOpinionArticles(): Promise<OpinionArticle[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/multimedia/opinions`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }
  return MOCK_OPINIONS;
}

/**
 * Get all editorial authors
 */
export async function getAuthors(): Promise<Author[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/authors`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
  }
  return Object.values(MOCK_AUTHORS);
}

/**
 * Get an author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/authors/${slug.toLowerCase()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const normalized = slug.toLowerCase();
  const author = Object.values(MOCK_AUTHORS).find(
    (a) => a.slug.toLowerCase() === normalized
  );
  return author || null;
}

/**
 * Get articles by an author with pagination
 */
export async function getArticlesByAuthor(
  authorSlug: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginationResponse<Article>> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles?author=${authorSlug.toLowerCase()}&page=${page}&limit=${limit}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const normalized = authorSlug.toLowerCase();
  const filtered = MOCK_ARTICLES.filter(
    (a) => a.author.slug.toLowerCase() === normalized
  ).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}

/**
 * Helper to normalize tag string into URL slug
 */
export function normalizeTagSlug(tag: string): string {
  return encodeURIComponent(tag.trim().replace(/\s+/g, "_"));
}

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

/**
 * Get all unique tags with usage counts
 */
export async function getAllTags(): Promise<TagInfo[]> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(`${API_BASE_URL}/tags`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((t: { name: string; slug: string; count?: number }) => ({
            tag: t.name,
            slug: t.slug,
            count: t.count || 1,
          }));
        }
      }
    } catch {
      // Fallback
    }
  }

  const tagCounts = new Map<string, number>();

  for (const article of MOCK_ARTICLES) {
    if (article.tags && Array.isArray(article.tags)) {
      for (const rawTag of article.tags) {
        const cleanTag = rawTag.trim();
        if (cleanTag) {
          tagCounts.set(cleanTag, (tagCounts.get(cleanTag) || 0) + 1);
        }
      }
    }
  }

  const result: TagInfo[] = [];
  tagCounts.forEach((count, tag) => {
    result.push({
      tag,
      slug: normalizeTagSlug(tag),
      count,
    });
  });

  return result.sort((a, b) => b.count - a.count);
}

/**
 * Get articles by tag with pagination
 */
export async function getArticlesByTag(
  tagOrSlug: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginationResponse<Article>> {
  if (isLiveApiEnabled) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles?tag=${encodeURIComponent(tagOrSlug)}&page=${page}&limit=${limit}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const decoded = decodeURIComponent(tagOrSlug).trim().toLowerCase();
  const decodedWithUnderscores = decoded.replace(/\s+/g, "_");
  const decodedWithSpaces = decoded.replace(/_+/g, " ");

  const filtered = MOCK_ARTICLES.filter((article) => {
    if (!article.tags || !Array.isArray(article.tags)) return false;
    return article.tags.some((t) => {
      const lower = t.toLowerCase();
      return (
        lower === decoded ||
        lower === decodedWithUnderscores ||
        lower === decodedWithSpaces ||
        normalizeTagSlug(t).toLowerCase() === decoded
      );
    });
  }).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}
