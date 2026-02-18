'use client'

import { useState } from 'react'
import { api } from '../lib/api'

interface BookFormProps {
    onSuccess: () => void
}

export default function BookForm({ onSuccess }: BookFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        total_copies: 1,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await api.createBook({
                ...formData,
                isbn: formData.isbn || null,
                total_copies: Number(formData.total_copies),
            })
            setFormData({ title: '', author: '', isbn: '', total_copies: 1 }) // Reset form
            onSuccess()
        } catch (err: any) {
            setError(err.message || 'Failed to create book')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Book</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Copies</label>
                    <input
                        type="number"
                        min="1"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.total_copies}
                        onChange={(e) => setFormData({ ...formData, total_copies: Number(e.target.value) })}
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </div>
        </form>
    )
}
