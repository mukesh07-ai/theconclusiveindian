from enum import Enum
from typing import Generic, TypeVar, Optional, List, Any
from pydantic import BaseModel, Field
from datetime import datetime

T = TypeVar("T")

class UserRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    EDITOR_IN_CHIEF = "editor_in_chief"
    EDITOR = "editor"
    AUTHOR = "author"
    REPORTER = "reporter"
    MODERATOR = "moderator"
    READER = "reader"

class ArticleStatus(str, Enum):
    DRAFT = "draft"
    REVIEW = "review"
    SCHEDULED = "scheduled"
    PUBLISHED = "published"
    ARCHIVED = "archived"

class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    message: Optional[str] = None
    data: Optional[T] = None
    error: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class PaginationMeta(BaseModel):
    total: int
    page: int
    limit: int
    totalPages: int
    hasMore: bool

class PaginatedResult(BaseModel, Generic[T]):
    data: List[T]
    total: int
    page: int
    limit: int
    totalPages: int
    hasMore: bool

# Inter-service DTOs
class AuthorContract(BaseModel):
    id: str
    name: str
    slug: str
    role: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None

class CategoryContract(BaseModel):
    id: str
    name: str
    englishName: str
    slug: str
    description: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = 0

class BreakingNewsContract(BaseModel):
    id: str
    title: str
    slug: str
    category: str
    timestamp: str
    isUrgent: bool = False
