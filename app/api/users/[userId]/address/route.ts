import { NextResponse } from "next/server";
import { rtdb } from "@/lib/firebaseAdmin";

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await req.json();

    // Validate required fields
    const { street, city, state, zipCode, address } = body;
    if (!street || !city || !state || !zipCode || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await rtdb.ref(`users/${userId}/address`).update({
        ...body,
    });

    return NextResponse.json({ success: true, message: "Address updated successfully" });
  } catch (error: any) {
    console.error("Error updating address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
