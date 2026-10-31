import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .db import get_db
from .models import User, Role, RevokedToken
from .schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    TokenResponse,
    RoleUpdateRequest,
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
    role_names = [r.name for r in user.roles] if user.roles else ["reader"]
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        roles=role_names,
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
    return TokenResponse(access_token=token, user=user_resp)

@router.post("/api/v1/auth/login", response_model=TokenResponse)
async def login(req: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email.lower()))
    user = result.scalar_one_or_none()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This user account has been disabled"
        )

    user_resp = user_to_response(user)
    jti = str(uuid.uuid4())
    token = create_access_token(
        data={"sub": user.id, "email": user.email, "roles": user_resp.roles, "jti": jti},
        secret_key=settings.JWT_SECRET_KEY
    )
    return TokenResponse(access_token=token, user=user_resp)

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

@router.get("/api/v1/admin/users", response_model=List[UserResponse])
async def list_users(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    roles = [r.name for r in user.roles]
    if "super_admin" not in roles and "editor_in_chief" not in roles:
        raise HTTPException(status_code=403, detail="Insufficient administrative permissions")

    result = await db.execute(select(User))
    users = result.scalars().all()
    return [user_to_response(u) for u in users]

@router.patch("/api/v1/admin/users/{user_id}/role", response_model=UserResponse)
async def update_user_roles(
    user_id: str,
    req: RoleUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    current_roles = [r.name for r in current_user.roles]
    if "super_admin" not in current_roles:
        raise HTTPException(status_code=403, detail="Only Super Admin can change user roles")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch requested roles
    roles_list = []
    for rname in req.roles:
        r_res = await db.execute(select(Role).where(Role.name == rname))
        r_obj = r_res.scalar_one_or_none()
        if not r_obj:
            r_obj = Role(name=rname)
            db.add(r_obj)
        roles_list.append(r_obj)

    user.roles = roles_list
    await db.commit()
    await db.refresh(user)
    return user_to_response(user)
