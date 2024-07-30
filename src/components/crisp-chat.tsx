"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import exp from "constants";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("4de1dfd7-addd-4a46-9d70-a2ec079329ea");
  }, []);

  return null; 
};
