import { NextResponse } from "next/server";
import { rtdb } from "@/lib/firebaseAdmin";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const body = await req.json();

    // body will contain: { name, price, stock, images (new full array) }
    await rtdb.ref(`products/${productId}`).update({
      ...body,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
