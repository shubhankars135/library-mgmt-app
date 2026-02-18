export interface BookCreate {
    title: string
    author: string
    isbn: string | null
    total_copies: number
}

export interface Book { // BookResponse includes id and available_copies
    id: number
    title: string
    author: string
    isbn: string | null
    total_copies: number
    available_copies: number
}
