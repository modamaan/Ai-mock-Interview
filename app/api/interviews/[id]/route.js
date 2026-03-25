import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

// GET /api/interviews/[id] — fetch a single interview by ID (auth-gated)
export async function GET(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Interview ID is required" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("[GET /api/interviews/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
