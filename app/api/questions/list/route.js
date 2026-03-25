export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json([]);
    }

    const result = await db
      .select()
      .from(Question)
      .where(eq(Question.createdBy, email))
      .orderBy(desc(Question.id));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/questions/list]", error);
    return NextResponse.json({ error: "Failed to fetch question list" }, { status: 500 });
  }
}
