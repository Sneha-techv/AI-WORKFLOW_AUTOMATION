from pydantic import BaseModel
from datetime import datetime


class NotificationBase(BaseModel):
    user_id: int
    message: str
    type: str
    status: str


class NotificationCreate(NotificationBase):
    pass


class NotificationResponse(NotificationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True