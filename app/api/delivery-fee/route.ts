import { NextResponse } from "next/server";
import { rtdb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snap = await rtdb.ref("deliveryFees").get();
    if (!snap.exists()) {
      return NextResponse.json({ lagos: 0, others: 0 });
    }

    return NextResponse.json(snap.val());
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch delivery fees" }, { status: 500 });
  }
}
