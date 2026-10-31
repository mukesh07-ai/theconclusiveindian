from typing import Optional
from pydantic import BaseModel, ConfigDict

class AuthorCreate(BaseModel):
    name: str
    english_name: Optional[str] = None
    slug: str
    role: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None

class AuthorUpdate(BaseModel):
    name: Optional[str] = None
    english_name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None

class AuthorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    english_name: Optional[str] = None
    slug: str
    role: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None
