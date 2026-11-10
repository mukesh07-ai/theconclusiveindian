from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class ChangePasswordRequest(BaseModel):
    old_password: Optional[str] = None
    new_password: str

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    full_name: str
    is_active: bool
    roles: List[str]
    must_change_password: bool = False
    permissions: List[str] = []
    last_login_at: Optional[datetime] = None
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
    must_change_password: bool = False

class RoleUpdateRequest(BaseModel):
    roles: List[str]

class AdminCreateUserRequest(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "reporter"
    temporary_password: Optional[str] = None
    must_change_password: bool = True
    permissions: Optional[List[str]] = None

class AdminUpdateUserRequest(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = None
    role: Optional[str] = None
    permissions: Optional[List[str]] = None

class AdminResetPasswordRequest(BaseModel):
    temporary_password: Optional[str] = None

class VerifyTokenRequest(BaseModel):
    token: str

class TokenVerificationResult(BaseModel):
    valid: bool
    user: Optional[UserResponse] = None
    error: Optional[str] = None
