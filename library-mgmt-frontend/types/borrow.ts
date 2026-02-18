export interface BorrowCreate {
    member_id: number
    book_id: number
    due_date: string // ISO date string
}

export interface Borrow { // BorrowResponse
    id: number
    member_id: number
    book_id: number
    status: string
    borrowed_at: string
    due_date: string
    returned_at: string | null
}
