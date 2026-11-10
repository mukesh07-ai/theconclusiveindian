import uuid
import json
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from .db import get_db
from .models import ContactSubmission, AuditLog
from .schemas import (
    FeedbackSubmissionRequest,
    FeedbackSubmissionResponse,
    ContactSubmissionDTO,
    ContactStatusUpdateRequest,
    AuditLogDTO,
    AuditLogCreate,
)

router = APIRouter()

def submission_to_dto(s: ContactSubmission) -> ContactSubmissionDTO:
    return ContactSubmissionDTO(
        id=s.id,
        ticketId=s.ticket_id,
        fullName=s.full_name,
        email=s.email,
        phone=s.phone,
        category=s.category,
        subject=s.subject,
        message=s.message,
        status=s.status,
        internalNotes=s.internal_notes,
        createdAt=s.created_at.isoformat(),
        resolvedAt=s.resolved_at.isoformat() if s.resolved_at else None
    )

def audit_to_dto(a: AuditLog) -> AuditLogDTO:
    dtl = None
    if a.details_json:
        try:
            dtl = json.loads(a.details_json)
        except Exception:
            dtl = None
    return AuditLogDTO(
        id=a.id,
        userId=a.user_id,
        userEmail=a.user_email,
        action=a.action,
        resourceType=a.resource_type,
        resourceId=a.resource_id,
        details=dtl,
        ipAddress=a.ip_address,
        createdAt=a.created_at.isoformat() if a.created_at else datetime.utcnow().isoformat()
    )

@router.post("/api/v1/contact/feedback", response_model=FeedbackSubmissionResponse, status_code=201)
async def submit_feedback(req: FeedbackSubmissionRequest, db: AsyncSession = Depends(get_db)):
    ticket_id = f"TCI-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    new_sub = ContactSubmission(
        id=f"sub-{uuid.uuid4().hex[:8]}",
        ticket_id=ticket_id,
        full_name=req.fullName.strip(),
        email=req.email.lower().strip(),
        phone=req.phone.strip() if req.phone else None,
        category=req.category,
        subject=req.subject.strip(),
        message=req.message.strip(),
        status="pending"
    )
    db.add(new_sub)
    await db.commit()

    return FeedbackSubmissionResponse(
        success=True,
        message="आपका संदेश संपादकीय डेस्क को सफलतापूर्वक प्रेषित कर दिया गया है।",
        ticketId=ticket_id
    )

@router.get("/api/v1/admin/contact/feedback", response_model=List[ContactSubmissionDTO])
async def list_feedback(
    category: Optional[str] = None,
    status_filter: Optional[str] = None,
    limit: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    query = select(ContactSubmission)
    if category:
        query = query.where(ContactSubmission.category == category)
    if status_filter:
        query = query.where(ContactSubmission.status == status_filter)

    query = query.order_by(desc(ContactSubmission.created_at)).limit(limit)
    res = await db.execute(query)
    subs = res.scalars().all()
    return [submission_to_dto(s) for s in subs]

@router.get("/api/v1/admin/contact/feedback/{ticket_id}", response_model=ContactSubmissionDTO)
async def get_feedback(ticket_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(ContactSubmission).where(ContactSubmission.ticket_id == ticket_id))
    sub = res.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return submission_to_dto(sub)

@router.patch("/api/v1/admin/contact/feedback/{ticket_id}", response_model=ContactSubmissionDTO)
async def update_feedback_status(ticket_id: str, req: ContactStatusUpdateRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(ContactSubmission).where(ContactSubmission.ticket_id == ticket_id))
    sub = res.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    sub.status = req.status
    if req.internalNotes is not None:
        sub.internal_notes = req.internalNotes
    if req.status in ["resolved", "dismissed"]:
        sub.resolved_at = datetime.utcnow()

    await db.commit()
    await db.refresh(sub)
    return submission_to_dto(sub)

# --- Audit Logs Endpoints ---

@router.get("/api/v1/admin/audit-logs", response_model=List[AuditLogDTO])
async def list_audit_logs(
    resource_type: Optional[str] = None,
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    query = select(AuditLog)
    if resource_type:
        query = query.where(AuditLog.resource_type == resource_type)
    query = query.order_by(desc(AuditLog.created_at)).limit(limit)
    res = await db.execute(query)
    logs = res.scalars().all()
    return [audit_to_dto(l) for l in logs]

@router.post("/api/v1/admin/audit-logs", response_model=AuditLogDTO, status_code=status.HTTP_201_CREATED)
async def create_audit_log(req: AuditLogCreate, db: AsyncSession = Depends(get_db)):
    log = AuditLog(
        user_id=req.userId,
        user_email=req.userEmail,
        action=req.action,
        resource_type=req.resourceType,
        resourceId=req.resourceId,
        details_json=json.dumps(req.details, ensure_ascii=False) if req.details else None,
        ip_address=req.ipAddress,
        user_agent=req.userAgent
    )
    db.add(log)
    await db.commit()
    await db.refresh(log)
    return audit_to_dto(log)
