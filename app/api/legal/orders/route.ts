import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const docRef = await addDoc(collection(db, "legal_orders"), {
      ...body,
      status: "paid",
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ orderId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating legal order:", error);
    return NextResponse.json({ error: "Failed to process legal order" }, { status: 500 });
  }
}
