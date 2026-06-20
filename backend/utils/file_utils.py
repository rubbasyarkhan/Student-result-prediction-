import pandas as pd
from io import BytesIO
from typing import Tuple, List

REQUIRED_COLUMNS = [
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

MAX_ROWS = 99

def validate_file(file_content: bytes, filename: str) -> Tuple[bool, str, pd.DataFrame]:
    try:
        if filename.endswith('.csv'):
            df = pd.read_csv(BytesIO(file_content))
        elif filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(BytesIO(file_content))
        else:
            return False, "Invalid file format. Only CSV and Excel files are allowed.", None
        
        if len(df) == 0:
            return False, "File is empty.", None
        
        if len(df) > MAX_ROWS:
            return False, f"File exceeds maximum row limit of {MAX_ROWS}. Found {len(df)} rows.", None
        
        missing_columns = [col for col in REQUIRED_COLUMNS if col not in df.columns]
        if missing_columns:
            return False, f"Missing required columns: {', '.join(missing_columns)}", None
        
        return True, "File validated successfully.", df
    
    except Exception as e:
        return False, f"Error reading file: {str(e)}", None

def convert_df_to_dict_list(df: pd.DataFrame) -> List[dict]:
    return df.to_dict('records')

def create_template_csv() -> bytes:
    template_data = {col: [""] for col in REQUIRED_COLUMNS}
    df = pd.DataFrame(template_data)
    output = BytesIO()
    df.to_csv(output, index=False)
    output.seek(0)
    return output.read()

def create_template_excel() -> bytes:
    template_data = {col: [""] for col in REQUIRED_COLUMNS}
    df = pd.DataFrame(template_data)
    output = BytesIO()
    df.to_excel(output, index=False, engine='openpyxl')
    output.seek(0)
    return output.read()
