from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

# ✅ Load .env file
load_dotenv()

# ✅ Get DB URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# ✅ Fix for Render (postgres → postgresql)
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# ✅ Fallback to LOCAL DB if not set
if not DATABASE_URL:
    DATABASE_URL = "postgresql://postgres:rootadmin123@localhost:5432/workflow_db"

print("🚀 Using DB:", DATABASE_URL)  # 🔥 debug line

# ✅ Create engine
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ✅ Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()