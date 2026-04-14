from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import json

# ---------------- DB ---------------- #
from backend.database import Base, engine, get_db

# ❌ REMOVE: import backend.models

# ---------------- MODELS ---------------- #
from backend.models.user import User
from backend.models.role import Role
from backend.models.skill import Skill
from backend.models.candidate import Candidate
from backend.models.complaint import Complaint

# ---------------- ROUTES ---------------- #
from backend.routes import (
    notification_routes,
    ticket_routes,
    escalation_routes,
    dashboard_routes,
    customer_routes,
    candidate_routes,
    role_routes
)

# ---------------- AUTH ---------------- #
from backend.auth import auth_routes
from backend.auth.dependencies import require_user

# ---------------- SCHEMAS + CRUD ---------------- #
from backend.schemas.user_schema import UserCreate, UserResponse
from backend import crud

# ---------------- UTILS ---------------- #
from backend.utils import (
    extract_text_from_pdf,
    extract_candidate_info,
    calculate_score,
    determine_status,
    route_complaint,
    send_email_gmail
)

# ================= APP ================= #
app = FastAPI(title="AI Workflow Automation System 🚀")

# ================= CORS ================= #
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= CREATE TABLES ================= #
Base.metadata.create_all(bind=engine)

# ================= ROUTERS ================= #
app.include_router(auth_routes.router)
app.include_router(notification_routes.router)
app.include_router(ticket_routes.router)
app.include_router(escalation_routes.router)
app.include_router(dashboard_routes.router)

app.include_router(
    customer_routes.router,
    prefix="/customer",
    tags=["Customer"],
    dependencies=[Depends(require_user)]
)

app.include_router(
    candidate_routes.router,
    prefix="/candidates",
    tags=["Candidates"],
    dependencies=[Depends(require_user)]
)

app.include_router(
    role_routes.router,
    prefix="/roles",
    tags=["Roles"],
    dependencies=[Depends(require_user)]
)
# ================= STARTUP ================= #
@app.on_event("startup")
def startup():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ Database Connected Successfully")
    except Exception as e:
        print("❌ DB Connection Failed:", e)

# ================= ROOT ================= #
@app.get("/")
def root():
    return {"message": "AI Workflow Automation Backend Running 🚀"}

# ================= USERS ================= #
@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

# ================= ROLE APIs ================= #
@app.get("/roles/")
def get_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()

@app.post("/roles/")
def create_role(name: str, db: Session = Depends(get_db)):
    existing = db.query(Role).filter(Role.name == name).first()
    if existing:
        return {"message": "Role already exists", "role": existing.name}

    role = Role(name=name)
    db.add(role)
    db.commit()
    db.refresh(role)

    return role  # ✅ removed broken email code

# ================= SKILLS ================= #
@app.post("/roles/{role_id}/skills/")
def add_skills(role_id: int, skills: List[dict], db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    created = []
    for s in skills:
        skill = Skill(
            name=s["name"],
            type=s.get("type", "optional"),
            role_id=role_id
        )
        db.add(skill)
        created.append(skill.name)

    db.commit()
    return {"message": "Skills added", "skills": created}

@app.get("/roles/{role_id}/skills/")
def get_skills(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    return {
        "role": role.name,
        "skills": [s.name for s in role.skills]
    }

# ================= RESUME UPLOAD ================= #
@app.post("/upload_resume/")
async def upload_resume(
    file: UploadFile = File(...),
    role_id: int = Form(...),
    parsed_data: str = Form(None),
    db: Session = Depends(get_db)
):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    skills_from_db = [{"name": s.name, "type": s.type} for s in role.skills]

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF allowed")

    info = None
    if parsed_data:
        try:
            info = json.loads(parsed_data)
        except:
            info = None

    if not info:
        content = await file.read()
        text = extract_text_from_pdf(content)
        info = extract_candidate_info(text, skills_from_db)

    # ✅ fallback fix
    if "name" not in info or info["name"] == "Unknown":
        info["name"] = file.filename.split(".")[0]

    name = info.get("name")
    email = info.get("email", "N/A")
    skills = info.get("skills", [])
    experience = info.get("experience", 0)

    if isinstance(skills, str):
        skills = [s.strip() for s in skills.split(",")]

    score = calculate_score(skills, experience)
    status = determine_status(score, experience)

    candidate = Candidate(
        name=name,
        email=email,
        skills=", ".join([str(s) for s in skills]),
        experience=experience,
        score=score,
        status=status,
        role_id=role_id
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    # ✅ email added correctly
    subject = f"Application Status Update - {name}"
    email_response = f"Hello {name}, your application status is: {status}"
    send_email_gmail(email, subject, email_response)

    return {
        "id": candidate.id,
        "name": name,
        "score": score,
        "status": status
    }

# ================= COMPLAINT ================= #
@app.post("/submit_complaint/")
def submit_complaint(
    user_name: str = Form(...),
    email: str = Form(...),
    description: str = Form(...),
    db: Session = Depends(get_db)
):
    dept = route_complaint(description)

    complaint = Complaint(
        user_name=user_name,
        email=email,
        description=description,
        department=dept
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return {"id": complaint.id, "department": dept}

# ================= FETCH ================= #
@app.get("/candidates/")
def get_candidates(db: Session = Depends(get_db)):
    return db.query(Candidate).all()

@app.get("/complaints/")
def get_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).all()

# ================= FAVICON ================= #
@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)