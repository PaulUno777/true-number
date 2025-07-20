"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gameService } from "@/services/game";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Calendar, Dice1, Trophy, Target, ArrowUp, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const t = useTranslations("history");
  const router = useRouter();

  const { data: history, isLoading } = useQuery({
    queryKey: ["history", currentPage],
    queryFn: () =>
      gameService.getHistory({ page: currentPage, size: pageSize }),
  });

  const totalPages = history?.meta.totalPages || 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const calculateStats = () => {
    if (!history?.data) return { winRate: 0, totalWins: 0, totalLosses: 0, netChange: 0 };
    
    const wins = history.data.filter(game => game.result === "WON").length;
    const losses = history.data.filter(game => game.result === "LOST").length;
    const winRate = history.data.length > 0 ? Math.round((wins / history.data.length) * 100) : 0;
    const netChange = history.data.reduce((sum, game) => sum + game.balanceChange, 0);
    
    return { winRate, totalWins: wins, totalLosses: losses, netChange };
  };

  const stats = calculateStats();

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
          onClick={() => router.push('/dashboard')}
          className="hover:text-primary transition-colors"
        >
          Dashboard
        </button>
        <span>/</span>
        <span className="text-white">{t("title")}</span>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{t("totalGames")}</CardTitle>
            <Dice1 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{history?.meta.totalCount || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{stats.winRate}%</div>
          </CardContent>
        </Card>
        
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Net Change</CardTitle>
            {stats.netChange >= 0 ? 
              <TrendingUp className="h-4 w-4 text-green-400" /> : 
              <TrendingDown className="h-4 w-4 text-red-400" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.netChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.netChange >= 0 ? '+' : ''}${stats.netChange}
            </div>
          </CardContent>
        </Card>
        
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">W/L Ratio</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.totalWins}/{stats.totalLosses}</div>
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
            {t("totalGames")}: {history?.meta.totalCount || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history?.data.map((game, index) => (
              <div
                key={game.id}
                className={`group p-6 rounded-xl glass-effect border border-white/20 hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                  index === 0 ? 'ring-2 ring-accent/30 shadow-accent/20' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Generated Number */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r ${
                        game.result === "WON" 
                          ? 'from-green-500 to-emerald-600 shadow-green-500/30' 
                          : 'from-red-500 to-rose-600 shadow-red-500/30'
                      } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {game.generatedNumber}
                      </div>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                        game.result === "WON" ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'
                      } opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Game Result */}
                    <div className="text-center">
                      <div className={`text-lg font-bold flex items-center space-x-1 ${
                        game.result === "WON" ? "text-green-400" : "text-red-400"
                      }`}>
                        {game.result === "WON" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        <span>{game.result === "WON" ? "VICTORY" : "DEFEAT"}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{t("result")}</div>
                    </div>
                    
                    {/* Balance Change */}
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        game.balanceChange > 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {game.balanceChange > 0 ? "+" : ""}${game.balanceChange}
                      </div>
                      <div className="text-xs text-muted-foreground">{t("change")}</div>
                    </div>
                  </div>
                  
                  {/* Right side info */}
                  <div className="text-right space-y-1">
                    <div className="text-lg font-semibold text-accent">${game.newBalance}</div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(game.playedAt), "MMM dd, HH:mm")}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Dice1 className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground">{t("noGames")}</p>
                <Button 
                  onClick={() => router.push('/dashboard')}
                  className="mt-4 rainbow-bg hover:scale-105 transition-transform"
                >
                  Start Playing
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
                          ? 'bg-accent text-accent-foreground shadow-lg' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="text-muted-foreground">...</span>}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
