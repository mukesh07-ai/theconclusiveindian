import uuid
import math
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, desc, delete

from .db import get_db
from .models import (
    Article,
    ArticleTag,
    BreakingNews,
    VideoStoryModel,
    PhotoStoryModel,
    OpinionArticleModel,
)
from .schemas import (
    ArticleResponse,
    ArticleCreate,
    ArticleUpdate,
    ArticleStatusUpdate,
    CategoryRef,
    AuthorRef,
    BreakingNewsItem,
    BreakingNewsCreate,
    VideoStoryResponse,
    PhotoStoryResponse,
    OpinionArticleResponse,
    PaginatedArticleResponse,
)

router = APIRouter()

def article_to_response(a: Article) -> ArticleResponse:
    tags = [t.strip() for t in a.tags_csv.split(",") if t.strip()] if a.tags_csv else []
    return ArticleResponse(
        id=a.id,
        title=a.title,
        englishTitle=a.english_title,
        slug=a.slug,
        excerpt=a.excerpt,
        content=a.content,
        featuredImage=a.featured_image,
        imageAlt=a.image_alt,
        imageCaption=a.image_caption,
        imageCredit=a.image_credit,
        category=CategoryRef(
            id=f"cat-{a.category_slug}",
            name=a.category_name,
            slug=a.category_slug
        ),
        author=AuthorRef(
            id=f"auth-{a.author_slug}",
            name=a.author_name,
            slug=a.author_slug,
            role=a.author_role,
            avatar=a.author_avatar
        ),
        publishedAt=a.published_at.isoformat() if a.published_at else datetime.utcnow().isoformat(),
        updatedAt=a.updated_at.isoformat() if a.updated_at else None,
        status=a.status,
        tags=tags,
        isBreaking=a.is_breaking,
        isFeatured=a.is_featured,
        isTrending=a.is_trending,
        viewCount=a.view_count or 0,
        readTimeMinutes=a.read_time_minutes or 4,
        scheduledAt=a.scheduled_at.isoformat() if a.scheduled_at else None,
        editorialNotes=a.editorial_notes,
        approvedBy=a.approved_by,
        approvedAt=a.approved_at.isoformat() if a.approved_at else None,
        submittedAt=a.submitted_at.isoformat() if a.submitted_at else None,
        seoTitle=a.seo_title,
        metaDescription=a.meta_description,
        focusKeyword=a.focus_keyword,
        canonicalUrl=a.canonical_url,
        ogImage=a.og_image,
        noIndex=bool(a.no_index)
    )

# --- Articles Endpoints ---

@router.get("/api/v1/articles", response_model=PaginatedArticleResponse)
async def list_articles(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    tag: Optional[str] = None,
    author: Optional[str] = None,
    sort: Optional[str] = "latest",
    status_filter: Optional[str] = "published",
    db: AsyncSession = Depends(get_db)
):
    query = select(Article)

    # In public queries, only show published articles unless explicitly requested by admin
    if status_filter and status_filter.lower() != "all":
        query = query.where(Article.status == status_filter)

    if category:
        query = query.where(Article.category_slug == category.lower())

    if author:
        query = query.where(Article.author_slug == author.lower())

    if tag:
        clean_tag = tag.replace("#", "").lower()
        query = query.where(Article.tags_csv.ilike(f"%{clean_tag}%"))

    if sort == "trending":
        query = query.order_by(desc(Article.is_trending), desc(Article.view_count), desc(Article.published_at))
    else:
        query = query.order_by(desc(Article.published_at))

    # Total count
    count_res = await db.execute(query)
    all_matched = count_res.scalars().all()
    total = len(all_matched)

    total_pages = math.ceil(total / limit) if total > 0 else 1
    offset = (page - 1) * limit
    paged_items = all_matched[offset:offset + limit]

    return PaginatedArticleResponse(
        data=[article_to_response(a) for a in paged_items],
        total=total,
        page=page,
        limit=limit,
        totalPages=total_pages,
        hasMore=page < total_pages
    )

@router.get("/api/v1/articles/featured")
async def get_featured_articles(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Article)
        .where(and_(Article.status == "published", Article.is_featured == True))
        .order_by(desc(Article.published_at))
        .limit(5)
    )
    featured = result.scalars().all()
    if not featured:
        # Fallback to latest published
        fb_res = await db.execute(
            select(Article).where(Article.status == "published").order_by(desc(Article.published_at)).limit(5)
        )
        featured = fb_res.scalars().all()

    lead = article_to_response(featured[0]) if featured else None
    secondary = [article_to_response(a) for a in featured[1:4]] if len(featured) > 1 else []

    return {
        "lead": lead,
        "secondary": secondary
    }

