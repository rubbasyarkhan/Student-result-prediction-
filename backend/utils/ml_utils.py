import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model.pkl")

model = None

def load_model():
    global model
    if model is None:
        try:
            model = joblib.load(MODEL_PATH)
        except Exception as e:
            print(f"Error loading model: {e}")
            raise Exception("Model file not found. Please ensure model.pkl exists in the backend directory.")
    return model

def predict_single(input_data: dict) -> str:
    model = load_model()
    
    feature_order = [
        "gender",
        "NationalITy",
        "PlaceofBirth",
        "StageID",
        "GradeID",
        "SectionID",
        "Topic",
        "Semester",
        "Relation",
        "raisedhands",
        "VisITedResources",
        "AnnouncementsView",
        "Discussion",
        "ParentAnsweringSurvey",
        "ParentschoolSatisfaction",
        "StudentAbsenceDays"
    ]
    
    features = []
    for feature in feature_order:
        features.append(input_data[feature])
    
    features_array = np.array(features).reshape(1, -1)
    prediction = model.predict(features_array)[0]
    
    return prediction

def predict_bulk(input_data_list: list) -> list:
    predictions = []
    for input_data in input_data_list:
        prediction = predict_single(input_data)
        predictions.append(prediction)
    return predictions
