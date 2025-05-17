import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { QUESTIONS_PROMPT } from "@/services/Constants";

export async function POST(req) {
  const {
    JobPosition,
    JobDescription,
    InterviewDuration,
    InterviewType,
    ExperienceLevel,
  } = await req.json();

  // Replace placeholders in the prompt
  let FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", JobPosition)
    .replace("{{jobDescription}}", JobDescription)
    .replace("{{duration}}", InterviewDuration)
    .replace("{{interviewType}}", InterviewType)
    .replace("{{experience}}", ExperienceLevel);

  // console.log("Final Prompt:", FINAL_PROMPT);

  try {
    // Initialize Google Generative AI API with API Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Specify the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate content using the final prompt
    const result = await model.generateContent(FINAL_PROMPT);
    const response = await result.response;
    const text = await response.text();

    // console.log("Gemini Output:", text);

    // Return the generated text as JSON response
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({
      error: "Gemini API failed",
      details: error.message,
    });
  }
}
