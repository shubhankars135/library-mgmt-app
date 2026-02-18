import { Book, BookCreate } from '../types/book'
import { Member, MemberCreate } from '../types/member'
import { Borrow, BorrowCreate } from '../types/borrow'

const API_BASE_URL = 'http://localhost:8000'

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `API Error: ${response.statusText}`)
    }

    return response.json()
}

// ensure endpoint paths match openapi.json exactly (trailing slashes etc)

export const api = {
    // Books
    getBooks: () => fetchAPI<Book[]>('/books/all'),
    createBook: (data: BookCreate) =>
        fetchAPI<Book>('/books/', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Members
    getMembers: () => fetchAPI<Member[]>('/members/all'),
    createMember: (data: MemberCreate) =>
        fetchAPI<Member>('/members/', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Borrowings
    getBorrowings: () => fetchAPI<Borrow[]>('/borrow/all'),
    createBorrow: (data: BorrowCreate) =>
        fetchAPI<Borrow>('/borrow/', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    returnBorrow: (borrowId: number) =>
        fetchAPI<Borrow>(`/borrow/return/${borrowId}`, {
            method: 'POST',
        }),
}
