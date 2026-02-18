from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BookCreate(BaseModel):
    title: str
    author: str
    isbn: Optional[str]
    total_copies: int


class BookResponse(BookCreate):
    id: int
    available_copies: int

    class Config:
        orm_mode = True


class MemberCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str]


class MemberResponse(MemberCreate):
    id: int

    class Config:
        orm_mode = True


class BorrowCreate(BaseModel):
    member_id: int
    book_id: int
    due_date: datetime


class BorrowResponse(BaseModel):
    id: int
    member_id: int
    book_id: int
    status: str
    borrowed_at: datetime
    due_date : datetime
    returned_at: Optional[datetime]

    class Config:
        orm_mode = True
