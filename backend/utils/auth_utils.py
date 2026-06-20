from passlib.context import CryptContext
from bson import ObjectId
from database import get_users_collection

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_email(email: str):
    users_collection = get_users_collection()
    return users_collection.find_one({"email": email})

def get_user_by_id(user_id: str):
    users_collection = get_users_collection()
    try:
        return users_collection.find_one({"_id": ObjectId(user_id)})
    except:
        return None

def create_user(user_data: dict):
    users_collection = get_users_collection()
    result = users_collection.insert_one(user_data)
    return result
