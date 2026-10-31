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
