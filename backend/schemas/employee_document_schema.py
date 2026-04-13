from pydantic import BaseModel
from datetime import datetime


class EmployeeDocumentBase(BaseModel):
    employee_id: int
    document_type: str
    file_url: str
    verification_status: str


class EmployeeDocumentCreate(EmployeeDocumentBase):
    pass


class EmployeeDocumentResponse(EmployeeDocumentBase):
    id: int
    uploaded_at: datetime

    class Config:
        from_attributes = True