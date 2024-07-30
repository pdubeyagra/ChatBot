import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("No messages provided or invalid format", {
        status: 400,
      });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "API limit reached. Please purchase a subscription.",
        { status: 429 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    const message =
      response.choices[0]?.message?.content || "No response content";

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error("Conversation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
