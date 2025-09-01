export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    address?: {
        street: string
        city: string
        state: string
        zipCode: string
        country: string
    }
    joinDate: string
}