from database import SessionLocal
from models import User, Customer, Ticket, WorkflowExecution
from datetime import datetime
import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

db = SessionLocal()

# Check if dummy user exists
user = db.query(User).filter(User.email == "agent@company.com").first()
if not user:
    user = User(
        name="CS Support",
        email="agent@company.com",
        password_hash=hash_password("password"),
        role="support",
        department="Technical Support",
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    print(f"Created user: {user.name} (ID: {user.id})")

# Check if dummy customer exists
customer = db.query(Customer).filter(Customer.email == "sarah.j@example.com").first()
if not customer:
    customer = Customer(
        name="Sarah Johnson",
        email="sarah.j@example.com",
        phone="+1 (555) 123-4567",
        created_at=datetime.utcnow()
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    print(f"Created customer: {customer.name} (ID: {customer.id})")

# Add some tickets if none exist
tickets = db.query(Ticket).all()
if not tickets:
    t1 = Ticket(
        customer_id=customer.id,
        title="Login issue with mobile app",
        description="Customer reports being unable to login after the latest update. Error code 503 is displayed on the screen.",
        category="Technical",
        priority="High",
        status="IN_PROGRESS",
        assigned_to=user.id,
        department="Technical Support",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(t1)
    
    t2 = Ticket(
        customer_id=customer.id,
        title="Subscription billing inquiry",
        description="I have a question about my last invoice. It seems I was charged twice for this month.",
        category="Billing",
        priority="Medium",
        status="OPEN",
        assigned_to=user.id,
        department="Technical Support",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(t2)
    
    db.commit()
    print("Created sample tickets")

db.close()
print("Seeding complete!")