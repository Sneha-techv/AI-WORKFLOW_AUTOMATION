from sqlalchemy import Column, Integer, String, DateTime
from backend.database import Base
import datetime

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String)
    email = Column(String)
    description = Column(String)
    department = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)