// app/checkout/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useSearchParams } from 'next/navigation';

export default function ConfirmPayment() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  const reference = params.get('reference'); // Paystack may append ref
  const [status, setStatus] = useState('LOADING');

  useEffect(() => {
    if (!orderId) return;
    // Verify quickly (optional)
    if (reference) fetch(`/api/paystack/verify?reference=${reference}&orderId=${orderId}`).catch(() => {});
    // Subscribe to order status
    const unsub = onValue(ref(db, `orders/${orderId}/status`), (snap) => {
      setStatus(snap.val());
    });
    return () => unsub();
  }, [orderId, reference]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Payment Status</h1>
      <p className="mt-2">Order: {orderId}</p>
      <p className="mt-2">Status: {status}</p>
      {status === 'PAID' && <p className="mt-4">🎉 Payment confirmed!</p>}
      {status === 'FAILED' && <p className="mt-4">❌ Payment failed.</p>}
      {['CREATED','INITIATED','AWAITING_WEBHOOK'].includes(status) && <p className="mt-4">⏳ Waiting for confirmation…</p>}
    </main>
  );
}
