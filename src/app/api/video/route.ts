import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limits";
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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input: { prompt } }
    );

    // console.log("Replicate response:", response);
    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Video error", error);
    return new NextResponse("Internal Server Error", {
      status: 501,
    });
  }
}
