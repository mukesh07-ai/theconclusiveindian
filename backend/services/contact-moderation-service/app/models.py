import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, BigInteger
try:
    from shared.db import Base
except ImportError:
    from .db import Base

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(String(50), primary_key=True, default=lambda: f"sub-{uuid.uuid4().hex[:8]}")
    ticket_id = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    category = Column(String(50), nullable=False) # general, tip, editorial_correction, advertise, grievance, privacy
    subject = Column(String(500), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="pending", index=True) # pending, under_review, resolved, dismissed
    internal_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(String(36), nullable=True)
    user_email = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False)
    resource_type = Column(String(100), nullable=False)
    resource_id = Column(String(255), nullable=True)
    details_json = Column(Text, nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

