// app/api/paystack/webhook/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { rtdb } from '@/lib/firebaseAdmin';
import crypto from 'crypto';
import { Order } from '@/types';

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

async function decrementInventoryForOrder(order: Order) {
  const changed: Array<{ productId: string; qty: number }> = [];
  // aggregate same variant counts first
  const sums = new Map<string, number>();
  for (const it of order.items) {
    const key = `${it.id}`;
    sums.set(key, (sums.get(key) || 0) + Number(it.quantity));
  }

  for (const [key, qty] of sums) {
    // const [productId, variantId] = key.split('::');
    const stockRef = rtdb.ref(`products/${key}/stock`);
    const txRes = await stockRef.transaction((current) => {
      const curN = Number(current || 0);
      if (curN < qty) {
        // Abort transaction -> return undefined
        return;
      }
      return curN - qty;
    });

    if (!txRes.committed) {
      // failure: roll back previously committed transactions
      for (const c of changed) {
        const ref = rtdb.ref(`products/${c.productId}/stock`);
        await ref.transaction((cur) => (Number(cur || 0) + c.qty));
      }
      return { ok: false, reason: `Insufficient stock for ${key}}` };
    }

    // success, push to changed list
    changed.push({ productId: key, qty });
  }

  return { ok: true, changed };
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

  const userSnap = await rtdb.ref(`users/${userId}`).get();
  const user = userSnap.val();

  const orderSnap = await rtdb.ref(`orders/${orderId}`).get();
  const order = orderSnap.val();

  if (eventName === 'charge.success' && event?.data?.status === 'success') {
    // attempt to decrement inventory
    const inv = await decrementInventoryForOrder(order);
    if (!inv.ok) {
      // mark payments as FAILED_PENDING_REFUND and notify admin / queue refund
      const updates: Record<string, any> = {};
      updates[`orders/${orderId}/status`] = 'FAILED_OUT_OF_STOCK';
      updates[`orders/${orderId}/updatedAt`] = now;
      updates[`payments/${ref}/status`] = 'FAILED_PENDING_REFUND';
      updates[`payments/${ref}/raw/webhook`] = event.data;
      updates[`webhooks/${ref}`] = { processed: true, event: eventName, createdAt: now, note: inv.reason };
      await rtdb.ref().update(updates);

      // TODO: trigger refund via Paystack API or notify admin
      return NextResponse.json({ ok: true, note: 'out_of_stock' });
    }

    updates[`orders/${orderId}/status`] = 'PAID';
    updates[`orders/${orderId}/updatedAt`] = now;
    updates[`payments/${ref}/status`] = 'WEBHOOK_CONFIRMED';

    updates[`users/${userId}/totalSpent`] = user.totalSpent + order.amount;
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

