"use client";

import React from "react";
import { Users, GamepadIcon, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface SoloStats {
  totalGames: number;
  exactMatches: number;
  higherWins: number;
}

interface UsersData {
  data: unknown[];
}

interface StatisticsOverviewProps {
  users: UsersData | undefined;
  soloStats: SoloStats | undefined;
  t: (key: string, params?: Record<string, string | number | Date>) => string;
}

const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({
  users,
  soloStats,
  t,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="game-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            {t("totalUsers")}
          </CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {users?.data?.length || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("registeredUsers")}
          </p>
        </CardContent>
      </Card>

      <Card className="game-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            {t("totalGames")}
          </CardTitle>
          <GamepadIcon className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">
            {soloStats?.totalGames || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("gamesPlayed")}
          </p>
        </CardContent>
      </Card>

      <Card className="game-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            {t("globalWinRate")}
          </CardTitle>
          <Target className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">
            {soloStats !== undefined && soloStats.totalGames > 0
              ? (
                  ((soloStats.exactMatches + soloStats?.higherWins) /
                    soloStats?.totalGames) *
                  100
                ).toFixed(1)
              : 0}
            %
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("successRate")}
          </p>
        </CardContent>
      </Card>

      <Card className="game-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            {t("totalUsers")}
          </CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {users?.data?.length || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("activeUsers")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(StatisticsOverview);