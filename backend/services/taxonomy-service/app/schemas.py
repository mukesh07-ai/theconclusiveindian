from typing import Optional
from pydantic import BaseModel

class CategoryCreate(BaseModel):
    name: str
    english_name: str
    slug: str
    description: Optional[str] = None
    color: Optional[str] = "#1E3A8A"
    order: Optional[int] = 0
    is_active: Optional[bool] = True

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    english_name: Optional[str] = None
    description: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

class CategoryResponse(BaseModel):
    id: str
    name: str
    englishName: str
    slug: str
    description: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None
    isActive: bool = True

class TagCreate(BaseModel):
    name: str
    slug: str
    is_trending: Optional[bool] = False

class TagResponse(BaseModel):
    id: str
    name: str
    slug: str
    count: int
    isTrending: bool = False
