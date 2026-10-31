import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime
try:
    from shared.db import Base
except ImportError:
    from .db import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(500), nullable=False)
    english_title = Column(String(500), nullable=True)
    slug = Column(String(500), unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    featured_image = Column(String(1000), nullable=False)
    image_alt = Column(String(500), nullable=False)
    image_caption = Column(String(500), nullable=True)
    image_credit = Column(String(255), nullable=True)

    # Denormalized references to preserve independent query capability
    category_slug = Column(String(100), index=True, nullable=False)
    category_name = Column(String(100), nullable=False)
    author_slug = Column(String(100), index=True, nullable=False)
    author_name = Column(String(100), nullable=False)
    author_role = Column(String(255), nullable=True)
    author_avatar = Column(String(1000), nullable=True)

    status = Column(String(50), default="published", index=True) # draft, review, scheduled, published, archived
    tags_csv = Column(Text, nullable=True) # comma-separated tags

    is_breaking = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    is_trending = Column(Boolean, default=False)
    view_count = Column(Integer, default=100)
    read_time_minutes = Column(Integer, default=4)

    published_at = Column(DateTime, default=datetime.utcnow)
    scheduled_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class BreakingNews(Base):
    __tablename__ = "breaking_news"

    id = Column(String(50), primary_key=True, default=lambda: f"bn-{uuid.uuid4().hex[:8]}")
    title = Column(String(500), nullable=False)
    slug = Column(String(500), nullable=False)
    category = Column(String(100), default="देश")
    timestamp_text = Column(String(100), default="अभी-अभी")
    is_urgent = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class VideoStoryModel(Base):
    __tablename__ = "video_stories"

    id = Column(String(50), primary_key=True)
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    thumbnail = Column(String(1000), nullable=False)
    duration = Column(String(50), default="15:00")
    category_slug = Column(String(100), default="national")
    category_name = Column(String(100), default="देश")
    published_at = Column(DateTime, default=datetime.utcnow)
    views = Column(String(50), default="10K")
    youtube_id = Column(String(100), nullable=True)
    youtube_url = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=False)
    guest = Column(String(255), nullable=True)
    channel_name = Column(String(255), default="The Conclusive Indian")
    description = Column(Text, nullable=True)

class PhotoStoryModel(Base):
    __tablename__ = "photo_stories"

    id = Column(String(50), primary_key=True)
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    thumbnail = Column(String(1000), nullable=False)
    photo_count = Column(Integer, default=6)
    category_slug = Column(String(100), default="national")
    category_name = Column(String(100), default="देश")
    published_at = Column(DateTime, default=datetime.utcnow)

class OpinionArticleModel(Base):
    __tablename__ = "opinion_articles"

    id = Column(String(50), primary_key=True)
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    author_name = Column(String(100), nullable=False)
    author_role = Column(String(255), nullable=True)
    author_avatar = Column(String(1000), nullable=True)
    author_slug = Column(String(100), default="raghavendra-shukla")
    published_at = Column(DateTime, default=datetime.utcnow)
    read_time_minutes = Column(Integer, default=5)

class ArticleTag(Base):
    __tablename__ = "article_tags"

    article_id = Column(String(50), primary_key=True, index=True)
    tag_id = Column(String(50), primary_key=True, index=True)

