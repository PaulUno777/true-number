"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gameService } from "@/services/game";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/Card";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { Dice1, TrendingUp, History, Target, Dices } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Confetti from "@/components/ui/Confetti";
import { AxiosError } from "axios";
import { GamePlayResponse } from "@/types/game";

export default function DashboardPage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("dashboard");
  const [lastResult, setLastResult] = useState<GamePlayResponse | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);


  const { data: history } = useQuery({
    queryKey: ["history"],
    queryFn: () => gameService.getHistory({ page: 1, size: 5 }),
  });

  const playGameMutation = useMutation({
    mutationFn: gameService.playGame,
    onSuccess: (data) => {
      setLastResult(data);

      // Refresh user data to update balance
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["history"] });

      if (data.result === "WON") {
        setShowConfetti(true);
        toast.success(`${t("victory")} +$${data.balanceChange}`, {
          style: {
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            color: "white",
          },
        });
      } else {
        toast.error(`${t("defeat")} -$${Math.abs(data.balanceChange)}`);
      }
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || "Game error");
      console.error(error);
     
    },
  });

  const calculateWinRate = () => {
    if (!history?.data.length) return 0;
    const wins = history.data.filter((game) => game.result === "WON").length;
    return Math.round((wins / history.data.length) * 100);
  };

  return (
    <div className="space-y-8 relative">
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("currentBalance")}
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              ${lastResult?.newBalance || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("accumulatedFortune")}
            </p>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("gamesPlayed")}
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Dice1 className="h-4 w-4 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {history?.meta.totalCount || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("gameExperience")}
            </p>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("winRate")}
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {calculateWinRate()}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("playerAccuracy")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Game Play Section */}
      <Card className="game-card ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2">
            <span>{t("gameZone")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-6">
            <div className="text-xl text-white font-semibold">
              {t("gameQuestion")}
              <br />
              <span className="text-accent text-lg">
                {t("gameQuestionSub")}
              </span>
            </div>

            {lastResult && (
              <div className="p-6 rounded-2xl glass-effect">
                <div className="text-3xl font-bold mb-3 text-white">
                  {t("lastNumber")}: {lastResult.generatedNumber}
                </div>
                <div
                  className={`text-xl font-bold mb-2 ${
                    lastResult.result === "WON"
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {lastResult.result === "WON" ? t("victory") : t("defeat")}
                </div>
                <div className="text-lg text-muted-foreground">
                  {t("balanceChange")}:{" "}
                  {lastResult.balanceChange > 0 ? "+" : ""}$
                  {lastResult.balanceChange}
                </div>
              </div>
            )}

            <Button
              onClick={() => playGameMutation.mutate()}
              isLoading={playGameMutation.isPending}
              disabled={!user}
              size="lg"
              className="w-full h-16 text-xl bg-primary hover:bg-primary/90 transition-colors font-bold text-white border-2 border-white/30"
            >
              {playGameMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <span>{t("generating")}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Dices className="h-6 w-6" />
                  <span>{t("playGame")}</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Games Section */}
      <Card className="game-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <History className="h-5 w-5 text-accent" />
              {t("recentGames")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("recentGamesDescription")}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/history")}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <History className="h-4 w-4 mr-2" />
            {t("viewAll")}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history?.data.map((game) => (
              <div
                key={game.id}
                className="p-4 rounded-lg glass-effect border border-white/20 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-white font-semibold text-lg">
                      {game.generatedNumber}
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={`font-medium ${
                          game.result === "WON"
                            ? "text-green-300"
                            : "text-red-300"
                        }`}
                      >
                        {game.result === "WON" ? "WIN" : "LOSS"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(game.playedAt).toLocaleString("fr-FR")}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-medium ${
                      game.balanceChange > 0 ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {game.balanceChange > 0 ? "+" : ""}${game.balanceChange}
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-muted-foreground">
                <Dice1 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p>{t("noGames")}</p>
                <p className="text-sm">{t("startAdventure")}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