@router.get("/api/v1/articles/trending", response_model=List[ArticleResponse])
async def get_trending_articles(limit: int = Query(5, ge=1, le=20), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Article)
        .where(Article.status == "published")
        .order_by(desc(Article.is_trending), desc(Article.view_count), desc(Article.published_at))
        .limit(limit)
    )
    trending = result.scalars().all()
    return [article_to_response(a) for a in trending]

@router.get("/api/v1/articles/search", response_model=PaginatedArticleResponse)
async def search_articles(
    q: str = Query(..., min_length=1),
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    query_str = f"%{q.strip().lower()}%"
    stmt = select(Article).where(
        and_(
            Article.status == "published",
            or_(
                Article.title.ilike(query_str),
                Article.english_title.ilike(query_str),
                Article.excerpt.ilike(query_str),
                Article.content.ilike(query_str),
                Article.tags_csv.ilike(query_str)
            )
        )
    )
    if category:
        stmt = stmt.where(Article.category_slug == category.lower())

    stmt = stmt.order_by(desc(Article.published_at))
    res = await db.execute(stmt)
    all_results = res.scalars().all()
    total = len(all_results)
    total_pages = math.ceil(total / limit) if total > 0 else 1
    offset = (page - 1) * limit
    paged = all_results[offset:offset + limit]

    return PaginatedArticleResponse(
        data=[article_to_response(a) for a in paged],
        total=total,
        page=page,
        limit=limit,
        totalPages=total_pages,
        hasMore=page < total_pages
    )

@router.get("/api/v1/articles/{slug}", response_model=ArticleResponse)
async def get_article_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Article).where(Article.slug == slug.lower()))
    article = result.scalar_one_or_none()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    # Increment view count
    article.view_count = (article.view_count or 0) + 1
    await db.commit()

    return article_to_response(article)

@router.get("/api/v1/articles/{slug}/related", response_model=List[ArticleResponse])
async def get_related_articles(slug: str, limit: int = Query(4, ge=1, le=10), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Article).where(Article.slug == slug.lower()))
    target = res.scalar_one_or_none()
    if not target:
        raise HTTPException(status_code=404, detail="Article not found")

    rel_res = await db.execute(
        select(Article)
        .where(
            and_(
                Article.id != target.id,
                Article.category_slug == target.category_slug,
                Article.status == "published"
            )
        )
        .order_by(desc(Article.published_at))
        .limit(limit)
    )
    related = rel_res.scalars().all()

    if len(related) < limit:
        remaining = limit - len(related)
        existing_ids = [target.id] + [r.id for r in related]
        fallback_res = await db.execute(
            select(Article)
            .where(and_(~Article.id.in_(existing_ids), Article.status == "published"))
            .order_by(desc(Article.published_at))
            .limit(remaining)
        )
        related = list(related) + list(fallback_res.scalars().all())

    return [article_to_response(a) for a in related]

# --- Admin Article Management ---

@router.post("/api/v1/admin/articles", response_model=ArticleResponse, status_code=201)
async def create_article(req: ArticleCreate, db: AsyncSession = Depends(get_db)):
    # Check slug uniqueness
    res = await db.execute(select(Article).where(Article.slug == req.slug.lower()))
    if res.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Article slug already exists")

    tags_str = ",".join([t.strip() for t in req.tags if t.strip()])
    new_article = Article(
        id=f"art-{uuid.uuid4().hex[:8]}",
        title=req.title,
        english_title=req.english_title,
        slug=req.slug.lower(),
        excerpt=req.excerpt,
        content=req.content,
        featured_image=req.featured_image,
        image_alt=req.image_alt,
        image_caption=req.image_caption,
        image_credit=req.image_credit,
        category_slug=req.category_slug.lower(),
        category_name=req.category_name,
        author_slug=req.author_slug.lower(),
        author_name=req.author_name,
        author_role=req.author_role,
        author_avatar=req.author_avatar,
        status=req.status or "published",
        tags_csv=tags_str,
        is_breaking=req.is_breaking or False,
        is_featured=req.is_featured or False,
        is_trending=req.is_trending or False,
        read_time_minutes=req.read_time_minutes or 4,
        scheduled_at=req.scheduled_at,
        published_at=datetime.utcnow() if req.status == "published" else None,
        submitted_at=datetime.utcnow() if req.status == "review" else None,
        editorial_notes=req.editorial_notes,
        seo_title=req.seo_title,
        meta_description=req.meta_description,
        focus_keyword=req.focus_keyword,
        canonical_url=req.canonical_url,
        og_image=req.og_image,
        no_index=req.no_index or False
    )
    db.add(new_article)
    await db.flush()

    if req.tags:
        for t in req.tags:
            tag_name = t.strip()
            if not tag_name:
                continue
            slug = tag_name.replace("#", "").lower().replace(" ", "-")
            tid = f"tag-{slug[:40]}"
            db.add(ArticleTag(article_id=new_article.id, tag_id=tid))

    await db.commit()
    await db.refresh(new_article)
    return article_to_response(new_article)

