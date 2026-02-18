from sqlalchemy.orm import Session
from datetime import datetime
from app import models
from fastapi import HTTPException

# check if book exists

def create_book(db: Session, book):
    existing_book_isbn = db.query(models.Book).filter(models.Book.isbn == book.isbn).first()
    existing_book_title = db.query(models.Book).filter(models.Book.title == book.title).first()

    if existing_book_isbn or existing_book_title:
        raise HTTPException(status_code=404, detail="Book already exists.")
    
    db_book = models.Book(
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        total_copies=book.total_copies,
        available_copies=book.total_copies
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def list_books(db: Session):
    return db.query(models.Book).all()


def create_member(db: Session, member):
    db_member = models.Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

def list_members(db: Session):
    return db.query(models.Member).all()


def borrow_book(db: Session, borrow):
    book = db.query(models.Book).filter(models.Book.id == borrow.book_id).first()

    if book.available_copies <= 0:
        raise HTTPException(status_code=400, detail="No copies available")

    book.available_copies -= 1

    due_date = borrow.due_date

    # due_date = datetime.strptime(iso_string, "%Y-%m-%dT%H:%M:%S.%fZ")
    # due_date = dt.replace(tzinfo=timezone.utc)

    borrowing = models.Borrowing(
        member_id=borrow.member_id,
        book_id=borrow.book_id,
        due_date=due_date,
        status="BORROWED"
    )

    db.add(borrowing)
    db.commit()
    db.refresh(borrowing)

    return borrowing


def return_book(db: Session, borrow_id: int):
    borrowing = db.query(models.Borrowing).filter(models.Borrowing.id == borrow_id).first()

    if not borrowing:
        raise HTTPException(status_code=404, detail="Borrowing not found")

    borrowing.status = "RETURNED"
    borrowing.returned_at = datetime.utcnow()

    book = db.query(models.Book).filter(models.Book.id == borrowing.book_id).first()
    book.available_copies += 1

    db.commit()
    return borrowing


def list_borrowings(db: Session):
    return db.query(models.Borrowing).all()
