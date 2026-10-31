import asyncio
from datetime import datetime
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, and_

from .db import engine, Base, async_session
from .models import Article, BreakingNews, VideoStoryModel, PhotoStoryModel, OpinionArticleModel
from .routes import router
from .config import settings

async def scheduled_publishing_worker():
    """Background task to publish scheduled articles when their publish time arrives."""
    while True:
        try:
            await asyncio.sleep(60)
            async with async_session() as db:
                now = datetime.utcnow()
                res = await db.execute(
                    select(Article).where(
                        and_(Article.status == "scheduled", Article.scheduled_at <= now)
                    )
                )
                scheduled_arts = res.scalars().all()
                for art in scheduled_arts:
                    art.status = "published"
                    art.published_at = now
                if scheduled_arts:
                    await db.commit()
        except asyncio.CancelledError:
            break
        except Exception as e:
            await asyncio.sleep(5)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Seed initial content matching frontend dataset
    async with async_session() as db:
        # Check if articles exist
        res = await db.execute(select(Article).limit(1))
        if not res.scalar_one_or_none():
            seed_articles = [
                {
                    "id": "art-1",
                    "title": "चंबल अभयारण्य का कायाकल्प: घड़ियाल और डॉल्फिन संरक्षण में भारत की ऐतिहासिक उपलब्धि",
                    "english_title": "Chambal Sanctuary Revival: Historical Milestone in Gharial & Dolphin Conservation",
                    "slug": "chambal-revival-gharial-dolphin-sanctuary-report",
                    "excerpt": "मध्य प्रदेश, राजस्थान और उत्तर प्रदेश की त्रिवेणी सीमा पर बहने वाली चंबल नदी में घड़ियालों की संख्या 2400 के पार पहुंच चुकी है। विशेषज्ञों का कहना है कि सामुदायिक भागीदारी और सख्त निगरानी ने इसे संभव बनाया है।",
                    "content": "चंबल नदी का नाम सुनते ही कभी बीहड़ और दस्यु सरगनाओं की यादें ताजा हो जाती थीं, लेकिन आज वही चंबल वन्यजीव संरक्षण और पारिस्थितिकीय संतुलन की वैश्विक मिसाल बन चुकी है। केंद्रीय पर्यावरण मंत्रालय और राज्य वन विभागों की संयुक्त रिपोर्ट के अनुसार, राष्ट्रीय चंबल अभयारण्य में लुप्तप्राय घड़ियालों और गंगा डॉल्फिन की आबादी में उल्लेखनीय वृद्धि दर्ज की गई है।\n\nविशेषज्ञों के अनुसार, घड़ियाल संरक्षण परियोजना के तहत स्थानीय मछुआरों और ग्रामीणों को इको-वॉचमैन के रूप में प्रशिक्षित किया गया। अवैध रेत खनन और रसायनों के बहाव पर सख्त उपग्रह निगरानी रखी गई। इसके परिणामस्वरूप चंबल में घड़ियालों की संख्या अब 2450 से अधिक हो गई है, जो विश्व में सबसे बड़ा प्राकृतिक प्रजनन क्षेत्र है।\n\nगंगा डॉल्फिन के संरक्षण पर डॉ. राघवेंद्र शुक्ल ने बताया कि स्वच्छ जल प्रवाह और प्लास्टिक कचरे पर पूर्ण प्रतिबंध से डॉल्फिन की उपस्थिति में 35% का इजाफा हुआ है। यह सफलता दर्शाती है कि जब स्थानीय समुदाय और प्रशासनिक तंत्र एक दिशा में कार्य करते हैं, तो विलुप्ति की कगार पर खड़े जीवों को भी नई जिंदगी दी जा सकती है।",
                    "featured_image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
                    "image_alt": "चंबल नदी में घड़ियाल संरक्षण",
                    "image_caption": "राष्ट्रीय चंबल अभयारण्य में प्राकृतिक आवास में घड़ियाल",
                    "image_credit": "द कन्क्लूसिव इंडियन / राघवेंद्र शुक्ल",
                    "category_slug": "national",
                    "category_name": "देश",
                    "author_slug": "raghavendra-shukla",
                    "author_name": "राघवेंद्र शुक्ल",
                    "author_role": "विशेष संवाददाता (पर्यावरण)",
                    "author_avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                    "status": "published",
                    "tags_csv": "चंबल,घड़ियाल,पर्यावरण,वन्यजीव,मध्य प्रदेश",
                    "is_breaking": True,
                    "is_featured": True,
                    "is_trending": False,
                    "view_count": 18450,
                    "read_time_minutes": 5,
                    "published_at": datetime.utcnow()
                },
                {
                    "id": "art-2",
                    "title": "संसद का बजट सत्र: विकसित भारत 2047 के रोडमैप पर सत्तापक्ष और विपक्ष में तीखी बहस",
                    "english_title": "Parliament Budget Session: Heated Debate on Viksit Bharat 2047 Roadmap",
                    "slug": "parliament-budget-session-viksit-bharat-economic-survey",
                    "excerpt": "संसद के दोनों सदनों में राष्ट्रपति के अभिभाषण और आर्थिक समीक्षा पर चर्चा के दौरान आर्थिक असमानता, युवाओं के रोजगार और कृषि सुधारों पर गहन विचार-विमर्श हुआ।",
                    "content": "संसद का बजट सत्र राष्ट्रीय प्राथमिकताओं और आर्थिक रणनीतियों के नए दौर का साक्षी बन रहा है। वित्त मंत्री द्वारा प्रस्तुत आर्थिक समीक्षा में 7% से अधिक विकास दर के अनुमान के बीच विपक्षी दलों ने ग्रामीण खपत और बेरोजगारी पर तीखे सवाल उठाए।\n\nप्रधानमंत्री ने लोकसभा में चर्चा का उत्तर देते हुए कहा कि सुधारों की गति अब केवल तात्कालिक लाभ के लिए नहीं, बल्कि अगली सदी के सामर्थ्य निर्माण के लिए है। सेमीकंडक्टर मिशन, नवीकरणीय ऊर्जा और रक्षा विनिर्माण में आत्मनिर्भरता भारत को वैश्विक आपूर्ति श्रृंखला का अनिवार्य केंद्र बना रही है।\n\nसंसदीय कार्यप्रणाली पर वरिष्ठ विश्लेषकों का मानना है कि नीतिगत असहमति लोकतंत्र का प्राण है, परंतु दीर्घकालिक राष्ट्रीय विकास लक्ष्यों पर राजनीतिक दलों में न्यूनतम सहमति का निर्माण देश के हित में है।",
                    "featured_image": "https://images.unsplash.com/photo-1541872703-74c5e44368f9",
                    "image_alt": "भारतीय संसद भवन नई दिल्ली",
                    "image_caption": "संसद भवन के बाहर बजट सत्र की गहमागहमी",
                    "image_credit": "पीटीआई / संसद टीवी",
                    "category_slug": "politics",
                    "category_name": "राजनीति",
                    "author_slug": "meenakshi-joshi",
                    "author_name": "मीनाक्षी जोशी",
                    "author_role": "वरिष्ठ राजनीतिक विश्लेषक",
                    "author_avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                    "status": "published",
                    "tags_csv": "संसद,बजट,राजनीति,अर्थव्यवस्था,विकसित भारत",
                    "is_breaking": False,
                    "is_featured": True,
                    "is_trending": True,
                    "view_count": 24200,
                    "read_time_minutes": 6,
                    "published_at": datetime.utcnow()
                },
                {
                    "id": "art-3",
                    "title": "वैश्विक कूटनीति में भारत का बढ़ता कद: जी-20 से लेकर ग्लोबल साउथ तक नई रणनीतिक धुरी",
                    "english_title": "India's Rising Diplomatic Stature: From G20 to Global South",
                    "slug": "global-diplomacy-india-strategic-autonomy-foreign-policy",
                    "excerpt": "जटिल भू-राजनीतिक ध्रुवीकरण के दौर में भारत ने रणनीतिक स्वायत्तता को बनाए रखते हुए पश्चिम और ग्लोबल साउथ के बीच संतुलित पुल का निर्माण किया है।",
                    "content": "अंतरराष्ट्रीय मंचों पर भारत की विदेश नीति आज किसी एक खेमे की मोहताज नहीं है। नई दिल्ली में संपन्न सम्मेलनों और वैश्विक वार्ताओं ने स्पष्ट कर दिया है कि भारत अपने राष्ट्रीय हितों को सर्वोपरि रखते हुए वैश्विक शांति और स्थिरता में रचनात्मक भूमिका निभाने के लिए तत्पर है।\n\nविदेश मंत्रालय के सूत्रों के अनुसार, ऊर्जा सुरक्षा, तकनीकी साझेदारी और हिंद-प्रशांत क्षेत्र में शांति की रक्षा भारतीय कूटनीति के तीन प्रमुख आधार स्तंभ हैं।",
                    "featured_image": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
                    "image_alt": "अंतरराष्ट्रीय कूटनीति सम्मेलन",
                    "image_caption": "विदेश नीति और रणनीतिक साझेदारी पर उच्चस्तरीय बैठक",
                    "image_credit": "द कन्क्लूसिव इंडियन ब्यूरो",
                    "category_slug": "world",
                    "category_name": "विदेश",
                    "author_slug": "vikram-singh",
                    "author_name": "विक्रम सिंह",
                    "author_role": "रक्षा व सामरिक विशेषज्ञ",
                    "author_avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                    "status": "published",
                    "tags_csv": "कूटनीति,विदेश नीति,ग्लोबल साउथ,भारत",
                    "is_breaking": False,
                    "is_featured": True,
                    "is_trending": False,
                    "view_count": 14100,
                    "read_time_minutes": 4,
                    "published_at": datetime.utcnow()
                },
                {
                    "id": "art-4",
                    "title": "प्राकृतिक और डिजिटल खेती का संगम: भारतीय कृषि में नई क्रांति का सूत्रपात",
                    "english_title": "Confluence of Natural & Digital Farming: A New Agricultural Revolution",
                    "slug": "digital-agriculture-drones-msp-farmers-empowerment",
                    "excerpt": "ड्रोन से कीटनाशक छिड़काव, एआई आधारित मौसम पूर्वानुमान और मृदा स्वास्थ्य कार्ड ने किसानों की आय और फसल उत्पादन क्षमता में क्रांतिकारी परिवर्तन किया है।",
                    "content": "उत्तर प्रदेश और मध्य प्रदेश के गांवों में अब किसान स्मार्टफोन और ड्रोन तकनीकों का इस्तेमाल कर अपनी फसलों की सेहत जांच रहे हैं। भारतीय कृषि अनुसंधान परिषद के सहयोग से शुरू हुए पायलट प्रोजेक्ट्स में लागत 25% कम हुई है और पैदावार में 18% की वृद्धि दर्ज की गई है।",
                    "featured_image": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
                    "image_alt": "भारतीय खेत में आधुनिक कृषि तकनीक",
                    "image_caption": "डिजिटल उपकरणों के सहयोग से उन्नत खेती करते किसान",
                    "image_credit": "कृषि संवाद ब्यूरो",
                    "category_slug": "agriculture",
                    "category_name": "कृषि",
                    "author_slug": "priya-sharma",
                    "author_name": "प्रिया शर्मा",
                    "author_role": "आर्थिक व कृषि मामलों की संपादक",
                    "author_avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956",
                    "status": "published",
                    "tags_csv": "कृषि,किसान,ड्रोन,प्राकृतिक खेती,एमएसपी",
                    "is_breaking": False,
                    "is_featured": False,
                    "is_trending": True,
                    "view_count": 19800,
                    "read_time_minutes": 5,
                    "published_at": datetime.utcnow()
                }
            ]

            for art_data in seed_articles:
                db.add(Article(**art_data))

        # Check breaking news
        bn_res = await db.execute(select(BreakingNews).limit(1))
        if not bn_res.scalar_one_or_none():
            seed_bn = [
                {"id": "bn-1", "title": "चंबल अभयारण्य में डॉल्फिन और घड़ियाल संरक्षण को मिली नई रफ्तार, आबादी में 35% इजाफा", "slug": "chambal-revival-gharial-dolphin-sanctuary-report", "category": "देश", "timestamp_text": "अभी-अभी", "is_urgent": True, "is_active": True},
                {"id": "bn-2", "title": "संसद के बजट सत्र में राष्ट्रपति के अभिभाषण पर धन्यवाद प्रस्ताव पर सत्तापक्ष-विपक्ष में तीखी बहस जारी", "slug": "parliament-budget-session-viksit-bharat-economic-survey", "category": "राजनीति", "timestamp_text": "10 मिनट पहले", "is_urgent": True, "is_active": True},
                {"id": "bn-3", "title": "भारतीय अर्थव्यवस्था चालू वित्त वर्ष में 7.2% की दर से बढ़ने का अनुमान: नीति आयोग रिपोर्ट", "slug": "digital-agriculture-drones-msp-farmers-empowerment", "category": "व्यापार", "timestamp_text": "25 मिनट पहले", "is_urgent": False, "is_active": True},
            ]
            for bn in seed_bn:
                db.add(BreakingNews(**bn))

        # Check video stories
        vid_res = await db.execute(select(VideoStoryModel).limit(1))
        if not vid_res.scalar_one_or_none():
            db.add(VideoStoryModel(
                id="vid-1",
                title="चंबल सेंचुरी का एक्सक्लूसिव ग्राउंड रिपोर्ट: बीहड़ से डॉल्फिन संरक्षण तक की दास्तान",
                slug="chambal-sanctuary-exclusive-ground-report",
                thumbnail="https://images.unsplash.com/photo-1544735716-392fe2489ffa",
                duration="18:42",
                category_slug="national",
                category_name="देश",
                views="42K",
                youtube_id="CfIwAGhPPvc",
                youtube_url="https://youtu.be/CfIwAGhPPvc",
                is_featured=True,
                guest="डॉ. राघवेंद्र शुक्ल (पर्यावरणविद्)",
                channel_name="The Conclusive Indian",
                description="राष्ट्रीय चंबल अभयारण्य से हमारे विशेष संवाददाता की आंखों देखी विस्तृत वीडियो रिपोर्ट।"
            ))

        # Check photo stories
        photo_res = await db.execute(select(PhotoStoryModel).limit(1))
        if not photo_res.scalar_one_or_none():
            db.add(PhotoStoryModel(
                id="photo-1",
                title="तस्वीरों में देखें: भारत की सांस्कृतिक विरासत और आधुनिक विकास की अनूठी झलक",
                slug="cultural-heritage-modern-india-photo-gallery",
                thumbnail="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
                photo_count=8,
                category_slug="national",
                category_name="देश"
            ))

        # Check opinion articles
        op_res = await db.execute(select(OpinionArticleModel).limit(1))
        if not op_res.scalar_one_or_none():
            db.add(OpinionArticleModel(
                id="op-1",
                title="संपादकीय: विकसित भारत के संकल्प में ग्रामीण अर्थव्यवस्था की केंद्रीय भूमिका",
                slug="editorial-viksit-bharat-rural-economy-central-role",
                excerpt="जब तक देश के अंतिम किसान और कारीगर तक आधुनिक तकनीक और पारदर्शी बाजार की पहुंच नहीं होगी, तब तक समावेशी विकास अधूरा रहेगा।",
                author_name="राघवेंद्र शुक्ल",
                author_role="वरिष्ठ संपादक",
                author_avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                author_slug="raghavendra-shukla",
                read_time_minutes=5
            ))

        await db.commit()

    # Launch background scheduler task
    task = asyncio.create_task(scheduled_publishing_worker())

    yield
    task.cancel()
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
