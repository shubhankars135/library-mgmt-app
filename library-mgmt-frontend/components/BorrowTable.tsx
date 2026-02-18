'use client'

import { useState } from 'react'
import { Borrow } from '../types/borrow'
import { Book } from '../types/book'
import { Member } from '../types/member'
import { api } from '../lib/api'

interface BorrowTableProps {
    borrowings: Borrow[]
    books: Book[]
    members: Member[]
    onReturn: () => void
}

export default function BorrowTable({ borrowings, books, members, onReturn }: BorrowTableProps) {
    const [loadingId, setLoadingId] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const handleReturn = async (borrowId: number) => {
        if (!confirm('Are you sure you want to return this book?')) return

        setLoadingId(borrowId)
        try {
            await api.returnBorrow(borrowId)
            onReturn()
        } catch (err) {
            alert('Failed to return book')
            console.error(err)
        } finally {
            setLoadingId(null)
        }
    }

    // Helper to find book title
    const getBookTitle = (bookId: number) => {
        const book = books.find(b => b.id === bookId)
        return book ? book.title : `Unknown Book (ID: ${bookId})`
    }

    // Helper to find member name + phone
    const getMemberDetails = (memberId: number) => {
        const member = members.find(m => m.id === memberId)
        return member ? `${member.name} (${member.phone || 'No Phone'})` : `Unknown Member (ID: ${memberId})`
    }

    // Filter logic
    const filteredBorrowings = borrowings.filter(borrow => {
        // Status Filter
        if (statusFilter === 'Borrowed' && (borrow.status === 'returned' || borrow.returned_at)) return false
        if (statusFilter === 'Returned' && borrow.status !== 'returned' && !borrow.returned_at) return false

        // Search Filter
        const bookTitle = getBookTitle(borrow.book_id).toLowerCase()
        const memberDetails = getMemberDetails(borrow.member_id).toLowerCase()
        const search = searchTerm.toLowerCase()

        return bookTitle.includes(search) || memberDetails.includes(search)
    })

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Book Title or Member Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 min-w-[150px]"
                >
                    <option value="All">All Status</option>
                    <option value="Borrowed">Borrowed</option>
                    <option value="Returned">Returned</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Book Title</th>
                            <th className="py-3 px-4 text-left">Member</th>
                            <th className="py-3 px-4 text-left">Borrowed Date</th>
                            <th className="py-3 px-4 text-left">Due Date</th>
                            <th className="py-3 px-4 text-left">Returned Date</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredBorrowings.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="py-4 text-center text-gray-500">
                                    No matching borrowings found.
                                </td>
                            </tr>
                        ) : (
                            filteredBorrowings.map((borrow) => (
                                <tr key={borrow.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{borrow.id}</td>
                                    <td className="py-3 px-4 font-medium">{getBookTitle(borrow.book_id)}</td>
                                    <td className="py-3 px-4">{getMemberDetails(borrow.member_id)}</td>
                                    <td className="py-3 px-4 text-sm">{new Date(borrow.borrowed_at).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <span className={
                                            !borrow.returned_at && new Date(borrow.due_date) < new Date()
                                                ? 'text-red-500 font-semibold'
                                                : ''
                                        }>
                                            {new Date(borrow.due_date).toLocaleDateString()}
                                        </span>
                                    </td>
                                    {/* show NA if returned_at is null */}
                                    <td className="py-3 px-4 text-sm">{borrow.returned_at ? new Date(borrow.returned_at).toLocaleDateString() : 'NA'}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${borrow.status === 'returned'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {borrow.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {borrow.status !== 'returned' && !borrow.returned_at ? (
                                            <button
                                                onClick={() => handleReturn(borrow.id)}
                                                disabled={loadingId === borrow.id}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                {loadingId === borrow.id ? 'Returning...' : 'Return'}
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Returned</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
