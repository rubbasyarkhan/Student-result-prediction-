# Model Instructions

## IMPORTANT: model.pkl File Required

The backend requires a `model.pkl` file to be placed in the `backend/` directory. This file should contain your trained RandomForest model for student performance prediction.

## How to Create model.pkl

You need to train a RandomForest model using scikit-learn and save it using joblib. Here's an example:

```python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load your training data
df = pd.read_csv('your_training_data.csv')

# Define features (in exact order as required by the API)
feature_columns = [
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

# Encode categorical variables
le_dict = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    le_dict[col] = le

# Prepare features and target
X = df[feature_columns]
y = df['Class']  # Assuming your target column is 'Class'

# Train RandomForest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the model
joblib.dump(model, 'model.pkl')

print("Model saved as model.pkl")
```

## Feature Order (STRICT)

The model must expect features in this exact order:
1. gender
2. NationalITy
3. PlaceofBirth
4. StageID
5. GradeID
6. SectionID
7. Topic
8. Semester
9. Relation
10. raisedhands
11. VisITedResources
12. AnnouncementsView
13. Discussion
14. ParentAnsweringSurvey
15. ParentschoolSatisfaction
16. StudentAbsenceDays

## Expected Output

The model should predict one of:
- H (High)
- M (Medium)
- L (Low)

## Placement

Place the `model.pkl` file in:
```
backend/model.pkl
```

## Testing

Once you have the model.pkl file, test the API:
```bash
cd backend
uvicorn main:app --reload
```

Then make a prediction request to verify the model loads correctly.
