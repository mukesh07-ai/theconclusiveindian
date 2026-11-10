from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr

class FeedbackSubmissionRequest(BaseModel):
    fullName: str
    email: EmailStr
    phone: Optional[str] = None
    category: str
    subject: str
    message: str

class FeedbackSubmissionResponse(BaseModel):
    success: bool = True
    message: str
    ticketId: str

class ContactSubmissionDTO(BaseModel):
    id: str
    ticketId: str
    fullName: str
    email: str
    phone: Optional[str] = None
    category: str
    subject: str
    message: str
    status: str
    internalNotes: Optional[str] = None
    createdAt: str
    resolvedAt: Optional[str] = None

class ContactStatusUpdateRequest(BaseModel):
    status: str
    internalNotes: Optional[str] = None

class AuditLogDTO(BaseModel):
    id: int
    userId: Optional[str] = None
    userEmail: Optional[str] = None
    action: str
    resourceType: str
    resourceId: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    ipAddress: Optional[str] = None
    createdAt: str

class AuditLogCreate(BaseModel):
    userId: Optional[str] = None
    userEmail: Optional[str] = None
    action: str
    resourceType: str
    resourceId: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None
