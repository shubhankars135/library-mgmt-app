import { Book } from '../types/book'

interface BookTableProps {
    books: Book[]
}

export default function BookTable({ books }: BookTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Title</th>
                        <th className="py-3 px-4 text-left">Author</th>
                        <th className="py-3 px-4 text-left">ISBN</th>
                        <th className="py-3 px-4 text-center">Total</th>
                        <th className="py-3 px-4 text-center">Available</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-4 text-center text-gray-500">
                                No books found.
                            </td>
                        </tr>
                    ) : (
                        books.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4">{book.id}</td>
                                <td className="py-3 px-4 font-medium">{book.title}</td>
                                <td className="py-3 px-4">{book.author}</td>
                                <td className="py-3 px-4 font-mono text-sm">{book.isbn || 'N/A'}</td>
                                <td className="py-3 px-4 text-center">{book.total_copies}</td>
                                <td className="py-3 px-4 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${book.available_copies > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {book.available_copies}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
