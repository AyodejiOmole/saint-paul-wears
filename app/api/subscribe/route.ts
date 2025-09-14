// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { rtdb } from "@/lib/firebaseAdmin";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// convert email to a safe key (replace dots)
function emailKey(email: string) {
  return encodeURIComponent(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const emailRaw = body?.email;
    if (!emailRaw || typeof emailRaw !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const email = normalizeEmail(emailRaw);

    // basic email regex (simple)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const key = emailKey(email);

    const now = Date.now();
    // write subscriber (idempotent)
    await rtdb.ref(`subscribers/${key}`).set({
      email,
      createdAt: now,
      confirmed: true, // we mark true for now; for opt-in you can set false and email confirmation link
    });

    return NextResponse.json({ ok: true, email });
  } catch (err: any) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
