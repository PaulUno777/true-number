"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Gamepad2, History, TrendingUp, Coins } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/hooks/useGame";
import { useGameStats } from "@/hooks/useGameStats";
import { useGameHistory } from "@/hooks/useGameHistory";

function DashboardContent() {
  const t = useTranslations("dashboard");
  const tGame = useTranslations("game");
  const { user } = useAuth();
  const { userBalance } = useGame();
  const { data: stats } = useGameStats();
  const { data: recentGames } = useGameHistory({ size: 5 });

  const quickStats = [
    {
      title: tGame("totalGames"),
      value: stats?.totalGames || 0,
      icon: Gamepad2,
      color: "text-info",
    },
    {
      title: tGame("gamesWon"),
      value: stats?.wonGames || 0,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: tGame("winRate"),
      value: `${Math.round((stats?.winRate || 0) * 100) / 100}%`,
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">
          {t("welcome", { username: user?.username || "" })}
        </h1>
        <p className="text-xl text-muted-foreground">
          Ready for another round of TrueNumber?
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="gradient" className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Coins className="h-6 w-6 text-warning" />
              {tGame("yourBalance")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary mb-4">
              {userBalance?.balance || 0}
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {tGame("points")}
            </Badge>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Link href="/game">
          <Card className="hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Gamepad2 className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{t("playNow")}</h3>
              <p className="text-muted-foreground">
                Test your luck with numbers!
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/history">
          <Card className="hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <History className="h-12 w-12 text-secondary-foreground mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{t("viewHistory")}</h3>
              <p className="text-muted-foreground">Review your past games</p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">{t("quickStats")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} variant="glass">
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
      </motion.div>

      {/* Recent Games */}
      {recentGames?.data.content?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t("recentGames")}</h2>
            <Link href="/history">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            {recentGames.data.content.slice(0, 3).map((game: any) => (
              <Card key={game.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-bold w-8 text-center">
                      {game.generatedNumber}
                    </div>
                    <Badge
                      variant={
                        game.result === "WON" ? "success" : "destructive"
                      }
                    >
                      {tGame(game.result.toLowerCase())}
                    </Badge>
                  </div>
                  <div
                    className={`font-semibold ${
                      game.balanceChange > 0
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {game.balanceChange > 0 ? "+" : ""}
                    {game.balanceChange}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
