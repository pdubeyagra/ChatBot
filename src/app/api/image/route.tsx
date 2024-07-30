import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    console.log("[IMAGE_REQUEST]", body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Missing prompt", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Missing amount", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Missing resolution", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "API limit reached. Please purchase a subscription.",
        { status: 429 }
      );
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    
    if (!isPro) {
      await increaseApiLimit();
    }

    console.log("[IMAGE_RESPONSE]", response);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}