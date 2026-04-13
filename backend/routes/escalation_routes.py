from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.services.escalation_service import check_ticket_escalations

router = APIRouter(prefix="/escalations", tags=["Escalations"])


@router.post("/check")
def run_escalation_check(db: Session = Depends(get_db)):

    check_ticket_escalations(db)

    return {"message": "Escalation check completed"}