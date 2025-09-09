// app/api/paystack/webhook/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { rtdb } from '@/lib/firebaseAdmin';
import crypto from 'crypto';

export const runtime = 'nodejs';

// Ensure Next.js does not pre-parse the body
export const config = {
  api: { bodyParser: false }
};

// Helper to get raw text
async function rawBody(req: NextRequest) {
  const arr = await req.arrayBuffer();
  return Buffer.from(arr);
}

export async function POST(req: NextRequest) {
  const buf = await rawBody(req);
  const signature = req.headers.get('x-paystack-signature') || '';
  const expected = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!).update(buf).digest('hex');
  if (signature !== expected) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(buf.toString('utf8'));
  const eventName = event?.event;
  const ref = event?.data?.reference;
  const orderId = event?.data?.metadata?.orderId;
  const userId = event?.data?.metadata?.userId;

  if (!ref || !orderId) {
    return NextResponse.json({ ok: true }); // ignore unknown
  }

  // Idempotency: if we processed, exit
  const already = await rtdb.ref(`webhooks/${ref}`).get();
  if (already.exists()) return NextResponse.json({ ok: true });

  const now = Date.now();
  const updates: Record<string, any> = {};

  if (eventName === 'charge.success' && event?.data?.status === 'success') {
    updates[`orders/${orderId}/status`] = 'PAID';
    updates[`orders/${orderId}/updatedAt`] = now;
    updates[`payments/${ref}/status`] = 'WEBHOOK_CONFIRMED';
  } else if (['charge.failed', 'charge.abandoned', 'paymentrequest.failed'].includes(eventName)) {
    updates[`orders/${orderId}/status`] = 'FAILED';
    updates[`orders/${orderId}/updatedAt`] = now;
    updates[`payments/${ref}/status`] = 'FAILED';
  }

  updates[`payments/${ref}/orderId`] = orderId;
  updates[`payments/${ref}/userId`] = userId ?? null;
  updates[`payments/${ref}/raw/webhook`] = {
    event: eventName,
    id: event?.data?.id,
    status: event?.data?.status,
    paidAt: event?.data?.paid_at,
    channel: event?.data?.channel,
    authorization: event?.data?.authorization?.auth_code ?? null
  };
  updates[`payments/${ref}/updatedAt`] = now;

  // mark webhook processed
  updates[`webhooks/${ref}`] = {
    processed: true,
    event: eventName,
    createdAt: now
  };

  await rtdb.ref().update(updates);
  return NextResponse.json({ ok: true });
}
