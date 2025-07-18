"use client";

import { GameBoard } from "@/components/game/GameBoard";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function GamePage() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <GameBoard />
      </div>
    </ProtectedRoute>
  );
}
