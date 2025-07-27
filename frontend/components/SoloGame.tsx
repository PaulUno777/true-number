"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { soloService } from "@/services/solo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Dice1, Zap, Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { PlaySoloGameDto, PlaySoloGameResponseDto } from "@/types/solo";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Confetti from "@/components/ui/Confetti";
import { useTranslations } from "next-intl";

interface SoloGameProps {
  balance?: number;
  onGameComplete?: () => void;
}

export default function SoloGame({
  balance = 0,
  onGameComplete,
}: SoloGameProps) {
  const { refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const t = useTranslations("solo");

  const [gameData, setGameData] = useState<PlaySoloGameDto>({
    bet: 50,
    chosenNumber: 50,
  });
  const [lastResult, setLastResult] = useState<PlaySoloGameResponseDto | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playGameMutation = useMutation({
    mutationFn: soloService.play,
    onSuccess: (data) => {
      setLastResult(data);
      setIsPlaying(false);
      
      // Dismiss loading toast
      toast.dismiss("game-loading");

      // Show confetti and enhanced toasts for wins
      if (data.game.result === "EXACT_MATCH") {
        setShowConfetti(true);
        toast.success(t("exactMatchWin"), {
          duration: 6000,
          style: {
            background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
            color: "white",
            border: "1px solid rgba(251, 191, 36, 0.3)",
            boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)",
          },
          icon: "🏆",
        });
      } else if (data.game.result === "HIGHER") {
        setShowConfetti(true);
        toast.success(t("higherWin"), {
          duration: 5000,
          style: {
            background: "linear-gradient(45deg, #10b981, #059669)",
            color: "white",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
          },
          icon: "🎉",
        });
      } else {
        toast.error(t("lowerLoss"), {
          duration: 4000,
          style: {
            background: "linear-gradient(45deg, #ef4444, #dc2626)",
            color: "white",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
          },
          icon: "😔",
        });
      }

      // Show balance update notification
      setTimeout(() => {
        toast.success(t("balanceUpdated"), {
          duration: 2000,
          style: {
            background: "linear-gradient(45deg, #8b5cf6, #7c3aed)",
            color: "white",
            border: "1px solid rgba(139, 92, 246, 0.3)",
          },
          icon: "💰",
        });
      }, 1000);

      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["soloHistory"] });
      onGameComplete?.();
    },
    onError: (error: unknown) => {
      setIsPlaying(false);
      toast.dismiss("game-loading");
      
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("failedToPlay"), {
          duration: 5000,
          style: {
            background: "linear-gradient(45deg, #ef4444, #dc2626)",
            color: "white",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
          },
          icon: "❌",
        });
      }
    },
  });

  const handlePlay = () => {
    if (gameData.bet > balance) {
      toast.error(t("insufficientBalance"), {
        style: {
          background: "linear-gradient(45deg, #ef4444, #dc2626)",
          color: "white",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
        icon: "💰",
      });
      return;
    }

    if (gameData.chosenNumber < 20 || gameData.chosenNumber > 100) {
      toast.error(t("invalidNumber"), {
        style: {
          background: "linear-gradient(45deg, #f59e0b, #d97706)",
          color: "white",
          border: "1px solid rgba(245, 158, 11, 0.3)",
        },
        icon: "🎯",
      });
      return;
    }

    if (gameData.bet < 1 || gameData.bet > 1000) {
      toast.error(t("invalidBet"), {
        style: {
          background: "linear-gradient(45deg, #f59e0b, #d97706)",
          color: "white",
          border: "1px solid rgba(245, 158, 11, 0.3)",
        },
        icon: "💸",
      });
      return;
    }

    setIsPlaying(true);
    setLastResult(null);
    
    // Show starting toast
    toast.loading(t("gameStarting"), {
      id: "game-loading",
      style: {
        background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
        color: "white",
        border: "1px solid rgba(59, 130, 246, 0.3)",
      },
    });

    playGameMutation.mutate(gameData);
  };

  const getResultIcon = (result?: string) => {
    switch (result) {
      case "EXACT_MATCH":
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case "HIGHER":
        return <TrendingUp className="h-6 w-6 text-green-400" />;
      case "LOWER":
        return <TrendingDown className="h-6 w-6 text-red-400" />;
      default:
        return <Dice1 className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getResultText = (result?: string) => {
    switch (result) {
      case "EXACT_MATCH":
        return {
          text: t("exactMatchResult"),
          color: "text-yellow-400",
          bg: "bg-yellow-500/20",
        };
      case "HIGHER":
        return {
          text: t("higherWinResult"),
          color: "text-green-400",
          bg: "bg-green-500/20",
        };
      case "LOWER":
        return { text: t("lowerLossResult"), color: "text-red-400", bg: "bg-red-500/20" };
      default:
        return {
          text: t("playToWin"),
          color: "text-muted-foreground",
          bg: "bg-white/5",
        };
    }
  };

  const resultInfo = getResultText(lastResult?.game.result);

  return (
    <div className="space-y-6 relative">
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Game Rules - Responsive */}
      <Card className="game-card card-hover bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
        <CardContent className="p-4 pt-4">
          <div className="text-center space-y-2">
            <p className="text-white font-medium text-sm sm:text-base">
              {t("gameRules")}
            </p>
            <div className="flex justify-center flex-wrap gap-2 sm:gap-6 text-xs sm:text-sm">
              <span className="text-yellow-400 px-2 py-1 rounded bg-yellow-500/10">{t("exactMatch")}</span>
              <span className="text-green-400 px-2 py-1 rounded bg-green-500/10">{t("higherWin")}</span>
              <span className="text-red-400 px-2 py-1 rounded bg-red-500/10">{t("lowerLoss")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Controls - Responsive */}
      <Card className="game-card card-hover">
        <CardContent className="space-y-4 sm:space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Bet Amount */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base text-white font-medium">{t("betAmount")}</label>
              <Input
                type="number"
                min="1"
                max="1000"
                value={gameData.bet}
                onChange={(e) =>
                  setGameData({
                    ...gameData,
                    bet: parseInt(e.target.value) || 1,
                  })
                }
                className="bg-white/10 border-white/20 text-white text-center text-lg sm:text-xl font-bold h-12 sm:h-14"
                disabled={isPlaying}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                {[25, 50, 100, 250].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setGameData({ ...gameData, bet: amount })}
                    disabled={isPlaying || amount > balance}
                    className={`text-xs sm:text-sm transition-all duration-200 btn-hover ${
                      gameData.bet === amount
                        ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/30"
                        : "border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                    }`}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chosen Number */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base text-white font-medium">{t("guessNumber")}</label>
              <Input
                type="number"
                min="20"
                max="100"
                value={gameData.chosenNumber}
                onChange={(e) =>
                  setGameData({
                    ...gameData,
                    chosenNumber: parseInt(e.target.value) || 20,
                  })
                }
                className="bg-white/10 border-white/20 text-white text-center text-lg sm:text-xl font-bold h-12 sm:h-14"
                disabled={isPlaying}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                {[30, 50, 70, 90].map((number) => (
                  <Button
                    key={number}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGameData({ ...gameData, chosenNumber: number })
                    }
                    disabled={isPlaying}
                    className={`text-xs sm:text-sm transition-all duration-200 btn-hover ${
                      gameData.chosenNumber === number
                        ? "border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/30"
                        : "border-accent/50 text-accent hover:bg-accent/10 hover:border-accent"
                    }`}
                  >
                    {number}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Play Button */}
          <div className="relative group">
            <Button
              onClick={handlePlay}
              isLoading={isPlaying}
              disabled={gameData.bet > balance || isPlaying}
              size="lg"
              className={`w-full text-base sm:text-lg font-bold transition-all duration-500 relative overflow-hidden h-14 sm:h-18 transform ${
                isPlaying
                  ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-pulse cursor-not-allowed scale-95"
                  : gameData.bet > balance
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-400 hover:via-emerald-500 hover:to-teal-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/40 active:scale-95"
              } ${!isPlaying && gameData.bet <= balance ? "group-hover:animate-pulse" : ""}`}
            >
              {/* Background glow effect */}
              {!isPlaying && gameData.bet <= balance && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
              )}
              
              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center">
                {isPlaying ? (
                  <>
                    <div className="relative">
                      <Zap className="h-6 w-6 sm:h-7 sm:w-7 mr-3 animate-spin text-white" />
                      <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-ping" />
                    </div>
                    <span className="animate-pulse font-extrabold tracking-wide">
                      {t("playing")}
                    </span>
                  </>
                ) : gameData.bet > balance ? (
                  <>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 mr-3 rounded-full bg-gray-400 flex items-center justify-center">
                      <span className="text-xs">💰</span>
                    </div>
                    <span className="font-extrabold tracking-wide opacity-70">
                      {t("insufficientBalance")}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <Dice1 className="h-6 w-6 sm:h-7 sm:w-7 mr-3 animate-bounce text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:animate-pulse" />
                    </div>
                    <span className="font-extrabold tracking-wide">
                      🎲 {t("playGame")} - ${gameData.bet}
                    </span>
                  </>
                )}
              </div>
              
              {/* Animated shimmer effect */}
              {!isPlaying && gameData.bet <= balance && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500 ease-out" />
              )}
              
              {/* Pulse ring effect on hover */}
              {!isPlaying && gameData.bet <= balance && (
                <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:animate-ping" />
              )}
            </Button>
            
            {/* Outer glow effect */}
            {!isPlaying && gameData.bet <= balance && (
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 -z-10" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Last Result - Responsive */}
      {lastResult && (
        <Card
          className={`game-card card-hover border-2 animate-scale-in ${
            lastResult.game.result === "EXACT_MATCH"
              ? "border-yellow-500/50 bg-yellow-500/5"
              : lastResult.game.result === "HIGHER"
              ? "border-green-500/50 bg-green-500/5"
              : "border-red-500/50 bg-red-500/5"
          }`}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center space-x-2">
                {getResultIcon(lastResult.game.result)}
                <span className={`text-lg sm:text-xl font-bold ${resultInfo.color}`}>
                  {resultInfo.text}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-muted-foreground">{t("you")}</p>
                  <p className="text-lg sm:text-xl font-bold text-white">
                    {lastResult.game.chosenNumber}
                  </p>
                </div>
                <div className="p-2 sm:p-3 rounded-lg bg-accent/10">
                  <p className="text-xs text-muted-foreground">{t("generated")}</p>
                  <p className="text-lg sm:text-xl font-bold text-accent">
                    {lastResult.game.generatedNumber}
                  </p>
                </div>
                <div className="p-2 sm:p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-muted-foreground">{t("winLoss")}</p>
                  <p
                    className={`text-lg sm:text-xl font-bold ${
                      lastResult.game.balanceChange > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {lastResult.game.balanceChange > 0 ? "+" : ""}$
                    {lastResult.game.balanceChange}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("newBalance")}:{" "}
                  <span className="text-white font-bold text-lg sm:text-xl">
                    ${lastResult.newBalance}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
