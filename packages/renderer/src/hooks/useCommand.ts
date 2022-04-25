import { Command } from "@/types";
import { useState } from "react";

export const useCommand = () => {
  const [command, setCommand] = useState<Command | null>(null);

  return { command, setCommand };
};
