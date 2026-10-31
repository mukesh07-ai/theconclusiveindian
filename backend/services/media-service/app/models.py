import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
try:
    from shared.db import Base
except ImportError:
    from .db import Base

class MediaAsset(Base):
    __tablename__ = "media_assets"

    id = Column(String(50), primary_key=True, default=lambda: f"med-{uuid.uuid4().hex[:10]}")
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    mime_type = Column(String(100), nullable=False)
    file_size_bytes = Column(Integer, nullable=False)
    storage_path = Column(String(500), nullable=False)
    public_url = Column(String(500), nullable=False)
    alt_text = Column(String(500), nullable=True)
    caption = Column(String(500), nullable=True)
    credit = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
