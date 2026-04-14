from sqlalchemy.orm import Session
from datetime import datetime


def create_notification(db: Session, user_id: int, message: str, type: str = "system"):

    notification = Notification(
        user_id=user_id,
        message=message,
        type=type,
        status="sent",
        created_at=datetime.utcnow()
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification