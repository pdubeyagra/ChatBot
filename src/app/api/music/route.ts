import { checkApiLimit, increaseApiLimit } from "@/lib/api-limits";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkSubscription } from "@/lib/subscription";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});
// console.log("Replicate API Key:", process.env.REPLICATE_API_KEY);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    // console.log("User ID:", userId);
    const body = await req.json();
    const { prompt } = body;
    // console.log("Prompt:", prompt);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("No prompt provided", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "API limit reached. Please purchase a subscription.",
        { status: 429 }
      );
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );
    // console.log("Replicate response:", response);

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Music error", error);
    return new NextResponse("Internal Server Error", {
      status: 501,
    });
  }
}
