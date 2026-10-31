from typing import TypeVar, List, Generic
from pydantic import BaseModel, Field

T = TypeVar("T")

class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1, description="Page number starting at 1")
    limit: int = Field(default=10, ge=1, le=100, description="Items per page (max 100)")

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.limit

def paginate_list(items: List[T], page: int = 1, limit: int = 10):
    total = len(items)
    total_pages = (total + limit - 1) // limit if total > 0 else 1
    start = (page - 1) * limit
    end = start + limit
    paginated_data = items[start:end]
    has_more = page < total_pages

    return {
        "data": paginated_data,
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": total_pages,
        "hasMore": has_more
    }
