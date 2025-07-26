"use client";

import { useState } from "react";
import { Dice1, Users } from "lucide-react";

interface GameModeSwitchProps {
  defaultMode?: "solo" | "multiplayer";
  onModeChange: (mode: "solo" | "multiplayer") => void;
}

export default function GameModeSwitch({ 
  defaultMode = "solo", 
  onModeChange 
}: GameModeSwitchProps) {
  const [activeMode, setActiveMode] = useState<"solo" | "multiplayer">(defaultMode);

  const handleModeChange = (mode: "solo" | "multiplayer") => {
    setActiveMode(mode);
    onModeChange(mode);
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative bg-white/10 rounded-full p-1 backdrop-blur-sm border border-white/20">
        <div className="flex items-center">
          <button
            onClick={() => handleModeChange("solo")}
            className={`relative px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 ${
              activeMode === "solo"
                ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Dice1 className={`h-4 w-4 ${activeMode === "solo" ? "animate-bounce" : ""}`} />
            <span className="font-medium">Solo</span>
          </button>
          <button
            onClick={() => handleModeChange("multiplayer")}
            className={`relative px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 ${
              activeMode === "multiplayer"
                ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className={`h-4 w-4 ${activeMode === "multiplayer" ? "animate-pulse" : ""}`} />
            <span className="font-medium">Multiplayer</span>
          </button>
        </div>
      </div>
    </div>
  );
}