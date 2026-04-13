from pydantic import BaseModel
from datetime import datetime


class TicketMessageCreate(BaseModel):
    sender_id: int
    message: str


class TicketMessageResponse(BaseModel):
    id: int
    ticket_id: int
    sender_id: int
    message: str
    created_at: datetime

    class Config:
        from_attributes = True