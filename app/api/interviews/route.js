import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { createChatSession } from "@/utils/GeminiAIModal";
import { rateLimit } from "@/utils/rateLimit";
import { v4 as uuidv4 } from "uuid";

// POST /api/interviews — generate questions via Gemini and save interview
export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 5 new interviews per minute per user
    const rl = rateLimit(`create-interview:${userId}`, { limit: 5, windowMs: 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before creating another interview." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
      );
    }

    const body = await request.json();
    const { jobPosition, jobDesc, jobExperience } = body;

    // Validate
    if (!jobPosition?.trim() || !jobDesc?.trim() || !jobExperience?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const expNum = parseInt(jobExperience);
    if (isNaN(expNum) || expNum < 0 || expNum > 50) {
      return NextResponse.json(
        { error: "Years of experience must be between 0 and 50" },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitize = (str) =>
      str.replace(/[<>{}]/g, "").trim().substring(0, 500);
    const position = sanitize(jobPosition);
    const description = sanitize(jobDesc);
    const experience = sanitize(jobExperience);

    // Generate questions with Gemini
    const prompt = `Generate 5 interview questions and answers for:
Job Position: ${position}
Job Description: ${description}
Years of Experience: ${experience}

Please provide a valid JSON array with this exact format:
[
  {
    "Question": "Your interview question here?",
    "Answer": "Your detailed answer here."
  }
]

Keep questions professional and relevant to the job requirements.`;

    const session = createChatSession();
    const aiResult = await session.sendMessage(prompt);
    let responseText = aiResult.response.text();

    // Clean and validate JSON
    const cleanedResponse = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^\s*[\r\n]/gm, "")
      .trim();

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(cleanedResponse);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 502 }
      );
    }

    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      return NextResponse.json(
        { error: "Invalid AI response format. Please try again." },
        { status: 502 }
      );
    }

    for (const item of parsedQuestions) {
      if (!item.Question || !item.Answer) {
        return NextResponse.json(
          { error: "Invalid question format from AI. Please try again." },
          { status: 502 }
        );
      }
    }

    // Save to DB
    const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
    const mockId = uuidv4();
    const createdAt = new Date().toISOString().split("T")[0];

    await db.insert(MockInterview).values({
      mockId,
      jsonMockResp: cleanedResponse,
      jobPosition: position,
      jobDesc: description,
      jobExperience: experience,
      createdBy: userEmail,
      createdAt,
    });

    return NextResponse.json({ mockId }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/interviews]", error);
    return NextResponse.json(
      { error: "Failed to create interview. Please try again." },
      { status: 500 }
    );
  }
}
