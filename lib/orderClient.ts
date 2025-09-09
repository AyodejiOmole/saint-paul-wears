import { push, ref, set, serverTimestamp } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import type { Order, OrderItem } from '@/types';
import { db } from './firebase';
import { CartItem } from '@/contexts/cart-context';

export async function createOrder(items: CartItem[], totalKobo: number): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const orderRef = push(ref(db, 'orders'));
  const orderId = orderRef.key!;
  const now = Date.now();

  const order: Omit<Order, 'id'> = {
    userId: user.uid,
    items,
    amount: totalKobo,
    currency: 'NGN',
    status: 'CREATED',
    paystack: { reference: null, authorizationUrl: null, accessCode: null },
    createdAt: now,
    updatedAt: now,
  };

  await set(orderRef, order);
  await set(ref(db, `users/${user.uid}/orders/${orderId}`), true);
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

