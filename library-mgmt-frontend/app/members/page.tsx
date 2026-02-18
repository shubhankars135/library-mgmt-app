'use client'

import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { Member } from '../../types/member'
import MemberTable from '../../components/MemberTable'
import MemberForm from '../../components/MemberForm'

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchMembers = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await api.getMembers()
            setMembers(data)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch members')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Members Management</h1>

            <MemberForm onSuccess={fetchMembers} />

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Member List</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center py-4">Loading members...</div>
                ) : (
                    <MemberTable members={members} />
                )}
            </div>
        </div>
    )
}
