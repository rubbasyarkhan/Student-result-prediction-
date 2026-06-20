from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class PredictionInput(BaseModel):
    gender: str
    NationalITy: str
    PlaceofBirth: str
    StageID: str
    GradeID: str
    SectionID: str
    Topic: str
    Semester: str
    Relation: str
    raisedhands: int
    VisITedResources: int
    AnnouncementsView: int
    Discussion: int
    ParentAnsweringSurvey: str
    ParentschoolSatisfaction: str
    StudentAbsenceDays: str

class PredictionResponse(BaseModel):
    id: Optional[str] = None
    user_id: str
    role: str
    input_data: Dict[str, Any]
    prediction: str
    timestamp: Optional[datetime] = None
    bulk_id: Optional[str] = None

    class Config:
        from_attributes = True

class BulkPredictionResponse(BaseModel):
    success: bool
    message: str
    data: list
    bulk_id: str
    total_processed: int
