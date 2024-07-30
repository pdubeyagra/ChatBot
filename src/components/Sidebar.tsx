"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import FreeCounter from "./free-counter";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-voilet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generation",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video-generation",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music-generation",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code-generation",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}
const Siderbar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <>
      <div className="space-y-4 flex flex-col h-screen bg-[#111827] text-white">
        <div className="px-3 pt-4 py-2 flex-1">
          <Link href="/dashboard" className="flex items-center pl-3 mb-14 ">
            <div className="relative w-8 h-8 mr-4">
              <Image
                alt="Logo"
                src="/download.svg"
                className="rounded-lg"
                fill
              />
            </div>
            <h1 className="text-2xl font-bold">ChatBot</h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  `flex items-center p-2 rounded-lg hover:bg-gray-700 hover:text-white hover:bg-opacity-30 ${route.color}`,
                  pathname === route.href && " bg-white/10"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className="w-6 h-6" />
                  <span className="ml-3">{route.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative bottom-4">
          <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
        </div>
      </div>
    </>
  );
};
export default Siderbar;
