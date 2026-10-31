import json
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from .db import engine, Base, async_session
from .models import HomepageSection, SiteSetting, StaticPage, NavigationItem
from .routes import router
from .config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Seed initial sections, settings, and pages
    async with async_session() as db:
        # Check sections
        res = await db.execute(select(HomepageSection).limit(1))
        if not res.scalar_one_or_none():
            seed_sections = [
                {"id": "sec-hero", "section_type": "hero", "title": "लीड स्टोरी एवं मुख्य समाचार", "display_order": 1, "is_enabled": True, "config_json": json.dumps({"layout": "lead_with_sidebar", "showBadge": True})},
                {"id": "sec-ticker", "section_type": "breaking_news", "title": "लाइव ब्रेकिंग न्यूज़ टिकर", "display_order": 2, "is_enabled": True, "config_json": json.dumps({"speed": "normal", "pauseOnHover": True})},
                {"id": "sec-latest", "section_type": "latest_list", "title": "ताज़ा ख़बरें (Latest News)", "display_order": 3, "is_enabled": True, "config_json": json.dumps({"limit": 8, "showThumbnails": True})},
                {"id": "sec-category-state", "section_type": "category_grid", "title": "राज्य व प्रादेशिक समाचार", "display_order": 4, "is_enabled": True, "config_json": json.dumps({"categorySlug": "state", "limit": 4})},
                {"id": "sec-multimedia", "section_type": "multimedia", "title": "मल्टीमीडिया: वीडियो एवं फ़ोटो स्टोरी", "display_order": 5, "is_enabled": True, "config_json": json.dumps({"showYoutubeEmbed": True})},
                {"id": "sec-opinions", "section_type": "opinion_desk", "title": "संपादकीय एवं विशेष विचार स्तम्भ", "display_order": 6, "is_enabled": True, "config_json": json.dumps({"limit": 3})},
                {"id": "sec-newsletter", "section_type": "newsletter", "title": "दैनिक समाचार बुलेटिन सदस्यता", "display_order": 7, "is_enabled": True, "config_json": json.dumps({"incentiveText": "हर सुबह भारत की प्रामाणिक खबरें सीधे अपने इनबॉक्स में पाएं"})},
            ]
            for s in seed_sections:
                db.add(HomepageSection(**s))

        # Check site settings
        res_cfg = await db.execute(select(SiteSetting).where(SiteSetting.key == "global_site_config"))
        if not res_cfg.scalar_one_or_none():
            site_cfg_data = {
                "name": "The Conclusive Indian",
                "hindiName": "द कन्क्लूसिव इंडियन",
                "tagline": "निष्पक्ष • निर्भीक • निर्णायक",
                "englishTagline": "The Voice of Truth, Depth & Impact",
                "description": "द कन्क्लूसिव इंडियन - भारत का विश्वसनीय और निष्पक्ष हिंदी डिजिटल समाचार मंच।",
                "url": "https://theconclusiveindian.in",
                "editorialEmail": "editor@theconclusiveindian.in",
                "contactEmail": "contact@theconclusiveindian.in",
                "phone": "+91 11 4872 9000",
                "address": {
                    "street": "प्रेस एन्क्लेव, 4th फ्लोर, मीडिया टावर, कस्तूरबा गांधी मार्ग",
                    "city": "नई दिल्ली",
                    "state": "दिल्ली",
                    "pin": "110001",
                    "country": "भारत"
                },
                "social": {
                    "twitter": "https://x.com/tci2024",
                    "facebook": "https://www.facebook.com/theconclusiveindian",
                    "instagram": "https://www.instagram.com/theconclusiveindian",
                    "youtube": "https://www.youtube.com/@theconclusiveindian",
                    "whatsapp": "https://whatsapp.com/channel/theconclusiveindian",
                    "telegram": "https://t.me/theconclusiveindian"
                },
                "compliance": {
                    "grievanceOfficer": {
                        "name": "श्री आलोक नारायण",
                        "title": "नामित शिकायत निवारण अधिकारी (Grievance Officer)",
                        "email": "grievance@theconclusiveindian.in",
                        "responseWindow": "24 घंटे में पावती, 15 कार्यदिवसों में समाधान",
                        "address": "प्रेस एन्क्लेव, 4th फ्लोर, मीडिया टावर, कस्तूरबा गांधी मार्ग, नई दिल्ली - 110001"
                    },
                    "itRules2021": True,
                    "pressCouncilEthics": True
                },
                "businessVerification": {
                    "isRegisteredEntityVerified": True,
                    "entityName": "The Conclusive Indian Media Network Private Limited",
                    "registrationNumber": "CIN: U22120DL2024PTC123456"
                }
            }
            db.add(SiteSetting(key="global_site_config", value_json=json.dumps(site_cfg_data, ensure_ascii=False)))

        # Check navigation
        res_nav = await db.execute(select(NavigationItem).limit(1))
        if not res_nav.scalar_one_or_none():
            seed_nav = [
                {"id": "nav-1", "menu_location": "header", "label": "विदेश", "href": "/category/world", "display_order": 1, "is_active": True},
                {"id": "nav-2", "menu_location": "header", "label": "राजनीति", "href": "/category/politics", "display_order": 2, "is_active": True},
                {"id": "nav-3", "menu_location": "header", "label": "मनोरंजन", "href": "/category/entertainment", "display_order": 3, "is_active": True},
                {"id": "nav-4", "menu_location": "header", "label": "कृषि", "href": "/category/agriculture", "display_order": 4, "is_active": True},
                {"id": "nav-5", "menu_location": "header", "label": "देश", "href": "/category/national", "display_order": 5, "is_active": True},
                {"id": "nav-6", "menu_location": "header", "label": "खेल", "href": "/category/sports", "display_order": 6, "is_active": True},
                {"id": "nav-7", "menu_location": "header", "label": "व्यापार", "href": "/category/business", "display_order": 7, "is_active": True},
                {"id": "nav-8", "menu_location": "header", "label": "शिक्षा", "href": "/category/education", "display_order": 8, "is_active": True},
                {"id": "nav-9", "menu_location": "header", "label": "रोजगार", "href": "/category/jobs", "display_order": 9, "is_active": True},
                {"id": "nav-10", "menu_location": "header", "label": "टेक्नोलॉजी", "href": "/category/tech", "display_order": 10, "is_active": True},
                {"id": "nav-11", "menu_location": "header", "label": "राज्य", "href": "/category/state", "display_order": 11, "is_active": True},
                {"id": "nav-12", "menu_location": "header", "label": "स्वास्थ्य", "href": "/category/health", "display_order": 12, "is_active": True},
            ]
            for n in seed_nav:
                db.add(NavigationItem(**n))

        # Check static pages
        res_pages = await db.execute(select(StaticPage).limit(1))
        if not res_pages.scalar_one_or_none():
            seed_pages = [
                {
                    "slug": "about-us",
                    "title": "About Us",
                    "hindi_title": "हमारे बारे में",
                    "meta_description": "द कन्क्लूसिव इंडियन के मिशन, संपादकीय मूल्यों और विजन का विवरण।",
                    "content_markdown": "# हमारे बारे में (About The Conclusive Indian)\n\n'द कन्क्लूसिव इंडियन' (The Conclusive Indian) भारत का एक अग्रणी, निष्पक्ष और आधुनिक डिजिटल हिंदी समाचार मंच है। हमारा ध्येय केवल समाचार देना नहीं, बल्कि प्रत्येक महत्वपूर्ण राष्ट्रीय एवं वैश्विक घटना का तथ्यात्मक, समग्र और प्रामाणिक विश्लेषण प्रस्तुत करना है।"
                },
                {
                    "slug": "editorial-policy",
                    "title": "Editorial Policy",
                    "hindi_title": "संपादकीय नीति",
                    "meta_description": "द कन्क्लूसिव इंडियन की पत्रकारिता आचार संहिता और संपादकीय दिशानिर्देश।",
                    "content_markdown": "# संपादकीय नीति (Editorial Policy & Guidelines)\n\nपत्रकारिता लोकतंत्र का चौथा स्तंभ है। 'द कन्क्लूसिव इंडियन' प्रेस काउंसिल ऑफ इंडिया (PCI) के दिशानिर्देशों एवं डिजिटल समाचार आचार संहिता का पूर्णतः पालन करता है।"
                },
                {
                    "slug": "grievance-redressal",
                    "title": "Grievance Redressal",
                    "hindi_title": "शिकायत निवारण तंत्र",
                    "meta_description": "सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम 2021 के तहत शिकायत निवारण।",
                    "content_markdown": "# शिकायत निवारण तंत्र (Grievance Redressal Mechanism)\n\nभारत सरकार के सूचना प्रौद्योगिकी नियम 2021 के अंतर्गत डिजिटल समाचारों से संबंधित किसी भी आपत्ति या शिकायत के समयबद्ध निवारण हेतु नामित अधिकारी से संपर्क करें।"
                }
            ]
            for p in seed_pages:
                db.add(StaticPage(**p))

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
