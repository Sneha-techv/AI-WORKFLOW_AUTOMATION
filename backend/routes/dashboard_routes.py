from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.services.dashboard_service import (
    get_dashboard_stats,
    get_recent_activity,
    get_performance_metrics,
    get_agent_workload
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


# 🔹 Top cards
@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    return get_dashboard_stats(db)


# 🔹 Recent activity
@router.get("/recent-activity")
def recent_activity(db: Session = Depends(get_db)):
    return get_recent_activity(db)


# 🔹 Performance metrics
@router.get("/performance")
def performance(db: Session = Depends(get_db)):
    return get_performance_metrics(db)


# 🔹 Agent workload (optional)
@router.get("/agent-workload")
def agent_workload(db: Session = Depends(get_db)):
    return get_agent_workload(db)