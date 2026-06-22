import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model.pkl")
ENCODERS_PATH = os.path.join(os.path.dirname(__file__), "..", "encoders.pkl")

model = None
encoders = None

def load_model():
    global model
    if model is None:
        try:
            model = joblib.load(MODEL_PATH)
        except Exception as e:
            print(f"Error loading model: {e}")
            raise Exception("Model file not found. Please ensure model.pkl exists in the backend directory.")
    return model

def load_encoders():
    global encoders
    if encoders is None:
        try:
            encoders = joblib.load(ENCODERS_PATH)
        except Exception as e:
            print(f"Error loading encoders: {e}")
            raise Exception("Encoders file not found. Please ensure encoders.pkl exists in the backend directory.")
    return encoders

def encode_input(input_data: dict, encoders_dict: dict) -> dict:
    """
    Encode categorical string inputs to integers using LabelEncoders.
    
    Args:
        input_data: Dictionary with raw string values
        encoders_dict: Dictionary of LabelEncoders per column
    
    Returns:
        Dictionary with encoded values
    
    Raises:
        ValueError: If a categorical value is invalid or not found in encoder
    """
    encoded_data = input_data.copy()
    
    categorical_columns = [
        "gender",
        "NationalITy",
        "PlaceofBirth",
        "StageID",
        "GradeID",
        "SectionID",
        "Topic",
        "Semester",
        "Relation",
        "ParentAnsweringSurvey",
        "ParentschoolSatisfaction",
        "StudentAbsenceDays"
    ]
    
    for column in categorical_columns:
        if column not in input_data:
            raise ValueError(f"Missing required field: {column}")
        
        value = input_data[column]
        if column not in encoders_dict:
            raise ValueError(f"No encoder found for column: {column}")
        
        try:
            encoder = encoders_dict[column]
            encoded_value = encoder.transform([value])[0]
            encoded_data[column] = encoded_value
        except ValueError as e:
            raise ValueError(f"Invalid value '{value}' for column '{column}'. Valid values are: {list(encoder.classes_)}")
    
    return encoded_data

def predict_single(input_data: dict) -> dict:
    """
    Make a single prediction with encoded inputs.
    
    Args:
        input_data: Dictionary with raw string and numeric values
    
    Returns:
        Dictionary with prediction class and confidence score
    
    Raises:
        ValueError: If encoding fails or prediction fails
    """
    model = load_model()
    encoders_dict = load_encoders()
    
    # Encode categorical inputs
    encoded_data = encode_input(input_data, encoders_dict)
    
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
    
    # Build feature array in correct order
    features = []
    for feature in feature_order:
        if feature not in encoded_data:
            raise ValueError(f"Missing required field: {feature}")
        
        # Convert numeric fields to proper types
        if feature in ["raisedhands", "VisITedResources", "AnnouncementsView", "Discussion"]:
            features.append(float(encoded_data[feature]))
        else:
            features.append(float(encoded_data[feature]))
    
    features_array = np.array(features).reshape(1, -1)
    
    # Make prediction
    prediction = model.predict(features_array)[0]
    
    # Get confidence score (probability of the predicted class)
    probabilities = model.predict_proba(features_array)[0]
    confidence = float(max(probabilities))
    
    # Map prediction to readable format
    class_mapping = {0: "H", 1: "L", 2: "M"}
    prediction_label = class_mapping.get(prediction, str(prediction))
    
    return {
        "prediction": prediction_label,
        "confidence": round(confidence, 4)
    }

def predict_bulk(input_data_list: list) -> list:
    """
    Make bulk predictions with encoded inputs.
    
    Args:
        input_data_list: List of dictionaries with raw string and numeric values
    
    Returns:
        List of dictionaries with prediction class and confidence score
    
    Raises:
        ValueError: If encoding fails or prediction fails for any item
    """
    predictions = []
    for input_data in input_data_list:
        prediction = predict_single(input_data)
        predictions.append(prediction)
    return predictions
