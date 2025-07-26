"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { soloService } from "@/services/solo";
import { multiplayerService } from "@/services/multiplayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Dice1,
  Trophy,
  Target,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/providers/AuthProvider";

export default function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"solo" | "multiplayer">("solo");
  const t = useTranslations("history");
  const router = useRouter();
  const { user } = useAuth();

  const { data: history, isLoading } = useQuery({
    queryKey: ["soloHistory"],
    queryFn: soloService.getHistory,
  });

  const { data: multiplayerHistory, isLoading: isLoadingMultiplayer } =
    useQuery({
      queryKey: ["multiplayerHistory"],
      queryFn: multiplayerService.getUserGames,
    });

  const totalPages = 1; // Solo service returns all data in one request

  if (isLoading || isLoadingMultiplayer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const calculateSoloStats = () => {
    if (!history?.games)
      return { winRate: 0, totalWins: 0, totalLosses: 0, netChange: 0 };

    const wins = history.games.filter(
      (game) => game.result === "EXACT_MATCH" || game.result === "HIGHER"
    ).length;
    const losses = history.games.filter(
      (game) => game.result === "LOWER"
    ).length;
    const winRate =
      history.games.length > 0
        ? Math.round((wins / history.games.length) * 100)
        : 0;
    const netChange = history.games.reduce(
      (sum, game) => sum + game.balanceChange,
      0
    );

    return { winRate, totalWins: wins, totalLosses: losses, netChange };
  };

  const calculateMultiplayerStats = () => {
    if (!multiplayerHistory?.games || !user)
      return { winRate: 0, totalWins: 0, totalLosses: 0, netChange: 0 };

    const finishedGames = multiplayerHistory.games.filter(
      (game) => game.status === "FINISHED"
    );
    const wins = finishedGames.filter((game) =>
      game.players.find((p) => p.id === user.id && p.isWinner)
    ).length;
    const losses = finishedGames.length - wins;
    const winRate =
      finishedGames.length > 0
        ? Math.round((wins / finishedGames.length) * 100)
        : 0;
    const netChange = finishedGames.reduce((sum, game) => {
      const playerData = game.players.find((p) => p.id === user.id);
      return sum + (playerData?.balanceChange || 0);
    }, 0);

    return { winRate, totalWins: wins, totalLosses: losses, netChange };
  };

  const soloStats = calculateSoloStats();
  const multiplayerStats = calculateMultiplayerStats();
  const currentStats = activeTab === "solo" ? soloStats : multiplayerStats;


  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <button
          onClick={() => router.push("/dashboard")}
          className="hover:text-primary transition-colors"
        >
          Dashboard
        </button>
        <span>/</span>
        <span className="text-white">{t("title")}</span>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setActiveTab("solo")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === "solo"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-white hover:bg-white/10"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Dice1 className="h-4 w-4" />
            <span>Solo Games</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("multiplayer")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === "multiplayer"
              ? "bg-accent text-accent-foreground shadow-lg"
              : "text-muted-foreground hover:text-white hover:bg-white/10"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Multiplayer Games</span>
          </div>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("totalGames")}
            </CardTitle>
            <Dice1 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {activeTab === "solo"
                ? history?.games?.length || 0
                : multiplayerHistory?.games.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("winRate")}
            </CardTitle>
            <Target className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {currentStats.winRate}%
            </div>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("netChange")}
            </CardTitle>
            {currentStats.netChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                currentStats.netChange >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {currentStats.netChange >= 0 ? "+" : ""}${currentStats.netChange}
            </div>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {t("wlRatio")}
            </CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {currentStats.totalWins}/{currentStats.totalLosses}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Games List */}
      <Card className="game-card">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-accent" />
            <span>{t("yourGames")}</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("totalGames")}:{" "}
            {activeTab === "solo"
              ? history?.games?.length || 0
              : multiplayerHistory?.games.length || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTab === "solo"
              ? history?.games.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Generated Number */}
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg bg-gray-700">
                          {game.generatedNumber}
                        </div>

                        {/* Game Result */}
                        <div>
                          <div
                            className={`font-medium ${
                              game.result === "EXACT_MATCH" ||
                              game.result === "HIGHER"
                                ? "text-green-300"
                                : "text-red-300"
                            }`}
                          >
                            {game.result === "EXACT_MATCH"
                              ? "EXACT WIN"
                              : game.result === "HIGHER"
                              ? "HIGHER WIN"
                              : "LOSS"}
                          </div>
                          <div className="text-xs text-gray-400">
                            {t("result")}
                          </div>
                        </div>

                        {/* Balance Change */}
                        <div>
                          <div
                            className={`font-medium ${
                              game.balanceChange > 0
                                ? "text-green-300"
                                : "text-red-300"
                            }`}
                          >
                            {game.balanceChange > 0 ? "+" : ""}$
                            {game.balanceChange}
                          </div>
                          <div className="text-xs text-gray-400">
                            {t("change")}
                          </div>
                        </div>
                      </div>

                      {/* Right side info */}
                      <div className="text-right space-y-1">
                        <div className="font-medium text-white">
                          x{game.multiplier}
                        </div>
                        <div className="text-sm text-gray-400">
                          {format(new Date(game.playedAt), "MMM dd, HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Dice1 className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <p className="text-xl text-muted-foreground">
                      {t("noGames")}
                    </p>
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="mt-4 rainbow-bg hover:scale-105 transition-transform"
                    >
                      {t("startAdventure")}
                    </Button>
                  </div>
                )
              : multiplayerHistory?.games.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Game Type */}
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold bg-accent/20">
                          <Users className="h-6 w-6 text-accent" />
                        </div>

                        {/* Game Status */}
                        <div>
                          <div
                            className={`font-medium ${
                              game.status === "FINISHED"
                                ? game.players.find(
                                    (p) => p.id === user?.id && p.isWinner
                                  )
                                  ? "text-green-300"
                                  : "text-red-300"
                                : "text-yellow-300"
                            }`}
                          >
                            {game.status === "FINISHED"
                              ? game.players.find(
                                  (p) => p.id === user?.id && p.isWinner
                                )
                                ? "WIN"
                                : "LOSS"
                              : game.status}
                          </div>
                          <div className="text-xs text-gray-400">
                            {t("result")}
                          </div>
                        </div>

                        {/* Balance Change */}
                        {game.status === "FINISHED" && (
                          <div>
                            <div
                              className={`font-medium ${
                                (game.players.find((p) => p.id === user?.id)
                                  ?.balanceChange || 0) > 0
                                  ? "text-green-300"
                                  : "text-red-300"
                              }`}
                            >
                              {(game.players.find((p) => p.id === user?.id)
                                ?.balanceChange || 0) > 0
                                ? "+"
                                : ""}
                              $
                              {game.players.find((p) => p.id === user?.id)
                                ?.balanceChange || 0}
                            </div>
                            <div className="text-xs text-gray-400">
                              {t("change")}
                            </div>
                          </div>
                        )}

                        {/* Bet Amount */}
                        <div>
                          <div className="font-medium text-white">
                            ${game.bet}
                          </div>
                          <div className="text-xs text-gray-400">Bet</div>
                        </div>
                      </div>

                      {/* Right side info */}
                      <div className="text-right space-y-1">
                        <div className="font-medium text-white">
                          vs{" "}
                          {game.players.find((p) => p.id !== user?.id)
                            ?.username || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-400">
                          {format(new Date(game.createdAt), "MMM dd, HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-accent/20 to-primary/20 flex items-center justify-center">
                      <Users className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <p className="text-xl text-muted-foreground">
                      No multiplayer games yet
                    </p>
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="mt-4 rainbow-bg hover:scale-105 transition-transform"
                    >
                      Start Playing Multiplayer
                    </Button>
                  </div>
                )}
          </div>

          {/* Pagination - Only for solo games */}
          {activeTab === "solo" && totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("previous")}
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <span className="text-muted-foreground">...</span>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                {t("next")}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
