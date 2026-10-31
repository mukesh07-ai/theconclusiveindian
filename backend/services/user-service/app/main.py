from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from .db import engine, Base, async_session
from .models import Author
from .routes import router
from .config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Seed initial editorial authors
    async with async_session() as db:
        initial_authors = [
            {
                "id": "auth-raghavendra-shukla",
                "name": "राघवेंद्र शुक्ल",
                "english_name": "Raghavendra Shukla",
                "slug": "raghavendra-shukla",
                "role": "विशेष संवाददाता (पर्यावरण व ग्रामीण विकास)",
                "bio": "पर्यावरण, चंबल संरक्षण और ग्रामीण भारत पर 15 वर्षों से निरंतर ग्राउंड रिपोर्टिंग।",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                "twitter": "https://twitter.com/raghavendra_tci",
                "email": "raghavendra@theconclusiveindian.in"
            },
            {
                "id": "auth-meenakshi-joshi",
                "name": "मीनाक्षी जोशी",
                "english_name": "Meenakshi Joshi",
                "slug": "meenakshi-joshi",
                "role": "वरिष्ठ राजनीतिक विश्लेषक व ब्यूरो चीफ",
                "bio": "भारतीय संसद, चुनावी रणनीतियों और संवैधानिक नीतिगत मामलों की सूक्ष्म विश्लेषक।",
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                "twitter": "https://twitter.com/meenakshi_tci",
                "email": "meenakshi@theconclusiveindian.in"
            },
            {
                "id": "auth-vikram-singh",
                "name": "विक्रम सिंह",
                "english_name": "Vikram Singh",
                "slug": "vikram-singh",
                "role": "प्रमुख रक्षा व सामरिक विशेषज्ञ",
                "bio": "राष्ट्रीय सुरक्षा, सीमावर्ती आधारभूत संरचना और कूटनीतिक रणनीतियों पर गहन शोधपरक लेखन।",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                "twitter": "https://twitter.com/vikram_tci",
                "email": "vikram@theconclusiveindian.in"
            },
            {
                "id": "auth-priya-sharma",
                "name": "प्रिया शर्मा",
                "english_name": "Priya Sharma",
                "slug": "priya-sharma",
                "role": "आर्थिक व कृषि मामलों की संपादक",
                "bio": "भारतीय अर्थव्यवस्था, एमएसपी नीति, स्टार्टअप्स और कृषि तकनीक नवाचारों की विशेषज्ञ।",
                "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956",
                "twitter": "https://twitter.com/priya_tci",
                "email": "priya@theconclusiveindian.in"
            }
        ]

        for auth_data in initial_authors:
            res = await db.execute(select(Author).where(Author.slug == auth_data["slug"]))
            if not res.scalar_one_or_none():
                db.add(Author(**auth_data))
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
