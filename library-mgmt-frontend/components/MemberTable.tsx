import { Member } from '../types/member'

interface MemberTableProps {
    members: Member[]
}

export default function MemberTable({ members }: MemberTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Phone</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {members.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-4 text-center text-gray-500">
                                No members found.
                            </td>
                        </tr>
                    ) : (
                        members.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4">{member.id}</td>
                                <td className="py-3 px-4 font-medium">{member.name}</td>
                                <td className="py-3 px-4">{member.email}</td>
                                <td className="py-3 px-4">{member.phone || 'N/A'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
