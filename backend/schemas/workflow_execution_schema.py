from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class WorkflowExecutionBase(BaseModel):
    entity_type: str
    entity_id: int
    workflow_name: str
    status: str


class WorkflowExecutionCreate(WorkflowExecutionBase):
    pass


class WorkflowExecutionResponse(WorkflowExecutionBase):
    id: int
    started_at: datetime
    completed_at: Optional[datetime]
    error_message: Optional[str]

    class Config:
        from_attributes = True