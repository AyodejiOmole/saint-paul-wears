import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

import { db, auth } from "@/lib/firebase";

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
    const body = await req.json();
  const { email, password, firstName, lastName, phone } = body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const uid = firebaseUser.uid;

    // const userRecord = await admin.auth().createUser({
    //   email,
    //   password,
    //   displayName: `${firstName} ${lastName}`,
    // });

    const fullUser = {
      id: uid,
      email,
      firstName,
      lastName,
      phone,
      joinDate: new Date().toISOString().split("T")[0],
      role: "user",
      totalSpent: 0,
      totalOrders: 0,
    };

    await set(ref(db, `users/${uid}`), fullUser);

    // await admin.database().ref(`users/${userRecord.uid}`).set(fullUser);

    // Send notification email to admin
    await transporter.sendMail({
      from: `"Your Store" <${process.env.EMAIL_USERNAME}>`,
      to: "wearsaintpaul@gmail.com",  // change this to your notification recipient
      subject: "🛒 New User Registered",
      text: `A new user just signed up:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || "N/A"}`,
    });

    // return res.status(200).json({ success: true, message: "User created.", user: fullUser });
    return NextResponse.json({ success: true, message: "User created.", user: fullUser });
  } catch (error) {
    console.error("Signup failed:", error);
    // return res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Signup failed." });
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Signup failed." });
  }
}
