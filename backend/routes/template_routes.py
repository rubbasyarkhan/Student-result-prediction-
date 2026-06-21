from fastapi import APIRouter, HTTPException, Header
from fastapi.responses import Response
from utils.file_utils import create_template_csv, create_template_excel
from routes.auth_routes import get_current_user

router = APIRouter(prefix="/template", tags=["Template"])

@router.get("/download")
async def download_template(format: str = "csv", authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization.replace("Bearer ", "")
    user = await get_current_user(token)
    
    if user["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Only teachers can download templates")
    
    if format.lower() == "csv":
        template_data = create_template_csv()
        media_type = "text/csv"
        filename = "edupredict_template.csv"
    elif format.lower() in ["excel", "xlsx"]:
        template_data = create_template_excel()
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        filename = "edupredict_template.xlsx"
    else:
        raise HTTPException(status_code=400, detail="Invalid format. Use 'csv' or 'excel'")
    
    return Response(
        content=template_data,
        media_type=media_type,
        headers={
            "Content-Disposition": f"attachment; filename={filename}"
        }
    )
