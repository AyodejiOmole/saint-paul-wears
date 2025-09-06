export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    address?: Address
    joinDate: string
    role?: "user" | "admin"
    totalSpent: number
    totalOrders: number
}

export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
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
    colors: string[]
    sizes: string[]
    sku?: string
    care?: string
    details?: string[]
    // variations: {
    //     size: string
    //     color: string
    //     stock: number
    //     images: string[] 
    // }[]
}

export interface Banner {
    id?: string
    // name: string
    header: string
    secondaryText: string
    title: string
    description: string
    image: string
    tagline?: string
    subtitle?: string
    ctaText?: string
    ctaLink?: string
    isActive?: boolean
    updatedAt: string
    createdAt: string
}