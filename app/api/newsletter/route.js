import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Newsletter } from "@/utils/schema";

// POST /api/newsletter — save a contact form submission
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const createdAt = new Date().toISOString().split("T")[0];

    await db.insert(Newsletter).values({
      newName: name.trim().substring(0, 100),
      newEmail: email.trim().substring(0, 200),
      newMessage: message.trim().substring(0, 2000),
      createdAt,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/newsletter]", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
