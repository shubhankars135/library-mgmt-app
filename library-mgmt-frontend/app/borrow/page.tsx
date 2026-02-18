'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { Borrow } from '../../types/borrow'
import { Book } from '../../types/book'
import { Member } from '../../types/member'
import BorrowTable from '../../components/BorrowTable'
import BorrowForm from '../../components/BorrowForm'

export default function BorrowPage() {
    const [borrowings, setBorrowings] = useState<Borrow[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const [borrowData, booksData, membersData] = await Promise.all([
                api.getBorrowings(),
                api.getBooks(),
                api.getMembers(),
            ]) // Borrowings might fail if empty? No, should return empty list.

            setBorrowings(borrowData)
            setBooks(booksData)
            setMembers(membersData)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data')
        } finally {
            setLoading(false)
        }
    }

    const refreshBorrowings = async () => {
        // When a book is returned or borrowed, we need to refresh borrowings AND books (to update availability)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Borrowings Management</h1>

            <BorrowForm
                books={books}
                members={members}
                onSuccess={refreshBorrowings}
            />

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Borrowing History</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center py-4">Loading data...</div>
                ) : (
                    <BorrowTable
                        borrowings={borrowings}
                        books={books}
                        members={members}
                        onReturn={refreshBorrowings}
                    />
                )}
            </div>
        </div>
    )
}
