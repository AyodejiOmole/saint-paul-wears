import { push, ref, set, update, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import type { Order, Address } from '@/types';
import { db } from './firebase';
import { CartItem } from '@/contexts/cart-context';

export async function validateInventory(items: CartItem[]): Promise<{ ok: boolean, failures: string[] }> {
  // aggregate qty per product+variant (to catch duplicates in same order)
  const sums = new Map<string, number>();
  for (const it of items) {
    const key = `${it.id}`;
    sums.set(key, (sums.get(key) || 0) + it.quantity);
  }

  const failures: string[] = [];
  for (const [key, qty] of sums) {
    // const [productId, variantId] = key.split('::');
    const productRef = ref(db, `products/${key}`);
    const snap = await get(productRef);
    if(!snap.exists()) failures.push(`Product ${key} does not exist`);
    const productData = snap.val();

    const stock = snap.exists() ? Number(productData.stock) : 0;
    if (stock < qty) {
      failures.push(`${productData.name} only ${stock} left`);
    }
  }
  return { ok: failures.length === 0, failures };
}

export async function createOrder(items: CartItem[], deliveryFee: number, selectedLocation: string, totalKobo: number, deliveryAddress: Omit<Address, "country" | "street">): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const result = await validateInventory(items);
  if(!result.ok && result.failures.length > 0) {
    throw new Error(result.failures.join(", "));
  }

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
  // await set(ref(db, `users/${user.uid}/totalOrders`), userData.totalOrders + 1);
  await update(ref(db, `users/${user.uid}`), {
    totalOrders: (userData.totalOrders ?? 0) + 1
  });
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

