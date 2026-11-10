from typing import List, Optional, Generic, TypeVar
from datetime import datetime
from pydantic import BaseModel

T = TypeVar("T")

class CategoryRef(BaseModel):
    id: str
    name: str
    englishName: Optional[str] = None
    slug: str

class AuthorRef(BaseModel):
    id: str
    name: str
    slug: str
    role: Optional[str] = None
    avatar: Optional[str] = None

class ArticleResponse(BaseModel):
    id: str
    title: str
    englishTitle: Optional[str] = None
    slug: str
    excerpt: str
    content: str
    featuredImage: str
    imageAlt: str
    imageCaption: Optional[str] = None
    imageCredit: Optional[str] = None
    category: CategoryRef
    author: AuthorRef
    publishedAt: str
    updatedAt: Optional[str] = None
    status: str
    tags: List[str]
    isBreaking: bool = False
    isFeatured: bool = False
    isTrending: bool = False
    viewCount: int = 0
    readTimeMinutes: int = 4
    scheduledAt: Optional[str] = None
    editorialNotes: Optional[str] = None
    approvedBy: Optional[str] = None
    approvedAt: Optional[str] = None
    submittedAt: Optional[str] = None
    seoTitle: Optional[str] = None
    metaDescription: Optional[str] = None
    focusKeyword: Optional[str] = None
    canonicalUrl: Optional[str] = None
    ogImage: Optional[str] = None
    noIndex: bool = False

class ArticleCreate(BaseModel):
    title: str
    english_title: Optional[str] = None
    slug: str
    excerpt: str
    content: str
    featured_image: str
    image_alt: str
    image_caption: Optional[str] = None
    image_credit: Optional[str] = None
    category_slug: str
    category_name: str
    author_slug: str
    author_name: str
    author_role: Optional[str] = None
    author_avatar: Optional[str] = None
    tags: List[str] = []
    status: Optional[str] = "published"
    is_breaking: Optional[bool] = False
    is_featured: Optional[bool] = False
    is_trending: Optional[bool] = False
    read_time_minutes: Optional[int] = 4
    scheduled_at: Optional[datetime] = None
    editorial_notes: Optional[str] = None
    seo_title: Optional[str] = None
    meta_description: Optional[str] = None
    focus_keyword: Optional[str] = None
    canonical_url: Optional[str] = None
    og_image: Optional[str] = None
    no_index: Optional[bool] = False

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    english_title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    image_alt: Optional[str] = None
    image_caption: Optional[str] = None
    image_credit: Optional[str] = None
    category_slug: Optional[str] = None
    category_name: Optional[str] = None
    author_slug: Optional[str] = None
    author_name: Optional[str] = None
    author_role: Optional[str] = None
    author_avatar: Optional[str] = None
    tags: Optional[List[str]] = None
    status: Optional[str] = None
    is_breaking: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_trending: Optional[bool] = None
    read_time_minutes: Optional[int] = None
    scheduled_at: Optional[datetime] = None
    editorial_notes: Optional[str] = None
    seo_title: Optional[str] = None
    meta_description: Optional[str] = None
    focus_keyword: Optional[str] = None
    canonical_url: Optional[str] = None
    og_image: Optional[str] = None
    no_index: Optional[bool] = None

class ArticleStatusUpdate(BaseModel):
    status: str # draft, review, approved, scheduled, published, archived
    editorial_notes: Optional[str] = None
    approved_by: Optional[str] = None

class BreakingNewsItem(BaseModel):
    id: str
    title: str
    slug: str
    category: str
    timestamp: str
    isUrgent: bool = True

class BreakingNewsCreate(BaseModel):
    title: str
    slug: str
    category: Optional[str] = "देश"
    is_urgent: Optional[bool] = True

class VideoStoryResponse(BaseModel):
    id: str
    title: str
    slug: str
    thumbnail: str
    duration: str
    category: CategoryRef
    publishedAt: str
    views: Optional[str] = None
    youtubeId: Optional[str] = None
    youtubeUrl: Optional[str] = None
    isFeatured: Optional[bool] = False
    guest: Optional[str] = None
    channelName: Optional[str] = None
    description: Optional[str] = None

class PhotoStoryResponse(BaseModel):
    id: str
    title: str
    slug: str
    thumbnail: str
    photoCount: int
    category: CategoryRef
    publishedAt: str

class OpinionArticleResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str
    author: AuthorRef
    publishedAt: str
    readTimeMinutes: int

class PaginatedArticleResponse(BaseModel):
    data: List[ArticleResponse]
    total: int
    page: int
    limit: int
    totalPages: int
    hasMore: bool
