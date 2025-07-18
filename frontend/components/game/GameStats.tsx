"use client";

import { useTranslations } from "next-intl";
import { TrendingUp, Trophy, Target, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useGameStats } from "@/hooks/useGameStats";

export function GameStats() {
  const t = useTranslations("game");
  const { data: stats, isLoading } = useGameStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: t("totalGames"),
      value: stats?.totalGames || 0,
      icon: BarChart3,
      color: "text-info",
    },
    {
      title: t("gamesWon"),
      value: stats?.wonGames || 0,
      icon: Trophy,
      color: "text-success",
    },
    {
      title: t("gamesLost"),
      value: stats?.lostGames || 0,
      icon: Target,
      color: "text-destructive",
    },
    {
      title: t("winRate"),
      value: `${Math.round((stats?.winRate || 0) * 100) / 100}%`,
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <BarChart3 className="h-6 w-6" />
        {t("gameStatistics")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
