import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Table, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship
try:
    from shared.db import Base
except ImportError:
    from .db import Base

user_roles_table = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", String(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("role_name", String(50), ForeignKey("roles.name", ondelete="CASCADE"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    must_change_password = Column(Boolean, default=False)
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime, nullable=True)
    permissions_json = Column(Text, nullable=True) # JSON string of custom permissions
    last_login_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    roles = relationship("Role", secondary=user_roles_table, lazy="selectin")

class Role(Base):
    __tablename__ = "roles"

    name = Column(String(50), primary_key=True)
    description = Column(String(255), nullable=True)

class RevokedToken(Base):
    __tablename__ = "revoked_tokens"

    jti = Column(String(255), primary_key=True)
    revoked_at = Column(DateTime, default=datetime.utcnow)