@router.put("/api/v1/admin/articles/{article_id}", response_model=ArticleResponse)
async def update_article(article_id: str, req: ArticleUpdate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Article).where(Article.id == article_id))
    art = res.scalar_one_or_none()
    if not art:
        raise HTTPException(status_code=404, detail="Article not found")

    if req.title is not None:
        art.title = req.title
    if req.english_title is not None:
        art.english_title = req.english_title
    if req.slug is not None:
        art.slug = req.slug.lower()
    if req.excerpt is not None:
        art.excerpt = req.excerpt
    if req.content is not None:
        art.content = req.content
    if req.featured_image is not None:
        art.featured_image = req.featured_image
    if req.image_alt is not None:
        art.image_alt = req.image_alt
    if req.image_caption is not None:
        art.image_caption = req.image_caption
    if req.image_credit is not None:
        art.image_credit = req.image_credit
    if req.category_slug is not None:
        art.category_slug = req.category_slug.lower()
    if req.category_name is not None:
        art.category_name = req.category_name
    if req.author_slug is not None:
        art.author_slug = req.author_slug.lower()
    if req.author_name is not None:
        art.author_name = req.author_name
    if req.tags is not None:
        art.tags_csv = ",".join([t.strip() for t in req.tags if t.strip()])
        await db.execute(delete(ArticleTag).where(ArticleTag.article_id == art.id))
        for t in req.tags:
            tag_name = t.strip()
            if not tag_name:
                continue
            slug = tag_name.replace("#", "").lower().replace(" ", "-")
            tid = f"tag-{slug[:40]}"
            db.add(ArticleTag(article_id=art.id, tag_id=tid))
    if req.status is not None:
        art.status = req.status
        if req.status == "published" and not art.published_at:
            art.published_at = datetime.utcnow()
        elif req.status == "review" and not art.submitted_at:
            art.submitted_at = datetime.utcnow()
    if req.editorial_notes is not None:
        art.editorial_notes = req.editorial_notes
    if req.seo_title is not None:
        art.seo_title = req.seo_title
    if req.meta_description is not None:
        art.meta_description = req.meta_description
    if req.focus_keyword is not None:
        art.focus_keyword = req.focus_keyword
    if req.canonical_url is not None:
        art.canonical_url = req.canonical_url
    if req.og_image is not None:
        art.og_image = req.og_image
    if req.no_index is not None:
        art.no_index = req.no_index
    if req.is_breaking is not None:
        art.is_breaking = req.is_breaking
    if req.is_featured is not None:
        art.is_featured = req.is_featured
    if req.is_trending is not None:
        art.is_trending = req.is_trending
    if req.read_time_minutes is not None:
        art.read_time_minutes = req.read_time_minutes
    if req.scheduled_at is not None:
        art.scheduled_at = req.scheduled_at

    await db.commit()
    await db.refresh(art)
    return article_to_response(art)

@router.patch("/api/v1/admin/articles/{article_id}/status", response_model=ArticleResponse)
async def update_article_status(article_id: str, req: ArticleStatusUpdate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Article).where(Article.id == article_id))
    art = res.scalar_one_or_none()
    if not art:
        raise HTTPException(status_code=404, detail="Article not found")

    art.status = req.status
    if req.status == "published" and not art.published_at:
        art.published_at = datetime.utcnow()
    elif req.status == "review":
        art.submitted_at = datetime.utcnow()
    elif req.status == "approved":
        art.approved_at = datetime.utcnow()
        if req.approved_by:
            art.approved_by = req.approved_by

    if req.editorial_notes is not None:
        art.editorial_notes = req.editorial_notes

    await db.commit()
    await db.refresh(art)
    return article_to_response(art)

