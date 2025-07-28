"use client";

import { Radio } from "lucide-react";
import { UseSocketReturn } from "@/hooks/useSocket";

interface ConnectionStatusProps {
  socket: UseSocketReturn;
}

export default function ConnectionStatus({ socket }: ConnectionStatusProps) {
  if (!socket.isConnected) {
    return <Radio className="h-4 w-4 text-orange-500 animate-pulse" />;
  }

  return <Radio className="h-4 w-4 text-green-500" />;
}
