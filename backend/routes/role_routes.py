from fastapi import APIRouter

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/")
def get_roles():
    return ["Admin", "HR", "Manager"]