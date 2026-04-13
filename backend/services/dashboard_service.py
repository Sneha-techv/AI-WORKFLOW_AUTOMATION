from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date
from backend.models import Ticket, User, TicketMessage


# 🔹 Top Cards (Matches your UI)
def get_dashboard_stats(db: Session):

    total = db.query(Ticket).count()

    open_count = db.query(Ticket).filter(Ticket.status == "OPEN").count()
    in_progress = db.query(Ticket).filter(Ticket.status == "IN_PROGRESS").count()
    resolved = db.query(Ticket).filter(Ticket.status == "RESOLVED").count()

    return {
        "total_tickets": total,
        "open_tickets": open_count,
        "in_progress": in_progress,
        "resolved": resolved
    }


# 🔹 Recent Activity (Matches UI feed)
def get_recent_activity(db: Session):

    activities = []

    # Latest ticket creations
    tickets = db.query(Ticket).order_by(Ticket.created_at.desc()).limit(5).all()

    for t in tickets:
        activities.append({
            "message": f"New ticket created (#{t.id})",
            "time": t.created_at
        })

    # Latest ticket updates/messages
    messages = db.query(TicketMessage).order_by(TicketMessage.created_at.desc()).limit(5).all()

    for m in messages:
        activities.append({
            "message": f"Ticket #{m.ticket_id} updated",
            "time": m.created_at
        })

    # Sort latest first
    activities = sorted(activities, key=lambda x: x["time"], reverse=True)

    return activities[:5]


# 🔹 Performance Section (Matches UI right panel)
def get_performance_metrics(db: Session):

    total = db.query(Ticket).count()
    resolved = db.query(Ticket).filter(Ticket.status == "RESOLVED").count()

    # Resolution Rate
    resolution_rate = (resolved / total * 100) if total > 0 else 0

    # Avg Response Time (in hours)
    tickets = db.query(Ticket).filter(Ticket.status == "RESOLVED").all()

    total_time = 0
    count = 0

    for t in tickets:
        if t.created_at and t.updated_at:
            diff = (t.updated_at - t.created_at).total_seconds()
            total_time += diff
            count += 1

    avg_response = (total_time / count / 3600) if count > 0 else 0

    return {
        "resolution_rate": round(resolution_rate, 2),
        "avg_response_time_hours": round(avg_response, 2)
    }


# 🔹 Agent Workload (optional for future UI)
def get_agent_workload(db: Session):

    agents = db.query(User).filter(User.role == "agent").all()

    workload = []

    for agent in agents:
        ticket_count = db.query(Ticket).filter(
            Ticket.assigned_to == agent.id,
            Ticket.status != "RESOLVED"
        ).count()

        workload.append({
            "agent_id": agent.id,
            "agent_name": agent.name,
            "tickets_assigned": ticket_count
        })

    return workload