@router.delete("/api/v1/admin/articles/{article_id}")
async def delete_article(article_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Article).where(Article.id == article_id))
    art = res.scalar_one_or_none()
    if not art:
        raise HTTPException(status_code=404, detail="Article not found")
    await db.delete(art)
    await db.commit()
    return {"success": True, "message": "Article deleted successfully"}

# --- Breaking News Live Ticker ---

@router.get("/api/v1/breaking-news", response_model=List[BreakingNewsItem])
async def get_breaking_news(db: AsyncSession = Depends(get_db)):
    res = await db.execute(
        select(BreakingNews).where(BreakingNews.is_active == True).order_by(desc(BreakingNews.created_at))
    )
    items = res.scalars().all()
    return [
        BreakingNewsItem(
            id=i.id,
            title=i.title,
            slug=i.slug,
            category=i.category,
            timestamp=i.timestamp_text,
            isUrgent=i.is_urgent
        )
        for i in items
    ]

@router.post("/api/v1/admin/breaking-news", response_model=BreakingNewsItem, status_code=201)
async def create_breaking_news(req: BreakingNewsCreate, db: AsyncSession = Depends(get_db)):
    new_bn = BreakingNews(
        id=f"bn-{uuid.uuid4().hex[:8]}",
        title=req.title,
        slug=req.slug,
        category=req.category or "देश",
        timestamp_text="अभी-अभी",
        is_urgent=req.is_urgent if req.is_urgent is not None else True,
        is_active=True
    )
    db.add(new_bn)
    await db.commit()
    await db.refresh(new_bn)
    return BreakingNewsItem(
        id=new_bn.id,
        title=new_bn.title,
        slug=new_bn.slug,
        category=new_bn.category,
        timestamp=new_bn.timestamp_text,
        isUrgent=new_bn.is_urgent
    )

@router.delete("/api/v1/admin/breaking-news/{item_id}")
async def delete_breaking_news(item_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(BreakingNews).where(BreakingNews.id == item_id))
    bn = res.scalar_one_or_none()
    if not bn:
        raise HTTPException(status_code=404, detail="Breaking news item not found")
    await db.delete(bn)
    await db.commit()
    return {"success": True, "message": "Breaking news item deleted"}

# --- Multimedia & Opinions ---

@router.get("/api/v1/multimedia/videos", response_model=List[VideoStoryResponse])
async def get_video_stories(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(VideoStoryModel).order_by(desc(VideoStoryModel.published_at)))
    videos = res.scalars().all()
    return [
        VideoStoryResponse(
            id=v.id,
            title=v.title,
            slug=v.slug,
            thumbnail=v.thumbnail,
            duration=v.duration,
            category=CategoryRef(id=f"cat-{v.category_slug}", name=v.category_name, slug=v.category_slug),
            publishedAt=v.published_at.isoformat(),
            views=v.views,
            youtubeId=v.youtube_id,
            youtubeUrl=v.youtube_url,
            isFeatured=v.is_featured,
            guest=v.guest,
            channelName=v.channel_name,
            description=v.description
        )
        for v in videos
    ]

@router.get("/api/v1/multimedia/photos", response_model=List[PhotoStoryResponse])
async def get_photo_stories(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(PhotoStoryModel).order_by(desc(PhotoStoryModel.published_at)))
    photos = res.scalars().all()
    return [
        PhotoStoryResponse(
            id=p.id,
            title=p.title,
            slug=p.slug,
            thumbnail=p.thumbnail,
            photoCount=p.photo_count,
            category=CategoryRef(id=f"cat-{p.category_slug}", name=p.category_name, slug=p.category_slug),
            publishedAt=p.published_at.isoformat()
        )
        for p in photos
    ]

@router.get("/api/v1/multimedia/opinions", response_model=List[OpinionArticleResponse])
async def get_opinions(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(OpinionArticleModel).order_by(desc(OpinionArticleModel.published_at)))
    opinions = res.scalars().all()
    return [
        OpinionArticleResponse(
            id=o.id,
            title=o.title,
            slug=o.slug,
            excerpt=o.excerpt,
            author=AuthorRef(
                id=f"auth-{o.author_slug}",
                name=o.author_name,
                slug=o.author_slug,
                role=o.author_role,
                avatar=o.author_avatar
            ),
            publishedAt=o.published_at.isoformat(),
            readTimeMinutes=o.read_time_minutes
        )
        for o in opinions
    ]
