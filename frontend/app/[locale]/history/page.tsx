"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { soloService } from "@/services/solo";
import { multiplayerService } from "@/services/multiplayer";
import { transactionService } from "@/services/transaction";
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
  TrendingUp,
  TrendingDown,
  Calendar,
  Dice1,
  Trophy,
  Target,
  Users,
  CreditCard,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/providers/AuthProvider";
import PageLayout from "@/components/layout/PageLayout";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionPage, setTransactionPage] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "solo" | "multiplayer" | "transactions"
  >("solo");
  const itemsPerPage = 10;
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

  const { data: transactionHistory, isLoading: isLoadingTransactions } =
    useQuery({
      queryKey: ["transactionHistory", transactionPage],
      queryFn: () => transactionService.getHistory(transactionPage, itemsPerPage),
    });

  const { data: userBalance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["userBalance"],
    queryFn: transactionService.getBalance,
  });

  const totalPages = 1; // Solo service returns all data in one request

  if (
    isLoading ||
    isLoadingMultiplayer ||
    isLoadingTransactions ||
    isLoadingBalance
  ) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
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
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      breadcrumbs={[
        {
          label: t("title"),
          current: true,
        },
      ]}
    >

      {/* Tab Navigation */}
      <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("solo")}
          className={`tab-button ${
            activeTab === "solo"
              ? "tab-button-active from-primary to-primary"
              : "tab-button-inactive"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Dice1 className="h-4 w-4" />
            <span>Solo Games</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("multiplayer")}
          className={`tab-button ${
            activeTab === "multiplayer"
              ? "tab-button-active from-accent to-accent"
              : "tab-button-inactive"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Multiplayer Games</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`tab-button ${
            activeTab === "transactions"
              ? "tab-button-active from-secondary to-secondary"
              : "tab-button-inactive"
          }`}
        >
          <div className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Transactions</span>
          </div>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="responsive-grid-stats">
        <Card className="game-card card-hover">
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
                : activeTab === "multiplayer"
                ? multiplayerHistory?.games.length || 0
                : isLoadingTransactions
                ? "..."
                : transactionHistory?.transactions?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="game-card card-hover">
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

        <Card className="game-card card-hover">
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

        <Card className="game-card card-hover">
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
      <Card className="game-card card-hover">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-accent" />
            <span>{t("yourGames")}</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {activeTab === "transactions" ? t("balance", { defaultValue: "Balance" }) : t("totalGames")}:{" "}
            {activeTab === "solo"
              ? history?.games?.length || 0
              : activeTab === "multiplayer"
              ? multiplayerHistory?.games.length || 0
              : isLoadingBalance
              ? t("loading", { defaultValue: "Loading..." })
              : `$${userBalance?.balance || 0}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTab === "transactions"
              ? transactionHistory?.transactions?.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Transaction Type */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg ${
                            transaction.type === "CREDIT"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {transaction.type === "CREDIT" ? "+" : "-"}
                        </div>

                        {/* Transaction Details */}
                        <div>
                          <div
                            className={`font-medium ${
                              transaction.type === "CREDIT"
                                ? "text-green-300"
                                : "text-red-300"
                            }`}
                          >
                            {transaction.description}
                          </div>
                          <div className="text-xs text-gray-400">
                            {transaction.type}
                          </div>
                        </div>

                        {/* Amount */}
                        <div>
                          <div
                            className={`font-medium ${
                              transaction.type === "CREDIT"
                                ? "text-green-300"
                                : "text-red-300"
                            }`}
                          >
                            {transaction.type === "CREDIT" ? "+" : "-"}$
                            {transaction.amount}
                          </div>
                          <div className="text-xs text-gray-400">Amount</div>
                        </div>
                      </div>

                      {/* Right side info */}
                      <div className="text-right space-y-1">
                        <div className="font-medium text-white">
                          ${transaction.balanceAfter || 0}
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (isLoadingTransactions ? (
                  <div className="text-center py-12">
                    <LoadingSpinner text={t("loadingTransactions", { defaultValue: "Loading transactions..." })} />
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 flex items-center justify-center">
                      <CreditCard className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <p className="text-xl text-muted-foreground">
                      No transactions yet
                    </p>
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="mt-4 rainbow-bg hover:scale-105 transition-transform"
                    >
                      Start Playing to Generate Transactions
                    </Button>
                  </div>
                )
              )
              : activeTab === "solo"
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
                            ?.username || t("unknown", { defaultValue: "Unknown" })}
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

          {/* Pagination */}
          {((activeTab === "solo" && totalPages > 1) || 
            (activeTab === "transactions" && transactionHistory && transactionHistory.totalPages > 1)) && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <Pagination
                currentPage={activeTab === "transactions" ? transactionPage : currentPage}
                totalPages={activeTab === "transactions" ? (transactionHistory?.totalPages || 1) : totalPages}
                onPageChange={activeTab === "transactions" ? setTransactionPage : setCurrentPage}
                isLoading={activeTab === "transactions" ? isLoadingTransactions : isLoading}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
}
