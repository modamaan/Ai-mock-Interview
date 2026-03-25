import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const result = await db
      .select()
      .from(Question)
      .where(eq(Question.mockId, id));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Questions not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(`[GET /api/questions/${params.id}]`, error);
    return NextResponse.json({ error: "Failed to fetch questions details" }, { status: 500 });
  }
}
