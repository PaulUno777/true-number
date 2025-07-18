"use client";

import { GameHistory } from "@/components/game/GameHistory";
import { GameStats } from "@/components/game/GameStats";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <GameStats />
        <GameHistory />
      </div>
    </ProtectedRoute>
  );
}
