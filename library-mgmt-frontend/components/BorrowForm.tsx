'use client'

import { useState } from 'react'
import { Book } from '../types/book'
import { Member } from '../types/member'
import { api } from '../lib/api'

interface BorrowFormProps {
    books: Book[]
    members: Member[]
    onSuccess: () => void
}

export default function BorrowForm({ books, members, onSuccess }: BorrowFormProps) {
    const [formData, setFormData] = useState({
        member_id: '',
        book_id: '',
        due_date: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!formData.member_id || !formData.book_id || !formData.due_date) {
                throw new Error('All fields are required')
            }

            await api.createBorrow({
                member_id: Number(formData.member_id),
                book_id: Number(formData.book_id),
                due_date: new Date(formData.due_date).toISOString(),
            })

            setFormData({ member_id: '', book_id: '', due_date: '' }) // Reset form
            onSuccess()
        } catch (err: any) {
            setError(err.message || 'Failed to borrow book')
        } finally {
            setLoading(false)
        }
    }

    // Filter available books
    const availableBooks = books.filter(b => b.available_copies > 0)

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Borrow a Book</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                    <select
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.member_id}
                        onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                    >
                        <option value="">Select Member</option>
                        {members.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.name} (ID: {member.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
                    <select
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.book_id}
                        onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                    >
                        <option value="">Select Book</option>
                        {availableBooks.map(book => (
                            <option key={book.id} value={book.id}>
                                {book.title} (ID: {book.id})
                            </option>
                        ))}
                    </select>
                    {availableBooks.length === 0 && (
                        <p className="text-xs text-red-500 mt-1">No books available to borrow.</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.due_date}
                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Borrowing...' : 'Borrow Book'}
                </button>
            </div>
        </form>
    )
}
