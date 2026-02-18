export interface MemberCreate {
    name: string
    email: string
    phone: string | null
}

export interface Member { // MemberResponse includes id
    id: number
    name: string
    email: string
    phone: string | null
}
