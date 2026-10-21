export interface Author {
  id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;        // e.g. "राजनीति"
  englishName: string; // e.g. "Politics"
  slug: string;        // e.g. "politics"
  description?: string;
  color?: string;
  order?: number;
}

export interface Article {
  id: string;
  title: string;
  englishTitle?: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageAlt: string;
  imageCaption?: string;
  imageCredit?: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  status: "published" | "draft" | "archived";
  tags: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  viewCount?: number;
  readTimeMinutes?: number;
  videoDuration?: string;
  photoCount?: number;
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  timestamp: string;
  isUrgent?: boolean;
}

export interface VideoStory {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  duration: string;
  category: Category;
  publishedAt: string;
  views?: string;
}

export interface PhotoStory {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  photoCount: number;
  category: Category;
  publishedAt: string;
}

export interface OpinionArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  page?: number;
  limit?: number;
}
