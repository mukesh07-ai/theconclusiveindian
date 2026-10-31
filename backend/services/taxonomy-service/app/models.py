from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime
try:
    from shared.db import Base
except ImportError:
    from .db import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)           # e.g. "राजनीति"
    english_name = Column(String(100), nullable=False)   # e.g. "Politics"
    slug = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    color = Column(String(50), nullable=True, default="#1E3A8A")
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Tag(Base):
    __tablename__ = "tags"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), unique=True, nullable=False) # e.g. "#चंबल_सेंचुरी"
    slug = Column(String(100), unique=True, index=True, nullable=False)
    usage_count = Column(Integer, default=1)
    is_trending = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
