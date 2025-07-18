"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Dice1, Coins, Trophy, Target, Zap, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Confetti } from "@/components/ui/Confetti";
import { useGame } from "@/hooks/useGame";
import { toast } from "react-hot-toast";

interface GameResult {
  result: "WON" | "LOST";
  generatedNumber: number;
  balanceChange: number;
  newBalance: number;
  message: string;
}

export function GameBoard() {
  const t = useTranslations("game");
  const { playGame, isLoading, userBalance } = useGame();
  const [lastResult, setLastResult] = useState<GameResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateNumber, setAnimateNumber] = useState(false);

  const handlePlayGame = async () => {
    try {
      setAnimateNumber(true);
      const result = await playGame();
      setLastResult(result);

      if (result.result === "WON") {
        setShowConfetti(true);
        toast.success(t("congratulations"));
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        toast.error(t("betterLuckNextTime"));
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => setAnimateNumber(false), 1000);
    }
  };

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti />}

      {/* Balance Card */}
      <Card variant="gradient" className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Coins className="h-5 w-5 text-warning" />
            {t("yourBalance")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            key={userBalance?.balance}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-primary"
          >
            {userBalance?.balance || 0} {t("points")}
          </motion.div>
        </CardContent>
      </Card>

      {/* Game Card */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Target className="h-5 w-5 text-info" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{t("subtitle")}</p>

          <Button
            onClick={handlePlayGame}
            isLoading={isLoading}
            size="lg"
            className="gradient-bg w-full"
            icon={<Dice1 className="h-5 w-5" />}
          >
            {isLoading ? t("generating") : t("generateButton")}
          </Button>

          {/* Last Result */}
          <AnimatePresence>
            {lastResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <motion.div
                    className={`text-6xl font-bold ${
                      animateNumber ? "animate-bounce-custom" : ""
                    }`}
                    animate={animateNumber ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {lastResult.generatedNumber}
                  </motion.div>
                </div>

                <div className="flex justify-center">
                  <Badge
                    variant={
                      lastResult.result === "WON" ? "success" : "destructive"
                    }
                    className={`text-lg px-4 py-2 ${
                      lastResult.result === "WON"
                        ? "animate-celebration gradient-bg-success"
                        : "animate-shake gradient-bg-danger"
                    }`}
                  >
                    {lastResult.result === "WON" ? (
                      <Trophy className="h-4 w-4 mr-2" />
                    ) : (
                      <Star className="h-4 w-4 mr-2" />
                    )}
                    {t(lastResult.result.toLowerCase())}
                  </Badge>
                </div>

                <div className="text-center">
                  <span
                    className={`text-lg font-semibold ${
                      lastResult.balanceChange > 0
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {lastResult.balanceChange > 0 ? "+" : ""}
                    {lastResult.balanceChange} {t("points")}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Game Rules */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            {t("gameRules")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• {t("rule1")}</p>
            <p>• {t("rule2")}</p>
            <p>• {t("rule3")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
