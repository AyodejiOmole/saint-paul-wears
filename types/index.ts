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
    role?: "user" | "admin"
}

export interface Product {
    id: string
    name: string
    price: number
    category: string
    description: string
    productImages: string[]
    quantity: number
    sizeOptions: string[]
    originalPrice: number
    colors: number
    sizes: string[]
    // variations: {
    //     size: string
    //     color: string
    //     stock: number
    //     images: string[] 
    // }[]
}