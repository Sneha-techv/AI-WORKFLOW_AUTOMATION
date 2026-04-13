from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.auth.auth_routes import router as auth_router
from backend.routes.customer_routes import router as customer_router
from backend.routes.role_routes import router as role_router
from backend.routes.candidate_routes import router as candidate_router
from backend.routes.ticket_routes import router as ticket_router
from backend.routes.dashboard_routes import router as dashboard_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(customer_router)
app.include_router(role_router)
app.include_router(candidate_router)
app.include_router(ticket_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {"message": "Backend running 🚀"}