import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { jobPosition, jobDesc, jobExperience, typeQuestion, company } = body;

    if (!jobPosition || !jobDesc || !typeQuestion || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    const prompt = `
    Given the following details:
    - Job Position: ${jobPosition}
    - Job Description: ${jobDesc}
    - Years of Experience: ${jobExperience}
    - Type of Question: ${typeQuestion}
    - Previous Questions from this Company: ${company}
  
    Please generate 5 interview questions relevant to the job position, experience level, and question type provided. Each question should be accompanied by a comprehensive answer. The output should be in JSON format with "Question" and "Answer" as fields.
  
    Example format:
    [
      {
        "Question": "Your question here",
        "Answer": "The corresponding answer here"
      }
    ]
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    const MockQuestionJsonResp = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const mockId = uuidv4();

    await db.insert(Question).values({
      mockId,
      MockQuestionJsonResp,
      jobPosition,
      jobDesc,
      jobExperience: jobExperience?.toString() || "0",
      typeQuestion,
      company,
      createdBy: email,
      createdAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ mockId });
  } catch (error) {
    console.error("[POST /api/questions]", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
