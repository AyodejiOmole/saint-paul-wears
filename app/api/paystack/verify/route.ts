// app/api/paystack/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rtdb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!reference || !orderId) {
    return NextResponse.json({ error: 'Missing reference or orderId' }, { status: 400 });
  }

  // If already processed by webhook, return current state quickly
  const paySnap = await rtdb.ref(`payments/${reference}`).get();
  if (paySnap.exists() && paySnap.val().status === 'WEBHOOK_CONFIRMED') {
    const order = (await rtdb.ref(`orders/${orderId}`).get()).val();
    return NextResponse.json({ status: 'WEBHOOK_CONFIRMED', order });
  }

  // Ask Paystack
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
  const json = await res.json();
  if (!res.ok || !json.status) {
    return NextResponse.json({ error: json.message || 'Verification failed' }, { status: 400 });
  }

  const now = Date.now();
  const isSuccess = json.data.status === 'success';

  const updates: Record<string, any> = {};
  updates[`payments/${reference}/status`] = isSuccess ? 'VERIFIED' : 'FAILED';
  updates[`payments/${reference}/raw/verify`] = json.data;
  updates[`payments/${reference}/updatedAt`] = now;

  if (isSuccess) {
    updates[`orders/${orderId}/status`] = 'AWAITING_WEBHOOK'; // we still prefer webhook to finalize
    updates[`orders/${orderId}/updatedAt`] = now;
  }

  await rtdb.ref().update(updates);

  return NextResponse.json({ status: isSuccess ? 'VERIFIED' : 'FAILED' });
}
