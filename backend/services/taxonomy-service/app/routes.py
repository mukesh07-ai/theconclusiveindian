from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .db import get_db
from .models import Category, Tag
from .schemas import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse,
    TagCreate,
    TagResponse,
)

router = APIRouter()

def category_to_response(c: Category) -> CategoryResponse:
    return CategoryResponse(
        id=c.id,
        name=c.name,
        englishName=c.english_name,
        slug=c.slug,
        description=c.description,
        color=c.color,
        order=c.display_order,
        isActive=c.is_active
    )

def tag_to_response(t: Tag) -> TagResponse:
    return TagResponse(
        id=t.id,
        name=t.name,
        slug=t.slug,
        count=t.usage_count,
        isTrending=t.is_trending
    )

@router.get("/api/v1/categories", response_model=List[CategoryResponse])
async def list_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Category)
        .where(Category.is_active == True)
        .order_by(Category.display_order.asc(), Category.name.asc())
    )
    categories = result.scalars().all()
    return [category_to_response(c) for c in categories]

@router.get("/api/v1/categories/{slug}", response_model=CategoryResponse)
async def get_category_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Category).where(Category.slug == slug.lower())
    )
    category = result.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category_to_response(category)

@router.post("/api/v1/admin/categories", response_model=CategoryResponse, status_code=201)
async def create_category(req: CategoryCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.slug == req.slug.lower()))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Category slug already exists")

    new_cat = Category(
        id=f"cat-{req.slug.lower()}",
        name=req.name,
        english_name=req.english_name,
        slug=req.slug.lower(),
        description=req.description,
        color=req.color or "#1E3A8A",
        display_order=req.order or 0,
        is_active=req.is_active if req.is_active is not None else True
    )
    db.add(new_cat)
    await db.commit()
    await db.refresh(new_cat)
    return category_to_response(new_cat)

@router.put("/api/v1/admin/categories/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: str, req: CategoryUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    cat = result.scalar_one_or_none()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")

    if req.name is not None:
        cat.name = req.name
    if req.english_name is not None:
        cat.english_name = req.english_name
    if req.description is not None:
        cat.description = req.description
    if req.color is not None:
        cat.color = req.color
    if req.order is not None:
        cat.display_order = req.order
    if req.is_active is not None:
        cat.is_active = req.is_active

    await db.commit()
    await db.refresh(cat)
    return category_to_response(cat)

@router.delete("/api/v1/admin/categories/{category_id}")
async def delete_category(category_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    cat = result.scalar_one_or_none()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    await db.delete(cat)
    await db.commit()
    return {"success": True, "message": "Category deleted successfully"}

@router.get("/api/v1/tags", response_model=List[TagResponse])
async def list_tags(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tag).order_by(Tag.usage_count.desc()))
    tags = result.scalars().all()
    return [tag_to_response(t) for t in tags]

@router.post("/api/v1/admin/tags", response_model=TagResponse, status_code=201)
async def create_tag(req: TagCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tag).where(Tag.slug == req.slug.lower()))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Tag slug already exists")

    new_tag = Tag(
        id=f"tag-{req.slug.lower()}",
        name=req.name,
        slug=req.slug.lower(),
        is_trending=req.is_trending or False,
        usage_count=1
    )
    db.add(new_tag)
    await db.commit()
    await db.refresh(new_tag)
    return tag_to_response(new_tag)
