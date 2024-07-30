"use client";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Siderbar from "./Sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSidebar = ({
  apiLimitCount,
  isPro = false,
}: MobileSidebarProps) => {
  const [ismounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!ismounted) {
    return null;
  }
  return (
    <div className="">
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Siderbar isPro={isPro} apiLimitCount={apiLimitCount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
