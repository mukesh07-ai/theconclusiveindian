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

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    full_name: str
    is_active: bool
    roles: List[str]
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class RoleUpdateRequest(BaseModel):
    roles: List[str]

class VerifyTokenRequest(BaseModel):
    token: str

class TokenVerificationResult(BaseModel):
    valid: bool
    user: Optional[UserResponse] = None
    error: Optional[str] = None
