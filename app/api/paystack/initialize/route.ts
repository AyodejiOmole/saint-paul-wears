import { NextRequest, NextResponse } from 'next/server';
import { rtdb } from '@/lib/firebaseAdmin';
// import crypto from 'crypto';
// import { Order, Product } from '@/types';
import { validateInventory } from '@/lib/utils';

export const runtime = 'nodejs';

type InitBody = {
  orderId: string;
  email: string; // Paystack requires customer email
  callbackUrl?: string; // optional if you want Paystack to redirect here
};


export async function POST(req: NextRequest) {
  try {
    const { orderId, email, callbackUrl }: InitBody = await req.json();

    const orderSnap = await rtdb.ref(`orders/${orderId}`).get();
    if (!orderSnap.exists()) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const order = orderSnap.val();
    if (order.status !== 'CREATED') {
      return NextResponse.json({ error: 'Order not in CREATED state' }, { status: 400 });
    }

    const result = await validateInventory(order);
    if(!result.ok && result.failures.length > 0) {
      return NextResponse.json({ error: result.failures }, { status: 400 });
    }

    // Create unique reference (idempotent key)
    const reference = `ORD_${orderId}_${Date.now()}`;

    // Recompute subTotal from items server-side
    const subTotal = (order.items || []).reduce((s: number, it: any) => s + Number(it.price) * Number(it.quantity), 0);
    const deliveryFee = Number(order.deliveryFee || 0);

    // Ensure we don't add delivery twice:
    const amount = subTotal + deliveryFee;

    const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // convert to kobo
        currency: order.currency || 'NGN',
        reference,
        callback_url: callbackUrl ?? `${process.env.APP_URL}/checkout/success?orderId=${orderId}`,
        metadata: {
          orderId,
          userId: order.userId,
        },
      }),
    });

    const initJson = await initRes.json();
    if (!initRes.ok || !initJson.status) {
      return NextResponse.json({ error: initJson.message || 'Paystack init failed' }, { status: 400 });
    }

    // Atomic update: mark order INITIATED + write payment record
    const now = Date.now();
    await rtdb.ref(`orders/${orderId}`).update({ subTotal, amount });
    const updates: Record<string, any> = {};
    updates[`orders/${orderId}/status`] = 'INITIATED';
    updates[`orders/${orderId}/paystack`] = {
      reference,
      authorizationUrl: initJson.data.authorization_url,
      accessCode: initJson.data.access_code,
    };
    updates[`orders/${orderId}/updatedAt`] = now;
    updates[`payments/${reference}`] = {
      orderId,
      userId: order.userId,
      amount: order.amount,
      currency: order.currency || 'NGN',
      status: 'INITIATED',
      raw: { init: initJson.data },
      createdAt: now,
      updatedAt: now,
    };

    await rtdb.ref().update(updates);

    return NextResponse.json({
      authorizationUrl: initJson.data.authorization_url,
      reference,
      accessCode: initJson.data.access_code,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
