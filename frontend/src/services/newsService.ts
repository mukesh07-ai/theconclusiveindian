/**
 * News Service Layer
 * Centralizes data operations between UI components and API/Data sources.
 * Seamlessly interfaces with the future Python FastAPI + MySQL backend.
 */

import * as api from "@/lib/api";
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

export const newsService = {
  // Categories
  getCategories: api.getCategories,
  getCategoryBySlug: api.getCategoryBySlug,

  // Breaking News
  getBreakingNews: api.getBreakingNews,

  // Articles
  getFeaturedArticles: api.getFeaturedArticles,
  getLatestArticles: api.getLatestArticles,
  getTrendingArticles: api.getTrendingArticles,
  getArticleBySlug: api.getArticleBySlug,
  getRelatedArticles: api.getRelatedArticles,
  getArticlesByCategory: api.getArticlesByCategory,
  searchArticles: api.searchArticles,

  // Authors & Tags
  getAuthors: api.getAuthors,
  getAuthorBySlug: api.getAuthorBySlug,
  getArticlesByAuthor: api.getArticlesByAuthor,
  getAllTags: api.getAllTags,
  getArticlesByTag: api.getArticlesByTag,

  // Multimedia & Opinions
  getVideoStories: api.getVideoStories,
  getPhotoStories: api.getPhotoStories,
  getOpinionArticles: api.getOpinionArticles,

  // Live status
  isLiveApiEnabled: api.isLiveApiEnabled,
  API_BASE_URL: api.API_BASE_URL,
};

// Re-export individual functions and types for flexible import styles
export {
  getCategories,
  getCategoryBySlug,
  getBreakingNews,
  getFeaturedArticles,
  getLatestArticles,
  getTrendingArticles,
  getArticleBySlug,
  getRelatedArticles,
  getArticlesByCategory,
  searchArticles,
  getAuthors,
  getAuthorBySlug,
  getArticlesByAuthor,
  getAllTags,
  getArticlesByTag,
  getVideoStories,
  getPhotoStories,
  getOpinionArticles,
  isLiveApiEnabled,
  API_BASE_URL,
} from "@/lib/api";

export type {
  Article,
  Author,
  Category,
  BreakingNewsItem,
  VideoStory,
  PhotoStory,
  OpinionArticle,
  PaginationResponse,
};
