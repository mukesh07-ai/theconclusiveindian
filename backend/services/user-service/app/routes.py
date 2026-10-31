from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .db import get_db
from .models import Author
from .schemas import AuthorCreate, AuthorUpdate, AuthorResponse

router = APIRouter()

@router.get("/api/v1/authors", response_model=List[AuthorResponse])
async def list_authors(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Author).order_by(Author.name))
    authors = result.scalars().all()
    return authors

@router.get("/api/v1/authors/{slug}", response_model=AuthorResponse)
async def get_author_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Author).where(Author.slug == slug.lower()))
    author = result.scalar_one_or_none()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

@router.post("/api/v1/admin/authors", response_model=AuthorResponse, status_code=201)
async def create_author(req: AuthorCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Author).where(Author.slug == req.slug.lower()))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Author slug already exists")

    new_author = Author(
        id=f"auth-{req.slug.lower()}",
        name=req.name,
        english_name=req.english_name,
        slug=req.slug.lower(),
        role=req.role,
        bio=req.bio,
        avatar=req.avatar,
        twitter=req.twitter,
        email=req.email
    )
    db.add(new_author)
    await db.commit()
    await db.refresh(new_author)
    return new_author

@router.put("/api/v1/admin/authors/{author_id}", response_model=AuthorResponse)
async def update_author(author_id: str, req: AuthorUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Author).where(Author.id == author_id))
    author = result.scalar_one_or_none()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")

    if req.name is not None:
        author.name = req.name
    if req.english_name is not None:
        author.english_name = req.english_name
    if req.role is not None:
        author.role = req.role
    if req.bio is not None:
        author.bio = req.bio
    if req.avatar is not None:
        author.avatar = req.avatar
    if req.twitter is not None:
        author.twitter = req.twitter
    if req.email is not None:
        author.email = req.email

    await db.commit()
    await db.refresh(author)
    return author

@router.delete("/api/v1/admin/authors/{author_id}")
async def delete_author(author_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Author).where(Author.id == author_id))
    author = result.scalar_one_or_none()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    await db.delete(author)
    await db.commit()
    return {"success": True, "message": "Author deleted successfully"}
