import { push, ref, set, serverTimestamp, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import type { Order, Address } from '@/types';
import { db } from './firebase';
import { CartItem } from '@/contexts/cart-context';

export async function createOrder(items: CartItem[], deliveryFee: number, selectedLocation: string, totalKobo: number, deliveryAddress: Omit<Address, "country" | "street">): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const orderRef = push(ref(db, 'orders'));
  const orderId = orderRef.key!;
  const now = Date.now().toString();

  const usersRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(usersRef);
  if(!snapshot.exists()) throw new Error("Could not create order.");

  const userData = snapshot.val();

  const order: Omit<Order, 'id'> = {
    userId: user.uid,
    customer: {
      id: user.uid,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address ?? "",
    },
    items,
    subTotal: totalKobo,
    amount: totalKobo + deliveryFee,
    deliveryFee: deliveryFee,
    selectedLocation: selectedLocation,
    currency: 'NGN',
    status: 'CREATED',
    paystack: { reference: null, authorizationUrl: null, accessCode: null },
    createdAt: now,
    updatedAt: now,
    deliveryAddress: deliveryAddress
  };

  await set(orderRef, order);
  await set(ref(db, `users/${user.uid}/orders/${orderId}`), true);
  await set(ref(db, `users/${user.uid}/totalOrders/${orderId}`), userData.totalOrders + 1);
  return orderId;
}

export async function startPaystack(orderId: string, email: string) {
  const res = await fetch('/api/paystack/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, email }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Init failed');
  const { authorizationUrl, reference } = await res.json();
  // optional: save reference in UI state
  window.location.href = authorizationUrl; // redirect to Paystack hosted page
}

