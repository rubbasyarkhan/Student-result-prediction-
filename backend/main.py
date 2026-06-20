from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
from routes.predict_routes import router as predict_router
from routes.template_routes import router as template_router

app = FastAPI(
    title="EduPredict API",
    description="Student Performance Prediction System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(predict_router)
app.include_router(template_router)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "EduPredict API is running",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {
        "success": True,
        "message": "API is healthy"
    }