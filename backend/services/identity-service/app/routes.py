import uuid
import json
import secrets
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from .db import get_db
from .models import User, Role, RevokedToken
from .schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    TokenResponse,
    RoleUpdateRequest,
    ChangePasswordRequest,
    AdminCreateUserRequest,
    AdminUpdateUserRequest,
    AdminResetPasswordRequest,
    VerifyTokenRequest,
    TokenVerificationResult,
)
from shared.contracts.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
)
from .config import settings

router = APIRouter()

def user_to_response(user: User) -> UserResponse:
    role_names = [r.name for r in user.roles] if user.roles else ["staff"]
    perms: List[str] = []
    if user.permissions_json:
        try:
            perms = json.loads(user.permissions_json)
        except Exception:
            perms = []
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        roles=role_names,
        must_change_password=bool(user.must_change_password),
        permissions=perms,
        last_login_at=user.last_login_at,
        created_at=user.created_at
    )

async def get_current_user(
    authorization: str = Header(None),
    db: AsyncSession = Depends(get_db)
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token"
        )
    token = authorization.split(" ")[1]
    payload = decode_access_token(token, secret_key=settings.JWT_SECRET_KEY)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token"
        )

    # Check revoked
    if payload.jti:
        rev_check = await db.execute(select(RevokedToken).where(RevokedToken.jti == payload.jti))
        if rev_check.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked"
            )

    result = await db.execute(select(User).where(User.id == payload.sub))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account inactive or not found"
        )
    return user

