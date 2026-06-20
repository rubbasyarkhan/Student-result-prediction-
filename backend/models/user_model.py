from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=30)
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
