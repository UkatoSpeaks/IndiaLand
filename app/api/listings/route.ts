import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    
    let listingsQuery = query(
      collection(db, "listings"),
      where("status", "==", "active"),
      orderBy("createdAt", "desc")
    );

    if (city) {
      listingsQuery = query(listingsQuery, where("city", "==", city));
    }

    const querySnapshot = await getDocs(listingsQuery);
    const listings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const docRef = await addDoc(collection(db, "listings"), {
      ...body,
      status: "active",
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}
