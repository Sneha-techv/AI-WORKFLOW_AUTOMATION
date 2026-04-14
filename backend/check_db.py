from backend.database import SessionLocal
from backend.models import Candidate, Role, Skill

db = SessionLocal()

print("\n--- ROLES ---")
roles = db.query(Role).all()
for r in roles:
    print(f"Role: {r.id} - {r.name}")

print("\n--- SKILLS ---")
skills = db.query(Skill).all()
for s in skills:
    print(f"Skill: {s.name} | Type: {s.type} | Role ID: {s.role_id}")

print("\n--- CANDIDATES ---")
candidates = db.query(Candidate).all()

if not candidates:
    print("No candidates found ❌")

for c in candidates:
    print(f"\nCandidate: {c.name}")
    print(f"Email: {c.email}")
    print(f"Skills: {c.skills}")
    print(f"Experience: {c.experience}")
    print(f"Score: {c.score}")
    print(f"Status: {c.status}")

db.close()