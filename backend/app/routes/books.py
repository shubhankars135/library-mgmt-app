from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud

router = APIRouter(prefix="/books", tags=["Books"])

@router.post("/", response_model=schemas.BookResponse)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db, book)


# List of all books
@router.get("/all", response_model=list[schemas.BookResponse])
def list_books(db: Session = Depends(get_db)):
    return crud.list_books(db)

