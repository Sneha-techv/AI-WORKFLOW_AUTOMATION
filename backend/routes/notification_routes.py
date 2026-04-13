from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas.notification_schema import NotificationResponse
from backend import crud

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/", response_model=list[NotificationResponse])
def get_all_notifications(db: Session = Depends(get_db)):
    return crud.get_all_notifications(db)


@router.get("/{user_id}", response_model=list[NotificationResponse])
def get_user_notifications(user_id: int, db: Session = Depends(get_db)):
    return crud.get_notifications_by_user(db, user_id)


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    return crud.mark_notification_read(db, notification_id)