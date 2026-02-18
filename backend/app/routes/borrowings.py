from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/borrow", tags=["Borrowings"])

@router.post("/", response_model=schemas.BorrowResponse)
def borrow_book(borrow: schemas.BorrowCreate, db: Session = Depends(get_db)):
    return crud.borrow_book(db, borrow)

@router.post("/return/{borrow_id}", response_model=schemas.BorrowResponse)
def return_book(borrow_id: int, db: Session = Depends(get_db)):
    return crud.return_book(db, borrow_id)

@router.get("/all", response_model=list[schemas.BorrowResponse])
def list_borrowings(db: Session = Depends(get_db)):
    return crud.list_borrowings(db)

