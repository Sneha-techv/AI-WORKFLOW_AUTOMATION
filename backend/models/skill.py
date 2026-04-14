from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String, default="optional")

    role_id = Column(Integer, ForeignKey("roles.id"))  # ✅ IMPORTANT

    role = relationship("Role", back_populates="skills")