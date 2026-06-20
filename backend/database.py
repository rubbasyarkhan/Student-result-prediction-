from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)
db = client.get_database()

users_collection = db.users
predictions_collection = db.predictions

def get_database():
    return db

def get_users_collection():
    return users_collection

def get_predictions_collection():
    return predictions_collection
