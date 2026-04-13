from pydantic import BaseModel
from datetime import datetime


class AIEvaluationBase(BaseModel):
    related_type: str
    related_id: int
    ai_score: str
    classification: str
    sentiment: str
    confidence: str


class AIEvaluationCreate(AIEvaluationBase):
    pass


class AIEvaluationResponse(AIEvaluationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True