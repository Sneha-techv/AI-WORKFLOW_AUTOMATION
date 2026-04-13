from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from backend.models import Ticket, User
from backend.services.notification_service import create_notification


def check_ticket_escalations(db: Session):

    tickets = db.query(Ticket).filter(Ticket.status != "RESOLVED").all()

    for ticket in tickets:

        time_passed = datetime.utcnow() - ticket.created_at

        # ⏱️ Escalate if > 24 hours
        if time_passed > timedelta(hours=24):

            old_agent = ticket.assigned_to
            department = ticket.department

            # 🔹 Get all agents in same department
            agents = db.query(User).filter(
                User.role == "agent",
                User.department == department
            ).all()

            if not agents:
                print("⚠ No agents found for escalation")
                continue

            # 🔹 Remove current agent
            available_agents = [a for a in agents if a.id != old_agent]

            if not available_agents:
                print("⚠ No alternate agents available")
                continue

            # 🔹 Find least loaded agent
            agent_load = []

            for agent in available_agents:
                count = db.query(Ticket).filter(
                    Ticket.assigned_to == agent.id,
                    Ticket.status != "RESOLVED"
                ).count()

                agent_load.append((agent.id, count))

            # 🔹 Select agent with minimum load
            new_agent_id = min(agent_load, key=lambda x: x[1])[0]

            # 🔁 Assign new agent
            ticket.assigned_to = new_agent_id
            ticket.updated_at = datetime.utcnow()

            db.commit()
            db.refresh(ticket)

            # 🔔 Notify new agent
            create_notification(
                db=db,
                user_id=new_agent_id,
                message=f"⚠ Escalated Ticket #{ticket.id} assigned to you.",
                type="escalation"
            )

            print(f"✅ Ticket {ticket.id} escalated to agent {new_agent_id}")