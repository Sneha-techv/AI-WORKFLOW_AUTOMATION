from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# 🔹 Shared Properties
class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str
    department: Optional[str] = None


# 🔹 For Creating User
class UserCreate(UserBase):
    password: str


# 🔹 For Updating User
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    department: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None


# 🔹 For Returning User (Response)
class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Required for SQLAlchemy (Pydantic v2)