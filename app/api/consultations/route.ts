import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const docRef = await addDoc(collection(db, "consultations"), {
      ...body,
      status: "pending",
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json({ error: "Failed to submit consultation request" }, { status: 500 });
  }
}
