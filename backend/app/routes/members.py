from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/members", tags=["Members"])

@router.post("/", response_model=schemas.MemberResponse)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    return crud.create_member(db, member)

@router.get("/all", response_model=list[schemas.MemberResponse])
def list_members(db: Session = Depends(get_db)):
    return crud.list_members(db)

