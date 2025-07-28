"use client";

import React from "react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface TopPlayer {
  id: string;
  username: string;
  wonGames: number;
  totalGames: number;
  balance: number;
  winRate: number;
}

interface TopPlayersPreviewProps {
  topPlayers: { data: TopPlayer[] } | undefined;
  isLoading: boolean;
  onViewAll: () => void;
  t: (key: string, params?: Record<string, string | number | Date>) => string;
}

const TopPlayersPreview: React.FC<TopPlayersPreviewProps> = ({
  topPlayers,
  isLoading,
  onViewAll,
  t,
}) => {
  return (
    <Card className="game-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-white flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent" />
            <span>Top Players</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("leadingPlayers")}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={onViewAll}
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          {t("viewAll")}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : topPlayers?.data && topPlayers.data.length > 0 ? (
            topPlayers.data
              .slice(0, 5)
              .sort((a, b) => b.winRate - a.winRate)
              .map((player: TopPlayer, index: number) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 rounded-lg glass-effect border border-white/20 hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-gray-400"
                          : index === 2
                          ? "bg-amber-600"
                          : "bg-gradient-to-r from-accent to-secondary"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {player.username}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {player.wonGames} {t("wins")} • {player.totalGames}{" "}
                        {t("games")}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-accent">
                      ${player.balance}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {player.winRate.toFixed(1)}% {t("winRate")}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              {t("noPlayers")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(TopPlayersPreview);
