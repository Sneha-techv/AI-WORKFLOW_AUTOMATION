from pydantic import BaseModel
from datetime import datetime


class EmployeeBase(BaseModel):
    user_id: int
    department: str
    job_title: str
    joining_date: datetime
    employment_type: str
    status: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True