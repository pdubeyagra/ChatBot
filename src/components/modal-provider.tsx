"use client"

import { useEffect, useState } from "react";
import { ProModal } from "./ProModal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [isOpen]);
  return (
    <div>
      <ProModal 
    //   isOpen={isOpen} setIsOpen={setIsOpen} 
      />
    </div>
  );
};
