from sqlalchemy.orm import Session
from backend import models
from backend.schemas.user_schema import UserCreate
from datetime import datetime
import hashlib
from backend.models.user import User
from backend.models.ticket import Ticket, TicketMessage
from backend.models.workflow import WorkflowExecution
from backend.models.notification import Notification
from backend.models.customer import Customer

from backend.schemas.user_schema import UserUpdate
from backend.schemas.ticket_schema import TicketCreate
from fastapi import HTTPException
from backend.services.workflow_engine import process_ticket_workflow


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def create_user(db: Session, user: UserCreate):
    # 🔹 Check if email already exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)

    db_user = models.User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
        role=user.role,
        department=user.department, 
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


def get_users(db: Session):
    return db.query(models.User).all()


def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🔹 Check duplicate email if updating email
    if user.email:
        existing_user = db.query(models.User).filter(
            models.User.email == user.email,
            models.User.id != user_id
        ).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")

    if user.name is not None:
        db_user.name = user.name

    if user.email is not None:
        db_user.email = user.email

    if user.password is not None:
        db_user.password_hash = hash_password(user.password)

    if user.role is not None:
        db_user.role = user.role

    db_user.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(db_user)

    return db_user


def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()

    return {"message": "User deleted successfully"}

def create_customer(db, customer):
    db_customer = Customer(
        user_id=customer.user_id,
        name=customer.name,
        email=customer.email,
        phone=customer.phone
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def get_customers(db):
    return db.query(Customer).all()

def create_ticket(db: Session, ticket: TicketCreate):

    db_ticket = Ticket(
        customer_id=ticket.customer_id,
        title=ticket.title,
        description=ticket.description,
        category=ticket.category,

        # System defaults
        priority="LOW",
        status="OPEN",
        assigned_to=None,

        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    # 🔹 Create workflow execution
    workflow = create_workflow_execution(db, "ticket", db_ticket.id)

    # 🔹 Run AI workflow engine
    process_ticket_workflow(db, db_ticket.id, workflow.id)

    return db_ticket

def create_workflow_execution(db: Session, entity_type: str, entity_id: int):

    execution = WorkflowExecution(
        entity_type=entity_type,
        entity_id=entity_id,
        workflow_name="customer_support",
        status="RUNNING",
        started_at=datetime.utcnow()
    )

    db.add(execution)
    db.commit()
    db.refresh(execution)

    return execution

def create_ticket_message(db, ticket_id, sender_id, message):

    new_message = TicketMessage(
        ticket_id=ticket_id,
        sender_id=sender_id,
        message=message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message

def get_ticket_messages(db, ticket_id):

    return db.query(TicketMessage).filter(
        TicketMessage.ticket_id == ticket_id
    ).all()

def create_notification(db: Session, user_id: int, message: str):

    notification = Notification(
        user_id=user_id,
        message=message,
        type="system",
        status="sent"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification

def get_notifications_by_user(db: Session, user_id: int):
    return db.query(Notification).filter(Notification.user_id == user_id).all()


def get_all_notifications(db: Session):
    return db.query(Notification).all()


def mark_notification_read(db: Session, notification_id: int):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    notification.status = "read"

    db.commit()
    db.refresh(notification)

    return notification