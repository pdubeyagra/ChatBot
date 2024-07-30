"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    icon: MessageSquare,
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generation",
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video-generation",
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music-generation",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code-generation",
    color: "text-green-700",
    bgColor: "bg-green-500/10",
  },
];
export default function DashboardPage() {
  const router = useRouter();
  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground text-center font-light text-gray-500 text-sm md:text-lg">
          Chat with the smartest AI bot.Experience the power of AI.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <span className="font-semibold">{tool.label}</span>
            </div>
            <ArrowRight className="w-6 h-6" />
          </Card>
        ))}
      </div>
    </>
  );
}
