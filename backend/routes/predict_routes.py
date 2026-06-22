from fastapi import APIRouter, HTTPException, Header, UploadFile, File
from models.prediction_model import PredictionInput, PredictionResponse, BulkPredictionResponse
from utils.ml_utils import predict_single, predict_bulk
from utils.file_utils import validate_file, convert_df_to_dict_list
from database import get_predictions_collection
from routes.auth_routes import get_current_user
from datetime import datetime
import uuid

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def single_prediction(input_data: PredictionInput, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    
    if user["role"] not in ["student", "teacher"]:
        raise HTTPException(status_code=403, detail="Only students and teachers can make predictions")
    
    try:
        input_dict = input_data.model_dump()
        prediction = predict_single(input_dict)
        
        prediction_record = {
            "user_id": str(user["_id"]),
            "role": user["role"],
            "input_data": input_dict,
            "prediction": prediction,
            "timestamp": datetime.utcnow(),
            "bulk_id": None
        }
        
        predictions_collection = get_predictions_collection()
        result = predictions_collection.insert_one(prediction_record)
        prediction_record["_id"] = str(result.inserted_id)
        
        return {
            "success": True,
            "message": "Prediction completed successfully",
            "data": {
                "id": prediction_record["_id"],
                "prediction": prediction["prediction"],
                "confidence": prediction["confidence"],
                "input_data": input_dict,
                "timestamp": prediction_record["timestamp"]
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/bulk")
async def bulk_prediction(file: UploadFile = File(...), authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    
    if user["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Only teachers can perform bulk predictions")
    
    file_content = await file.read()
    
    is_valid, message, df = validate_file(file_content, file.filename)
    if not is_valid:
        raise HTTPException(status_code=400, detail=message)
    
    input_data_list = convert_df_to_dict_list(df)
    bulk_id = str(uuid.uuid4())
    
    try:
        predictions = predict_bulk(input_data_list)
        
        predictions_collection = get_predictions_collection()
        prediction_records = []
        
        for i, (input_data, prediction) in enumerate(zip(input_data_list, predictions)):
            prediction_record = {
                "user_id": str(user["_id"]),
                "role": user["role"],
                "input_data": input_data,
                "prediction": prediction,
                "timestamp": datetime.utcnow(),
                "bulk_id": bulk_id
            }
            result = predictions_collection.insert_one(prediction_record)
            prediction_records.append({
                "id": str(result.inserted_id),
                "prediction": prediction["prediction"],
                "confidence": prediction["confidence"],
                "input_data": input_data,
                "timestamp": prediction_record["timestamp"]
            })
        
        return {
            "success": True,
            "message": f"Bulk prediction completed successfully for {len(predictions)} students",
            "data": prediction_records,
            "bulk_id": bulk_id,
            "total_processed": len(predictions)
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Bulk prediction failed: {str(e)}")

@router.get("/history")
async def get_prediction_history(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    
    predictions_collection = get_predictions_collection()
    
    if user["role"] == "admin":
        predictions = list(predictions_collection.find().sort("timestamp", -1).limit(100))
    elif user["role"] == "teacher":
        predictions = list(predictions_collection.find({"user_id": str(user["_id"])}).sort("timestamp", -1).limit(100))
    else:
        predictions = list(predictions_collection.find({"user_id": str(user["_id"])}).sort("timestamp", -1).limit(50))
    
    predictions_data = []
    for pred in predictions:
        prediction_data = {
            "id": str(pred["_id"]),
            "user_id": pred["user_id"],
            "role": pred["role"],
            "input_data": pred["input_data"],
            "timestamp": pred["timestamp"],
            "bulk_id": pred.get("bulk_id")
        }
        
        # Handle both old string format and new dict format
        if isinstance(pred["prediction"], dict):
            prediction_data["prediction"] = pred["prediction"].get("prediction")
            prediction_data["confidence"] = pred["prediction"].get("confidence")
        else:
            prediction_data["prediction"] = pred["prediction"]
            prediction_data["confidence"] = None
        
        predictions_data.append(prediction_data)
    
    return {
        "success": True,
        "message": "Prediction history retrieved successfully",
        "data": predictions_data
    }
