from fastapi import APIRouter, HTTPException, Depends
from models.user_model import UserSignup, UserLogin, UserResponse
from utils.auth_utils import hash_password, verify_password, get_user_by_email, get_user_by_id, create_user
from utils.jwt_handler import create_access_token, verify_token
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup")
async def signup(user: UserSignup):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if user.role not in ["student", "teacher", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid role. Must be student, teacher, or admin")
    
    hashed_password = hash_password(user.password)
    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "created_at": datetime.utcnow()
    }
    
    result = create_user(user_data)
    user_data["_id"] = str(result.inserted_id)
    
    return {
        "success": True,
        "message": "User created successfully",
        "data": {
            "id": user_data["_id"],
            "name": user_data["name"],
            "email": user_data["email"],
            "role": user_data["role"]
        }
    }

@router.post("/login")
async def login(user: UserLogin):
    db_user = get_user_by_email(user.email)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token_data = {
        "user_id": str(db_user["_id"]),
        "email": db_user["email"],
        "role": db_user["role"]
    }
    access_token = create_access_token(token_data)
    
    return {
        "success": True,
        "message": "Login successful",
        "data": {
            "access_token": access_token,
            "user": {
                "id": str(db_user["_id"]),
                "name": db_user["name"],
                "email": db_user["email"],
                "role": db_user["role"]
            }
        }
    }

async def get_current_user(token: str):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user_id = payload.get("user_id")
    user = get_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

def get_current_user_optional(token: str = None):
    if not token:
        return None
    payload = verify_token(token)
    if payload is None:
        return None
    user_id = payload.get("user_id")
    user = get_user_by_id(user_id)
    return user
