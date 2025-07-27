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

      // Show confetti for wins
      if (data.game.result === "EXACT_MATCH" || data.game.result === "HIGHER") {
        setShowConfetti(true);
        toast.success(data.message, {
          duration: 5000,
          style: {
            background: "linear-gradient(45deg, #10b981, #059669)",
            color: "white",
          },
        });
      } else {
        toast.error(data.message, {
          style: {
            background: "linear-gradient(45deg, #ef4444, #dc2626)",
            color: "white",
          },
        });
      }

      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["soloHistory"] });
      onGameComplete?.();
    },
    onError: (error: unknown) => {
      setIsPlaying(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("failedToPlay"));
      }
    },
  });

  const handlePlay = () => {
    if (gameData.bet > balance) {
      toast.error(t("insufficientBalance"));
      return;
    }

    if (gameData.chosenNumber < 20 || gameData.chosenNumber > 100) {
      toast.error(t("invalidNumber"));
      return;
    }

    if (gameData.bet < 1 || gameData.bet > 1000) {
      toast.error(t("invalidBet"));
      return;
    }

    setIsPlaying(true);
    setLastResult(null);
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

          {/* Play Button - Responsive Animated */}
          <Button
            onClick={handlePlay}
            isLoading={isPlaying}
            disabled={gameData.bet > balance || isPlaying}
            size="lg"
            className={`w-full text-base sm:text-lg font-bold transition-all duration-300 relative overflow-hidden h-12 sm:h-16 ${
              isPlaying
                ? "bg-gradient-to-r from-orange-500 to-red-500 animate-pulse cursor-not-allowed"
                : "btn-play shadow-green-500/30 hover:shadow-green-500/50"
            }`}
          >
            <div className="relative z-10 flex items-center justify-center">
              {isPlaying ? (
                <>
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 animate-spin" />
                  <span className="animate-pulse">{t("playing")}</span>
                </>
              ) : (
                <>
                  <Dice1 className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 animate-bounce" />
                  <span>{t("playGame")} - ${gameData.bet}</span>
                </>
              )}
            </div>
            {!isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
          </Button>
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
