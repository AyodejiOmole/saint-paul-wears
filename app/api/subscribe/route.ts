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

function encodeKey(email: string) {
  return email.replace(/[.#$[\]]/g, "_"); // replace forbidden chars with "_"
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

    // usage
    const safeKey = encodeKey(email);

    // Check if already subscribed
    const snapshot = await rtdb.ref(`subscribers/${safeKey}`).get();
    if (snapshot.exists()) {
        throw new Error("Email already subscribed");
    }

    const now = Date.now();

    // const listRef = rtdb.ref("subscribers").push();
    // await listRef.set({
    //   email,
    //   createdAt: now,
    //   confirmed: true, // we mark true for now; for opt-in you can set false and email confirmation link
    // });

    // write subscriber (idempotent)
    await rtdb.ref(`subscribers/${safeKey}`).set({
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
