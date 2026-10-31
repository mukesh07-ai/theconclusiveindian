from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from .db import engine, Base, async_session
from .models import Category, Tag
from .routes import router
from .config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Seed all 12 news categories
    async with async_session() as db:
        initial_categories = [
            {"id": "cat-world", "name": "विदेश", "english_name": "World", "slug": "world", "description": "अंतरराष्ट्रीय कूटनीति, वैश्विक घटनाएं और भारत से जुड़े मामले", "order": 1, "color": "#1E3A8A"},
            {"id": "cat-politics", "name": "राजनीति", "english_name": "Politics", "slug": "politics", "description": "संसद, चुनाव, राजनीतिक दल और रणनीतिक विश्लेषण", "order": 2, "color": "#DC2626"},
            {"id": "cat-entertainment", "name": "मनोरंजन", "english_name": "Entertainment", "slug": "entertainment", "description": "बॉलीवुड, ओटीटी रिलीज, समीक्षाएं, सेलिब्रिटी साक्षात्कार", "order": 3, "color": "#D97706"},
            {"id": "cat-agriculture", "name": "कृषि", "english_name": "Agriculture", "slug": "agriculture", "description": "किसान कल्याण, एमएसपी, आधुनिक खेती की तकनीक व मौसम पूर्वानुमान", "order": 4, "color": "#16A34A"},
            {"id": "cat-national", "name": "देश", "english_name": "National", "slug": "national", "description": "भारत भर से ताज़ा राजनीतिक, सामाजिक व जनहितकारी समाचार", "order": 5, "color": "#2563EB"},
            {"id": "cat-sports", "name": "खेल", "english_name": "Sports", "slug": "sports", "description": "क्रिकेट, फुटबॉल, ओलंपिक, बैडमिंटन और खेल जगत की रोमांचक खबरें", "order": 6, "color": "#059669"},
            {"id": "cat-business", "name": "व्यापार", "english_name": "Business", "slug": "business", "description": "शेयर बाजार, भारतीय अर्थव्यवस्था, स्टार्टअप्स और बैंकिंग जगत", "order": 7, "color": "#4F46E5"},
            {"id": "cat-education", "name": "शिक्षा", "english_name": "Education", "slug": "education", "description": "बोर्ड परीक्षाएं, प्रवेश परीक्षाएं (JEE, NEET, UPSC) व शिक्षा नीतियां", "order": 8, "color": "#7C3AED"},
            {"id": "cat-jobs", "name": "रोजगार", "english_name": "Jobs & Careers", "slug": "jobs", "description": "सरकारी नौकरियां, भर्ती सूचनाएं, करियर गाइडेंस व रोजगार अवसर", "order": 9, "color": "#0284C7"},
            {"id": "cat-tech", "name": "टेक्नोलॉजी", "english_name": "Technology", "slug": "tech", "description": "आर्टिफिशियल इंटेलिजेंस, स्मार्टफोन, गैजेट्स, साइबर सुरक्षा व इनोवेशन", "order": 10, "color": "#0D9488"},
            {"id": "cat-state", "name": "राज्य समाचार", "english_name": "State News", "slug": "state", "description": "उत्तर प्रदेश, बिहार, मध्य प्रदेश, राजस्थान व अन्य राज्यों की बड़ी खबरें", "order": 11, "color": "#EA580C"},
            {"id": "cat-health", "name": "स्वास्थ्य", "english_name": "Health & Lifestyle", "slug": "health", "description": "फिटनेस, आयुर्वेद, पोषण, मानसिक स्वास्थ्य व चिकित्सा अनुसंधान", "order": 12, "color": "#059669"},
        ]

        for cat in initial_categories:
            res = await db.execute(select(Category).where(Category.slug == cat["slug"]))
            if not res.scalar_one_or_none():
                db.add(Category(
                    id=cat["id"],
                    name=cat["name"],
                    english_name=cat["english_name"],
                    slug=cat["slug"],
                    description=cat["description"],
                    display_order=cat["order"],
                    color=cat["color"],
                    is_active=True
                ))

        initial_tags = [
            {"id": "tag-1", "name": "#शून्य_से_शिखर_तक", "slug": "shunya-se-shikhar-tak", "count": 28, "is_trending": True},
            {"id": "tag-2", "name": "#अजीत_डोभाल", "slug": "ajit-doval", "count": 19, "is_trending": True},
            {"id": "tag-3", "name": "#चंबल_सेंचुरी", "slug": "chambal-sanctuary", "count": 15, "is_trending": True},
            {"id": "tag-4", "name": "#बुंदेलखंड_पॉडकास्ट", "slug": "bundelkhand-podcast", "count": 12, "is_trending": True},
            {"id": "tag-5", "name": "#सोनम_वांगचुक", "slug": "sonam-wangchuk", "count": 10, "is_trending": True},
            {"id": "tag-6", "name": "#स्वामी_दर्शन_भारती", "slug": "swami-darshan-bharti", "count": 9, "is_trending": True},
            {"id": "tag-7", "name": "#उम्मेदाराम_बेनीवाल", "slug": "umedaram-beniwal", "count": 8, "is_trending": True},
        ]

        for t in initial_tags:
            res = await db.execute(select(Tag).where((Tag.slug == t["slug"]) | (Tag.name == t["name"])))
            if not res.scalar_one_or_none():
                db.add(Tag(
                    id=t["id"],
                    name=t["name"],
                    slug=t["slug"],
                    usage_count=t["count"],
                    is_trending=t["is_trending"]
                ))

        await db.commit()

    yield
    await engine.dispose()

app = FastAPI(
    title=settings.SERVICE_NAME,
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": settings.SERVICE_NAME,
        "database": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
