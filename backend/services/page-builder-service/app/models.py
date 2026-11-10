import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime
try:
    from shared.db import Base
except ImportError:
    from .db import Base

class HomepageSection(Base):
    __tablename__ = "homepage_sections"

    id = Column(String(50), primary_key=True)
    section_type = Column(String(50), nullable=False) # hero, latest, category, videos, photos, opinion, ad_banner, newsletter
    title = Column(String(255), nullable=False)
    display_order = Column(Integer, default=0)
    is_enabled = Column(Boolean, default=True)
    config_json = Column(Text, nullable=True) # JSON string for component parameters

class SiteSetting(Base):
    __tablename__ = "site_settings"

    key = Column(String(100), primary_key=True)
    value_json = Column(Text, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class StaticPage(Base):
    __tablename__ = "static_pages"

    slug = Column(String(100), primary_key=True)
    title = Column(String(255), nullable=False)
    hindi_title = Column(String(255), nullable=False)
    content_markdown = Column(Text, nullable=False)
    meta_description = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class NavigationItem(Base):
    __tablename__ = "navigation_items"

    id = Column(String(50), primary_key=True, default=lambda: f"nav-{uuid.uuid4().hex[:8]}")
    menu_location = Column(String(50), index=True, nullable=False) # header, topbar, footer_editorial, footer_legal, footer_corporate
    label = Column(String(255), nullable=False)
    href = Column(String(500), nullable=False)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class Advertisement(Base):
    __tablename__ = "advertisements"

    id = Column(String(50), primary_key=True, default=lambda: f"ad-{uuid.uuid4().hex[:10]}")
    title = Column(String(255), nullable=False)
    advertiser_name = Column(String(255), nullable=False)
    destination_url = Column(String(1000), nullable=False)
    creative_desktop_url = Column(String(1000), nullable=False)
    creative_mobile_url = Column(String(1000), nullable=True)
    placement_positions = Column(String(500), nullable=False) # comma-separated: header, homepage_top, homepage_middle, sidebar, article_inline, footer
    ad_type = Column(String(50), default="image_banner") # image_banner, sponsored_post, script_html
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    priority = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    impressions_count = Column(Integer, default=0)
    clicks_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class UrlRedirect(Base):
    __tablename__ = "url_redirects"

    id = Column(String(50), primary_key=True, default=lambda: f"redir-{uuid.uuid4().hex[:8]}")
    source_path = Column(String(500), unique=True, index=True, nullable=False)
    target_path = Column(String(500), nullable=False)
    status_code = Column(Integer, default=301)
    created_at = Column(DateTime, default=datetime.utcnow)
