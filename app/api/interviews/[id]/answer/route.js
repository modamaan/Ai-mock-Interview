import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { createChatSession } from "@/utils/GeminiAIModal";
import { rateLimit } from "@/utils/rateLimit";

// POST /api/interviews/[id]/answer — evaluate answer with Gemini and save to DB
export async function POST(request, { params }) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 30 answers per 5 minutes per user
    const rl = rateLimit(`record-answer:${userId}`, { limit: 30, windowMs: 5 * 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { question, correctAns, userAns } = body;

    if (!question || !userAns) {
      return NextResponse.json({ error: "question and userAns are required" }, { status: 400 });
    }

    // Build Gemini feedback prompt
    const feedbackPrompt = `Question: ${question}
User Answer: ${userAns}

Evaluate the user's answer for the given interview question.
Provide a rating out of 10 and feedback (3-5 lines) for improvement.
Respond in this exact JSON format:
{
  "rating": 7,
  "feedback": "Your feedback here."
}`;

    const session = createChatSession();
    const aiResult = await session.sendMessage(feedbackPrompt);
    let responseText = aiResult.response.text();

    const cleanedResponse = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let feedbackJson;
    try {
      feedbackJson = JSON.parse(cleanedResponse);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI feedback. Please try again." },
        { status: 502 }
      );
    }

    const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
    const createdAt = new Date().toISOString().split("T")[0];

    await db.insert(UserAnswer).values({
      mockIdRef: id,
      question,
      correctAns: correctAns ?? "",
      userAns,
      feedback: feedbackJson?.feedback ?? "",
      rating: String(feedbackJson?.rating ?? "0"),
      userEmail,
      createdAt,
    });

    return NextResponse.json({
      feedback: feedbackJson.feedback,
      rating: feedbackJson.rating,
    });
  } catch (error) {
    console.error("[POST /api/interviews/[id]/answer]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
