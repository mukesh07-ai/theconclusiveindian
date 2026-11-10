import json
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_, delete

from .db import get_db
from .models import (
    HomepageSection,
    SiteSetting,
    StaticPage,
    NavigationItem,
    Advertisement,
    UrlRedirect,
)
from .schemas import (
    HomepageSectionDTO,
    HomepageSectionCreate,
    HomepageSectionUpdate,
    NavigationItemDTO,
    NavigationUpdate,
    StaticPageDTO,
    StaticPageCreate,
    StaticPageUpdate,
    SiteConfigDTO,
    AdvertisementDTO,
    AdvertisementCreate,
    AdvertisementUpdate,
    UrlRedirectDTO,
    UrlRedirectCreate,
)

router = APIRouter()

def ad_to_dto(ad: Advertisement) -> AdvertisementDTO:
    placements = [p.strip() for p in ad.placement_positions.split(",") if p.strip()] if ad.placement_positions else []
    ctr = round((ad.clicks_count / ad.impressions_count * 100), 2) if (ad.impressions_count and ad.impressions_count > 0) else 0.0
    return AdvertisementDTO(
        id=ad.id,
        title=ad.title,
        advertiserName=ad.advertiser_name,
        destinationUrl=ad.destination_url,
        creativeDesktopUrl=ad.creative_desktop_url,
        creativeMobileUrl=ad.creative_mobile_url,
        placementPositions=placements,
        adType=ad.ad_type or "image_banner",
        startDate=ad.start_date.isoformat() if ad.start_date else None,
        endDate=ad.end_date.isoformat() if ad.end_date else None,
        priority=ad.priority or 1,
        isActive=bool(ad.is_active),
        impressionsCount=ad.impressions_count or 0,
        clicksCount=ad.clicks_count or 0,
        ctr=ctr,
        createdAt=ad.created_at.isoformat() if ad.created_at else None
    )

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

@router.post("/api/v1/admin/homepage/sections", response_model=HomepageSectionDTO, status_code=status.HTTP_201_CREATED)
async def create_homepage_section(req: HomepageSectionCreate, db: AsyncSession = Depends(get_db)):
    sec_id = req.id or f"sec-{uuid.uuid4().hex[:8]}"
    sec = HomepageSection(
        id=sec_id,
        section_type=req.sectionType,
        title=req.title,
        display_order=req.displayOrder or 0,
        is_enabled=req.isEnabled if req.isEnabled is not None else True,
        config_json=json.dumps(req.config, ensure_ascii=False) if req.config else "{}"
    )
    db.add(sec)
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

@router.delete("/api/v1/admin/homepage/sections/{section_id}")
async def delete_homepage_section(section_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(HomepageSection).where(HomepageSection.id == section_id))
    sec = res.scalar_one_or_none()
    if not sec:
        raise HTTPException(status_code=404, detail="Section not found")
    await db.delete(sec)
    await db.commit()
    return {"success": True, "message": "Section deleted successfully"}

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

@router.post("/api/v1/admin/navigation", response_model=NavigationItemDTO, status_code=status.HTTP_201_CREATED)
async def create_navigation_item(payload: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    new_item = NavigationItem(
        id=f"nav-{uuid.uuid4().hex[:8]}",
        menu_location=payload.get("menuLocation", "header"),
        label=payload.get("label", ""),
        href=payload.get("href", "/"),
        display_order=payload.get("displayOrder", 0),
        is_active=payload.get("isActive", True)
    )
    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)
    return NavigationItemDTO(
        id=new_item.id,
        menuLocation=new_item.menu_location,
        label=new_item.label,
        href=new_item.href,
        displayOrder=new_item.display_order,
        isActive=new_item.is_active
    )

@router.put("/api/v1/admin/navigation")
async def update_navigation(req: NavigationUpdate, db: AsyncSession = Depends(get_db)):
    for it in req.items:
        res = await db.execute(select(NavigationItem).where(NavigationItem.id == it.id))
        item = res.scalar_one_or_none()
        if item:
            item.label = it.label
            item.href = it.href
            item.display_order = it.displayOrder
            item.is_active = it.isActive
    await db.commit()
    return {"success": True, "message": "Navigation updated successfully"}

@router.delete("/api/v1/admin/navigation/{item_id}")
async def delete_navigation_item(item_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(NavigationItem).where(NavigationItem.id == item_id))
    item = res.scalar_one_or_none()
    if item:
        await db.delete(item)
        await db.commit()
    return {"success": True, "message": "Navigation item removed"}

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

