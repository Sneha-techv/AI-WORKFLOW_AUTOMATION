from pydantic import BaseModel
from typing import Optional

class CustomerCreate(BaseModel):
    user_id: Optional[int] = None
    name: str
    email: str
    phone: Optional[str] = None


class CustomerResponse(BaseModel):
    id: int
    user_id: Optional[int]
    name: str
    email: str
    phone: Optional[str]

class Config:
    from_attributes = True