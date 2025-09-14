import { ref, get, remove, update, push } from "firebase/database";

import { db } from "./firebase";
import { Order } from "@/types";

export async function fetchOrders(): Promise<Order[]> {
    try {
        const ordersRef = ref(db, "orders");

        const snapshot = await get(ordersRef);
        if(!snapshot.exists()) return []

        const data = snapshot.val();

        let list = Object.entries(data).map(([id, val]) => ({ ...(val as any), id }))

        return list;
    } catch(error) {
        console.log("Error fetching orders, ", error);
        return [];
    }
} 

export async function fetchOrdersByUserId(): Promise<Order[]> {
    try {
        const ordersRef = ref(db, "orders");

        const snapshot = await get(ordersRef);
        if(!snapshot.exists()) return []

        const data = snapshot.val();

        let list = Object.entries(data).map(([id, val]) => ({ ...(val as any), id }))

        return list;
    } catch(error) {
        console.log("Error fetching orders, ", error);
        return [];
    }
} 

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderRef = ref(db, `orders/${orderId}`);
    const snapshot = await get(orderRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: orderId,
      ...snapshot.val(),
    } as Order;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}