from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Fields shared internally
class TicketBase(BaseModel):
    customer_id: int
    title: str
    description: str
    category: str
    department: str | None = None
    priority: str
    status: str
    assigned_to: int | None = None


# Used when CUSTOMER creates ticket
class TicketCreate(BaseModel):
    customer_id: int
    title: str
    description: str
    category: str


# Used internally by system / agents
class TicketInternal(TicketBase):
    priority: str
    status: str
    assigned_to: Optional[int] = None


# Response sent back to API
class TicketResponse(TicketInternal):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True