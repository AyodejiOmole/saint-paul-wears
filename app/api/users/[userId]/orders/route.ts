import { NextResponse } from "next/server";
import { rtdb } from "@/lib/firebaseAdmin";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const ordersRef = rtdb.ref("orders");

    // query orders by userId
    const snapshot = await ordersRef
      .orderByChild("userId")
      .equalTo(params.userId)
      .once("value");

    if (!snapshot.exists()) {
      return NextResponse.json([], { status: 200 });
    }

    const ordersData = snapshot.val();
    const orders = Object.entries(ordersData).map(([id, val]) => ({
      id,
      ...(val as any),
    }));

    return NextResponse.json(orders, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching user orders:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
