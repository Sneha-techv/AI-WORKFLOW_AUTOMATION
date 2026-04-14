from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.database import Base

import datetime

class WorkflowExecution(Base):
    __tablename__ = "workflow_executions"

    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String)  # employee / ticket
    entity_id = Column(Integer)
    workflow_name = Column(String)
    status = Column(String)  # running / success / failed
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime)
    error_message = Column(Text)

class AIEvaluation(Base):
    __tablename__ = "ai_evaluations"

    id = Column(Integer, primary_key=True, index=True)
    related_type = Column(String)  # employee / ticket
    related_id = Column(Integer)
    ai_score = Column(String)
    classification = Column(String)
    sentiment = Column(String)
    confidence = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)