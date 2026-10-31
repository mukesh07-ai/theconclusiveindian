import json
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from .db import get_db
from .models import HomepageSection, SiteSetting, StaticPage, NavigationItem
from .schemas import (
    HomepageSectionDTO,
    HomepageSectionUpdate,
    NavigationItemDTO,
    StaticPageDTO,
    StaticPageUpdate,
    SiteConfigDTO,
)

router = APIRouter()

# --- Homepage Sections ---

@router.get("/api/v1/homepage/sections", response_model=List[HomepageSectionDTO])
async def get_homepage_sections(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(HomepageSection).order_by(HomepageSection.display_order.asc()))
    sections = res.scalars().all()
    out = []
    for s in sections:
        cfg = json.loads(s.config_json) if s.config_json else None
        out.append(HomepageSectionDTO(
            id=s.id,
            sectionType=s.section_type,
            title=s.title,
            displayOrder=s.display_order,
            isEnabled=s.is_enabled,
            config=cfg
        ))
    return out

@router.put("/api/v1/admin/homepage/sections/{section_id}", response_model=HomepageSectionDTO)
async def update_homepage_section(section_id: str, req: HomepageSectionUpdate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(HomepageSection).where(HomepageSection.id == section_id))
    sec = res.scalar_one_or_none()
    if not sec:
        raise HTTPException(status_code=404, detail="Homepage section not found")

    if req.title is not None:
        sec.title = req.title
    if req.displayOrder is not None:
        sec.display_order = req.displayOrder
    if req.isEnabled is not None:
        sec.is_enabled = req.isEnabled
    if req.config is not None:
        sec.config_json = json.dumps(req.config, ensure_ascii=False)

    await db.commit()
    await db.refresh(sec)
    return HomepageSectionDTO(
        id=sec.id,
        sectionType=sec.section_type,
        title=sec.title,
        displayOrder=sec.display_order,
        isEnabled=sec.is_enabled,
        config=json.loads(sec.config_json) if sec.config_json else None
    )

# --- Navigation ---

@router.get("/api/v1/navigation", response_model=Dict[str, List[NavigationItemDTO]])
async def get_navigation(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(NavigationItem).where(NavigationItem.is_active == True).order_by(NavigationItem.display_order.asc()))
    items = res.scalars().all()
    grouped: Dict[str, List[NavigationItemDTO]] = {}
    for item in items:
        loc = item.menu_location
        if loc not in grouped:
            grouped[loc] = []
        grouped[loc].append(NavigationItemDTO(
            id=item.id,
            menuLocation=item.menu_location,
            label=item.label,
            href=item.href,
            displayOrder=item.display_order,
            isActive=item.is_active
        ))
    return grouped

# --- Site Config ---

@router.get("/api/v1/site-config")
async def get_site_config(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(SiteSetting).where(SiteSetting.key == "global_site_config"))
    setting = res.scalar_one_or_none()
    if not setting:
        raise HTTPException(status_code=404, detail="Site config not found")
    return json.loads(setting.value_json)

@router.put("/api/v1/admin/site-config")
async def update_site_config(payload: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(SiteSetting).where(SiteSetting.key == "global_site_config"))
    setting = res.scalar_one_or_none()
    if not setting:
        setting = SiteSetting(key="global_site_config", value_json=json.dumps(payload, ensure_ascii=False))
        db.add(setting)
    else:
        setting.value_json = json.dumps(payload, ensure_ascii=False)

    await db.commit()
    return {"success": True, "message": "Site configuration updated successfully"}

# --- Static Pages ---

@router.get("/api/v1/pages", response_model=List[StaticPageDTO])
async def list_pages(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(StaticPage).order_by(StaticPage.title.asc()))
    pages = res.scalars().all()
    return [
        StaticPageDTO(
            slug=p.slug,
            title=p.title,
            hindiTitle=p.hindi_title,
            contentMarkdown=p.content_markdown,
            metaDescription=p.meta_description,
            updatedAt=p.updated_at.isoformat() if p.updated_at else None
        )
        for p in pages
    ]

@router.get("/api/v1/pages/{slug}", response_model=StaticPageDTO)
async def get_page(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(StaticPage).where(StaticPage.slug == slug.lower()))
    page = res.scalar_one_or_none()
    if not page:
        raise HTTPException(status_code=404, detail="Static page not found")
    return StaticPageDTO(
        slug=page.slug,
        title=page.title,
        hindiTitle=page.hindi_title,
        contentMarkdown=page.content_markdown,
        metaDescription=page.meta_description,
        updatedAt=page.updated_at.isoformat() if page.updated_at else None
    )

@router.put("/api/v1/admin/pages/{slug}", response_model=StaticPageDTO)
async def update_page(slug: str, req: StaticPageUpdate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(StaticPage).where(StaticPage.slug == slug.lower()))
    page = res.scalar_one_or_none()
    if not page:
        raise HTTPException(status_code=404, detail="Static page not found")

    if req.title is not None:
        page.title = req.title
    if req.hindiTitle is not None:
        page.hindi_title = req.hindiTitle
    if req.contentMarkdown is not None:
        page.content_markdown = req.contentMarkdown
    if req.metaDescription is not None:
        page.meta_description = req.metaDescription

    await db.commit()
    await db.refresh(page)
    return StaticPageDTO(
        slug=page.slug,
        title=page.title,
        hindiTitle=page.hindi_title,
        contentMarkdown=page.content_markdown,
        metaDescription=page.meta_description,
        updatedAt=page.updated_at.isoformat() if page.updated_at else None
    )
