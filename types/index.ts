import { CartItem } from "@/contexts/cart-context"

// types User
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

// types Address
export interface Address {
    address: string
    street?: string
    city: string
    state: string
    zipCode: string
    country?: string
}

// types Product
export interface Product {
    id: string
    name: string
    price: number
    category: string
    description: string
    productImages: string[]
    quantity: number
    stock: number
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

// types Banner
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

// types/order.ts
export type OrderItem = {
    id: string
    sku: string;
    title: string;
    qty: number;
    unitPrice: number; // kobo
};

export type OrderStatus = 'CREATED' | 'INITIATED' | 'AWAITING_WEBHOOK' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED';

export type Order = {
    id: string;
    userId: string;
    // items: OrderItem[];
    items: CartItem[];
    subTotal: number; //sum(items.price * quantity) for all items
    amount: number; // subTotal + deliveryFee
    currency: 'NGN';
    status: OrderStatus;
    paystack: {
        reference: string | null;
        authorizationUrl: string | null;
        accessCode: string | null;
    };
    createdAt: string;
    updatedAt: string;
    customer: Omit<User, "role" | "totalSpent" | "totalOrders" | "joinDate" | "orders">;
    deliveryAddress: Address;
    deliveryFee: number;
    selectedLocation: string;
};
