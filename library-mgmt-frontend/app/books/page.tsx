'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { Book } from '../../types/book'
import BookTable from '../../components/BookTable'
import BookForm from '../../components/BookForm'

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBooks = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.getBooks()
            setBooks(data)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch books')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>

            <BookForm onSuccess={fetchBooks} />

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Book List</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center py-4">Loading books...</div>
                ) : (
                    <BookTable books={books} />
                )}
            </div>
        </div>
    )
}