@router.post("/api/v1/auth/register", response_model=TokenResponse)
async def register(req: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    reader_role_res = await db.execute(select(Role).where(Role.name == "reader"))
    reader_role = reader_role_res.scalar_one_or_none()
    if not reader_role:
        reader_role = Role(name="reader", description="Regular Reader")
        db.add(reader_role)

    new_user = User(
        id=str(uuid.uuid4()),
        email=req.email.lower(),
        hashed_password=hash_password(req.password),
        full_name=req.full_name,
        roles=[reader_role]
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    user_resp = user_to_response(new_user)
    jti = str(uuid.uuid4())
    token = create_access_token(
        data={"sub": new_user.id, "email": new_user.email, "roles": user_resp.roles, "jti": jti},
        secret_key=settings.JWT_SECRET_KEY
    )
    return TokenResponse(access_token=token, user=user_resp, must_change_password=False)

@router.post("/api/v1/auth/login", response_model=TokenResponse)
async def login(req: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    user = result.scalar_one_or_none()

    now = datetime.utcnow()
    if user and user.locked_until and user.locked_until > now:
        remaining_minutes = int((user.locked_until - now).total_seconds() / 60) + 1
        raise HTTPException(
            status_code=status.HTTP_423_LOCKED,
            detail=f"सुरक्षा कारणों से यह खाता अस्थायी रूप से लॉक है। कृपया {remaining_minutes} मिनट बाद पुनः प्रयास करें।"
        )

    if not user or not verify_password(req.password, user.hashed_password):
        if user:
            user.failed_login_attempts = (user.failed_login_attempts or 0) + 1
            if user.failed_login_attempts >= 5:
                user.locked_until = now + timedelta(minutes=15)
            await db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="अमान्य ईमेल या पासवर्ड। कृपया पुनः जांचें।"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="यह खाता निष्क्रिय अथवा निलंबित कर दिया गया है। व्यवस्थापक से संपर्क करें।"
        )

    # Success: reset lockout
    user.failed_login_attempts = 0
    user.locked_until = None
    user.last_login_at = now
    await db.commit()
    await db.refresh(user)

    user_resp = user_to_response(user)
    jti = str(uuid.uuid4())
    token = create_access_token(
        data={"sub": user.id, "email": user.email, "roles": user_resp.roles, "jti": jti},
        secret_key=settings.JWT_SECRET_KEY
    )
    return TokenResponse(
        access_token=token,
        user=user_resp,
        must_change_password=bool(user.must_change_password)
    )

@router.post("/api/v1/auth/change-password")
async def change_password(
    req: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if len(req.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="पासवर्ड कम से कम 8 वर्णों का होना चाहिए।"
        )

    # If user doesn't have must_change_password flag set, require old password verification
    if not current_user.must_change_password and req.old_password:
        if not verify_password(req.old_password, current_user.hashed_password):
            raise HTTPException(
                status_code=400,
                detail="वर्तमान पासवर्ड सही नहीं है।"
            )

    current_user.hashed_password = hash_password(req.new_password)
    current_user.must_change_password = False
    await db.commit()

    return {"success": True, "message": "पासवर्ड सफलतापूर्वक परिवर्तित कर दिया गया है।"}

@router.get("/api/v1/auth/me", response_model=UserResponse)
async def get_me(user: User = Depends(get_current_user)):
    return user_to_response(user)

@router.post("/api/v1/auth/logout")
async def logout(
    authorization: str = Header(None),
    db: AsyncSession = Depends(get_db)
):
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = decode_access_token(token, secret_key=settings.JWT_SECRET_KEY)
        if payload and payload.jti:
            db.add(RevokedToken(jti=payload.jti))
            await db.commit()
    return {"success": True, "message": "Successfully logged out"}

@router.post("/api/v1/auth/verify-token", response_model=TokenVerificationResult)
async def verify_token(req: VerifyTokenRequest, db: AsyncSession = Depends(get_db)):
    payload = decode_access_token(req.token, secret_key=settings.JWT_SECRET_KEY)
    if not payload:
        return TokenVerificationResult(valid=False, error="Invalid token")

    if payload.jti:
        rev_check = await db.execute(select(RevokedToken).where(RevokedToken.jti == payload.jti))
        if rev_check.scalar_one_or_none():
            return TokenVerificationResult(valid=False, error="Token revoked")

    result = await db.execute(select(User).where(User.id == payload.sub))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        return TokenVerificationResult(valid=False, error="User not found or inactive")

    return TokenVerificationResult(valid=True, user=user_to_response(user))

# --- Admin User Management Endpoints ---

@router.get("/api/v1/admin/users", response_model=List[UserResponse])
async def list_users(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    roles = [r.name for r in user.roles]
    if "super_admin" not in roles and "admin" not in roles and "editor_in_chief" not in roles:
        raise HTTPException(status_code=403, detail="पर्याप्त प्रशासनिक अनुमतियाँ नहीं हैं।")

    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    return [user_to_response(u) for u in users]

@router.post("/api/v1/admin/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    req: AdminCreateUserRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    current_roles = [r.name for r in current_user.roles]
    if "super_admin" not in current_roles and "admin" not in current_roles:
        raise HTTPException(status_code=403, detail="Only Super Admin or Admin can create new users")

    # Check email duplicate
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="इस ईमेल के साथ पहले से एक उपयोगकर्ता खाता मौजूद है।")

    # Handle temporary password
    temp_pass = req.temporary_password or f"TCI@{secrets.token_hex(4)}!"

    # Resolve Role
    role_res = await db.execute(select(Role).where(Role.name == req.role))
    role_obj = role_res.scalar_one_or_none()
    if not role_obj:
        role_obj = Role(name=req.role, description=req.role.capitalize())
        db.add(role_obj)

    perms_json = json.dumps(req.permissions) if req.permissions else None

    new_user = User(
        id=str(uuid.uuid4()),
        email=req.email.lower(),
        hashed_password=hash_password(temp_pass),
        full_name=req.full_name,
        is_active=True,
        must_change_password=req.must_change_password,
        permissions_json=perms_json,
        roles=[role_obj]
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return user_to_response(new_user)

@router.put("/api/v1/admin/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: str,
    req: AdminUpdateUserRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    current_roles = [r.name for r in current_user.roles]
    if "super_admin" not in current_roles and "admin" not in current_roles:
        raise HTTPException(status_code=403, detail="पर्याप्त प्रशासनिक अनुमतियाँ नहीं हैं।")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="उपयोगकर्ता नहीं मिला")

    if req.full_name is not None:
        user.full_name = req.full_name
    if req.email is not None:
        user.email = req.email.lower()
    if req.is_active is not None:
        user.is_active = req.is_active
    if req.permissions is not None:
        user.permissions_json = json.dumps(req.permissions)

    if req.role:
        role_res = await db.execute(select(Role).where(Role.name == req.role))
        role_obj = role_res.scalar_one_or_none()
        if not role_obj:
            role_obj = Role(name=req.role)
            db.add(role_obj)
        user.roles = [role_obj]

    user.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(user)
    return user_to_response(user)

@router.post("/api/v1/admin/users/{user_id}/reset-password")
async def admin_reset_password(
    user_id: str,
    req: AdminResetPasswordRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    current_roles = [r.name for r in current_user.roles]
    if "super_admin" not in current_roles and "admin" not in current_roles:
        raise HTTPException(status_code=403, detail="पर्याप्त प्रशासनिक अनुमतियाँ नहीं हैं।")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="उपयोगकर्ता नहीं मिला")

    temp_password = req.temporary_password or f"TCI@{secrets.token_hex(4)}!"
    user.hashed_password = hash_password(temp_password)
    user.must_change_password = True
    user.failed_login_attempts = 0
    user.locked_until = None
    await db.commit()

    return {
        "success": True,
        "message": "पासवर्ड सफलतापूर्वक रीसेट कर दिया गया है।",
        "temporary_password": temp_password
    }

@router.delete("/api/v1/admin/users/{user_id}")
async def delete_user(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    current_roles = [r.name for r in current_user.roles]
    if "super_admin" not in current_roles:
        raise HTTPException(status_code=403, detail="केवल सुपर एडमिन उपयोगकर्ता को हटा सकते हैं")

    if current_user.id == user_id:
        raise HTTPException(status_code=400, detail="स्वयं का खाता हटाया नहीं जा सकता")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="उपयोगकर्ता नहीं मिला")

    await db.delete(user)
    await db.commit()
    return {"success": True, "message": "उपयोगकर्ता खाता सफलतापूर्वक हटा दिया गया है।"}
