import {
  Article,
  Category,
  BreakingNewsItem,
  VideoStory,
  PhotoStory,
  OpinionArticle,
  PaginationResponse,
} from "@/types/news";
import { SITE_CONFIG } from "@/config/site";
import { MOCK_ARTICLES } from "@/data/mockArticles";
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
  return SITE_CONFIG.categories;
}

/**
 * Get category by its slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cat = SITE_CONFIG.categories.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
  return cat || null;
}

/**
 * Get breaking news items for the ticker
 */
export async function getBreakingNews(): Promise<BreakingNewsItem[]> {
  return MOCK_BREAKING_NEWS;
}

/**
 * Get featured articles for the homepage hero section
 */
export async function getFeaturedArticles(): Promise<{
  lead: Article;
  secondary: Article[];
}> {
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
  // Sort latest first
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
  const trending = MOCK_ARTICLES.filter((a) => a.isTrending)
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);

  return trending.length > 0 ? trending : MOCK_ARTICLES.slice(0, limit);
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
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
  const related = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id && a.category.slug === article.category.slug
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // Fallback to latest other articles
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
  return MOCK_VIDEOS;
}

/**
 * Get photo galleries
 */
export async function getPhotoStories(): Promise<PhotoStory[]> {
  return MOCK_PHOTO_STORIES;
}

/**
 * Get editorial opinion articles
 */
export async function getOpinionArticles(): Promise<OpinionArticle[]> {
  return MOCK_OPINIONS;
}