@router.post("/api/v1/admin/pages", response_model=StaticPageDTO, status_code=status.HTTP_201_CREATED)
async def create_page(req: StaticPageCreate, db: AsyncSession = Depends(get_db)):
    clean_slug = req.slug.strip().lower().replace(" ", "-")
    existing = await db.execute(select(StaticPage).where(StaticPage.slug == clean_slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Page with this slug already exists")

    page = StaticPage(
        slug=clean_slug,
        title=req.title,
        hindi_title=req.hindiTitle,
        content_markdown=req.contentMarkdown,
        meta_description=req.metaDescription
    )
    db.add(page)
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

@router.delete("/api/v1/admin/pages/{slug}")
async def delete_page(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(StaticPage).where(StaticPage.slug == slug.lower()))
    page = res.scalar_one_or_none()
    if not page:
        raise HTTPException(status_code=404, detail="Static page not found")
    await db.delete(page)
    await db.commit()
    return {"success": True, "message": "Page deleted successfully"}

# --- Advertisement Endpoints ---

@router.get("/api/v1/ads", response_model=List[AdvertisementDTO])
async def list_active_ads(
    placement: Optional[str] = Query(None, description="Placement filter e.g. header, homepage_top, sidebar"),
    db: AsyncSession = Depends(get_db)
):
    now = datetime.utcnow()
    query = select(Advertisement).where(Advertisement.is_active == True)

    if placement:
        query = query.where(Advertisement.placement_positions.ilike(f"%{placement}%"))

    # Check date active
    query = query.where(
        or_(Advertisement.start_date == None, Advertisement.start_date <= now),
        or_(Advertisement.end_date == None, Advertisement.end_date >= now)
    )

    query = query.order_by(Advertisement.priority.desc(), Advertisement.created_at.desc())
    res = await db.execute(query)
    ads = res.scalars().all()
    return [ad_to_dto(ad) for ad in ads]

@router.post("/api/v1/ads/{ad_id}/impression")
async def record_ad_impression(ad_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Advertisement).where(Advertisement.id == ad_id))
    ad = res.scalar_one_or_none()
    if ad:
        ad.impressions_count = (ad.impressions_count or 0) + 1
        await db.commit()
    return {"success": True}

@router.get("/api/v1/ads/{ad_id}/click")
async def track_ad_click(ad_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Advertisement).where(Advertisement.id == ad_id))
    ad = res.scalar_one_or_none()
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    ad.clicks_count = (ad.clicks_count or 0) + 1
    await db.commit()
    return {"destinationUrl": ad.destination_url}

@router.get("/api/v1/admin/ads", response_model=List[AdvertisementDTO])
async def admin_list_ads(
    status: Optional[str] = None,
    placement: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Advertisement)
    if status == "active":
        query = query.where(Advertisement.is_active == True)
    elif status == "inactive":
        query = query.where(Advertisement.is_active == False)

    if placement:
        query = query.where(Advertisement.placement_positions.ilike(f"%{placement}%"))

    query = query.order_by(Advertisement.created_at.desc())
    res = await db.execute(query)
    ads = res.scalars().all()
    return [ad_to_dto(ad) for ad in ads]

@router.post("/api/v1/admin/ads", response_model=AdvertisementDTO, status_code=status.HTTP_201_CREATED)
async def admin_create_ad(req: AdvertisementCreate, db: AsyncSession = Depends(get_db)):
    start_dt = datetime.fromisoformat(req.startDate.replace("Z", "+00:00")) if req.startDate else None
    end_dt = datetime.fromisoformat(req.endDate.replace("Z", "+00:00")) if req.endDate else None

    ad = Advertisement(
        id=f"ad-{uuid.uuid4().hex[:10]}",
        title=req.title,
        advertiser_name=req.advertiserName,
        destination_url=req.destinationUrl,
        creative_desktop_url=req.creativeDesktopUrl,
        creative_mobile_url=req.creativeMobileUrl,
        placement_positions=",".join(req.placementPositions),
        ad_type=req.adType or "image_banner",
        start_date=start_dt,
        end_date=end_dt,
        priority=req.priority or 1,
        is_active=req.isActive if req.isActive is not None else True,
        impressions_count=0,
        clicks_count=0
    )
    db.add(ad)
    await db.commit()
    await db.refresh(ad)
    return ad_to_dto(ad)

