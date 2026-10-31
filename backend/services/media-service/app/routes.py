import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from pydantic import BaseModel

from .db import get_db
from .models import MediaAsset
from .config import settings

router = APIRouter()

class MediaAssetResponse(BaseModel):
    id: str
    filename: str
    originalFilename: str
    mimeType: str
    fileSizeBytes: int
    publicUrl: str
    altText: Optional[str] = None
    caption: Optional[str] = None
    credit: Optional[str] = None
    createdAt: str

def asset_to_response(m: MediaAsset) -> MediaAssetResponse:
    return MediaAssetResponse(
        id=m.id,
        filename=m.filename,
        originalFilename=m.original_filename,
        mimeType=m.mime_type,
        fileSizeBytes=m.file_size_bytes,
        publicUrl=m.public_url,
        altText=m.alt_text,
        caption=m.caption,
        credit=m.credit,
        createdAt=m.created_at.isoformat()
    )

@router.post("/api/v1/media/upload", response_model=MediaAssetResponse, status_code=201)
async def upload_media(
    file: UploadFile = File(...),
    alt_text: Optional[str] = Form(None),
    caption: Optional[str] = Form(None),
    credit: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    # Validate MIME type
    if file.content_type not in settings.ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type {file.content_type}. Allowed: {settings.ALLOWED_IMAGE_TYPES}"
        )

    # Read content
    contents = await file.read()
    file_size = len(contents)
    if file_size > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB"
        )

    os.makedirs(settings.MEDIA_UPLOAD_DIR, exist_ok=True)
    ext = os.path.splitext(file.filename or "")[1] or ".jpg"
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(settings.MEDIA_UPLOAD_DIR, unique_filename)

    with open(dest_path, "wb") as f:
        f.write(contents)

    public_url = f"/uploads/{unique_filename}"
    asset = MediaAsset(
        id=f"med-{uuid.uuid4().hex[:10]}",
        filename=unique_filename,
        original_filename=file.filename or "uploaded_image",
        mime_type=file.content_type,
        file_size_bytes=file_size,
        storage_path=dest_path,
        public_url=public_url,
        alt_text=alt_text,
        caption=caption,
        credit=credit
    )
    db.add(asset)
    await db.commit()
    await db.refresh(asset)

    return asset_to_response(asset)

@router.get("/api/v1/media", response_model=List[MediaAssetResponse])
async def list_media(
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(MediaAsset).order_by(desc(MediaAsset.created_at)).limit(limit))
    assets = res.scalars().all()
    return [asset_to_response(a) for a in assets]

@router.get("/api/v1/media/{asset_id}", response_model=MediaAssetResponse)
async def get_media_asset(asset_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(MediaAsset).where(MediaAsset.id == asset_id))
    asset = res.scalar_one_or_none()
    if not asset:
        raise HTTPException(status_code=404, detail="Media asset not found")
    return asset_to_response(asset)

@router.delete("/api/v1/admin/media/{asset_id}")
async def delete_media_asset(asset_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(MediaAsset).where(MediaAsset.id == asset_id))
    asset = res.scalar_one_or_none()
    if not asset:
        raise HTTPException(status_code=404, detail="Media asset not found")

    if os.path.exists(asset.storage_path):
        try:
            os.remove(asset.storage_path)
        except OSError:
            pass

    await db.delete(asset)
    await db.commit()
    return {"success": True, "message": "Media asset deleted"}
