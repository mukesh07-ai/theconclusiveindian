import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Integer
try:
    from shared.db import Base
except ImportError:
    from .db import Base

class Author(Base):
    __tablename__ = "authors"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    english_name = Column(String(255), nullable=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    role = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    avatar = Column(String(1000), nullable=True)
    twitter = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
