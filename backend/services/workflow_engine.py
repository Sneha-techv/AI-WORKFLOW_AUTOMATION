from sqlalchemy.orm import Session
from backend.models import Ticket, WorkflowExecution, AIEvaluation
from datetime import datetime
from backend.services.notification_service import create_notification


def process_ticket_workflow(db: Session, ticket_id: int, execution_id: int):

    try:

        # Get ticket
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            raise Exception("Ticket not found")
            
        description = ticket.description.lower()

        # Simple AI logic
        if "urgent" in description:
            priority = "HIGH"
            sentiment = "negative"

        elif "refund" in description:
            priority = "MEDIUM"
            sentiment = "neutral"

        else:
            priority = "LOW"
            sentiment = "positive"

        # Save AI evaluation
        ai_eval = AIEvaluation(
            related_type="ticket",
            related_id=ticket_id,
            ai_score=priority,
            classification="support_ticket",
            sentiment=sentiment,
            confidence="0.90",
            created_at=datetime.utcnow()
        )

        db.add(ai_eval)

        # ROUTE TICKET
        department = route_ticket(ticket)
        ticket.department = department


        agent_id = assign_agent(db, department)

        if agent_id is not None:
            ticket.assigned_to = agent_id
            ticket.status = "IN_PROGRESS"
            create_notification(
                db,
                agent_id,
                f"New ticket assigned: {ticket.title}"
            )
        else:
            ticket.assigned_to = None
            ticket.status = "OPEN"
            print("⚠ No agent available. Ticket added to queue.")

        print(f"Agent assigned: {agent_id}")

        # Simulated notification
        print("📩 Notification Sent")
        print(f"Ticket {ticket_id} assigned to user {ticket.assigned_to}")
        print(f"📌 Routed to department: {department}")

        # Update ticket
        ticket.priority = priority
        if agent_id is not None:
            ticket.status = "IN_PROGRESS"
        ticket.updated_at = datetime.utcnow()

        # Update workflow execution
        execution = db.query(WorkflowExecution).filter(
            WorkflowExecution.id == execution_id
        ).first()

        execution.status = "COMPLETED"
        execution.completed_at = datetime.utcnow()

        db.commit()

    except Exception as e:

        execution = db.query(WorkflowExecution).filter(
            WorkflowExecution.id == execution_id
        ).first()

        execution.status = "FAILED"
        execution.error_message = str(e)
        execution.completed_at = datetime.utcnow()

        db.commit()

def route_ticket(ticket):

    text = (ticket.title + " " + ticket.description).lower()

    if "refund" in text or "payment" in text:
        return "billing"

    elif "error" in text or "bug" in text or "login" in text:
        return "engineering"

    else:
        return "support"

def assign_agent(db: Session, department: str):
    
    from backend.models import User, Ticket

    agents = db.query(User).filter(
        User.role == "agent",
        User.department == department
    ).all()

    if not agents:
        return None

    # count tickets assigned to each agent
    agent_ticket_counts = []

    for agent in agents:
        count = db.query(Ticket).filter(
            Ticket.assigned_to == agent.id
        ).count()

        agent_ticket_counts.append((agent.id, count))

    # choose agent with minimum tickets
    selected_agent = min(agent_ticket_counts, key=lambda x: x[1])

    return selected_agent[0]