@router.put("/api/v1/admin/ads/{ad_id}", response_model=AdvertisementDTO)
async def admin_update_ad(ad_id: str, req: AdvertisementUpdate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Advertisement).where(Advertisement.id == ad_id))
    ad = res.scalar_one_or_none()
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")

    if req.title is not None:
        ad.title = req.title
    if req.advertiserName is not None:
        ad.advertiser_name = req.advertiserName
    if req.destinationUrl is not None:
        ad.destination_url = req.destinationUrl
    if req.creativeDesktopUrl is not None:
        ad.creative_desktop_url = req.creativeDesktopUrl
    if req.creativeMobileUrl is not None:
        ad.creative_mobile_url = req.creativeMobileUrl
    if req.placementPositions is not None:
        ad.placement_positions = ",".join(req.placementPositions)
    if req.adType is not None:
        ad.ad_type = req.adType
    if req.startDate is not None:
        ad.start_date = datetime.fromisoformat(req.startDate.replace("Z", "+00:00")) if req.startDate else None
    if req.endDate is not None:
        ad.end_date = datetime.fromisoformat(req.endDate.replace("Z", "+00:00")) if req.endDate else None
    if req.priority is not None:
        ad.priority = req.priority
    if req.isActive is not None:
        ad.is_active = req.isActive

    ad.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(ad)
    return ad_to_dto(ad)

@router.patch("/api/v1/admin/ads/{ad_id}/status", response_model=AdvertisementDTO)
async def admin_toggle_ad_status(ad_id: str, payload: Dict[str, bool], db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Advertisement).where(Advertisement.id == ad_id))
    ad = res.scalar_one_or_none()
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")

    is_active = payload.get("isActive", not ad.is_active)
    ad.is_active = is_active
    ad.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(ad)
    return ad_to_dto(ad)

@router.delete("/api/v1/admin/ads/{ad_id}")
async def admin_delete_ad(ad_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Advertisement).where(Advertisement.id == ad_id))
    ad = res.scalar_one_or_none()
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    await db.delete(ad)
    await db.commit()
    return {"success": True, "message": "Advertisement deleted successfully"}

# --- URL Redirects Endpoints ---

@router.get("/api/v1/redirects/resolve")
async def resolve_redirect(path: str = Query(..., description="Original path to resolve"), db: AsyncSession = Depends(get_db)):
    clean_path = path.strip()
    res = await db.execute(select(UrlRedirect).where(UrlRedirect.source_path == clean_path))
    redir = res.scalar_one_or_none()
    if redir:
        return {"hasRedirect": True, "targetPath": redir.target_path, "statusCode": redir.status_code}
    return {"hasRedirect": False}

@router.get("/api/v1/admin/redirects", response_model=List[UrlRedirectDTO])
async def list_redirects(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(UrlRedirect).order_by(UrlRedirect.created_at.desc()))
    redirs = res.scalars().all()
    return [
        UrlRedirectDTO(
            id=r.id,
            sourcePath=r.source_path,
            targetPath=r.target_path,
            statusCode=r.status_code,
            createdAt=r.created_at.isoformat() if r.created_at else None
        )
        for r in redirs
    ]

@router.post("/api/v1/admin/redirects", response_model=UrlRedirectDTO, status_code=status.HTTP_201_CREATED)
async def create_redirect(req: UrlRedirectCreate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(UrlRedirect).where(UrlRedirect.source_path == req.sourcePath))
    existing = res.scalar_one_or_none()
    if existing:
        existing.target_path = req.targetPath
        existing.status_code = req.statusCode or 301
        await db.commit()
        await db.refresh(existing)
        return UrlRedirectDTO(
            id=existing.id,
            sourcePath=existing.source_path,
            targetPath=existing.target_path,
            statusCode=existing.status_code,
            createdAt=existing.created_at.isoformat() if existing.created_at else None
        )

    redir = UrlRedirect(
        id=f"redir-{uuid.uuid4().hex[:8]}",
        source_path=req.sourcePath,
        target_path=req.targetPath,
        status_code=req.statusCode or 301
    )
    db.add(redir)
    await db.commit()
    await db.refresh(redir)
    return UrlRedirectDTO(
        id=redir.id,
        sourcePath=redir.source_path,
        targetPath=redir.target_path,
        statusCode=redir.status_code,
        createdAt=redir.created_at.isoformat() if redir.created_at else None
    )

@router.delete("/api/v1/admin/redirects/{id}")
async def delete_redirect(id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(UrlRedirect).where(UrlRedirect.id == id))
    redir = res.scalar_one_or_none()
    if redir:
        await db.delete(redir)
        await db.commit()
    return {"success": True, "message": "Redirect rule deleted successfully"}
