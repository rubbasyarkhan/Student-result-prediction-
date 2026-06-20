from fastapi import APIRouter, HTTPException, Header
from database import get_users_collection
from routes.auth_routes import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
async def get_current_user_profile(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    
    return {
        "success": True,
        "message": "User profile retrieved successfully",
        "data": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "created_at": user.get("created_at")
        }
    }

@router.get("/")
async def get_all_users(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin can access all users")
    
    users_collection = get_users_collection()
    users = list(users_collection.find({}, {"password": 0}))
    
    users_data = []
    for user in users:
        users_data.append({
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "created_at": user.get("created_at")
        })
    
    return {
        "success": True,
        "message": "Users retrieved successfully",
        "data": users_data
    }
