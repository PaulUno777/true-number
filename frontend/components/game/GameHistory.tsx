"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, Trophy, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useGameHistory } from "@/hooks/useGameHistory";
import { formatDate } from "@/lib/utils";

export function GameHistory() {
  const t = useTranslations("game");
  const { data: history, isLoading } = useGameHistory();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!history?.data.content?.length) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{t("noGamesYet")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Calendar className="h-6 w-6" />
        {t("playHistory")}
      </h2>

      {history.data.content.map((game: any, index: number) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold w-12 text-center">
                    {game.generatedNumber}
                  </div>

                  <div>
                    <Badge
                      variant={
                        game.result === "WON" ? "success" : "destructive"
                      }
                      className="mb-1"
                    >
                      {game.result === "WON" ? (
                        <Trophy className="h-3 w-3 mr-1" />
                      ) : (
                        <Target className="h-3 w-3 mr-1" />
                      )}
                      {t(game.result.toLowerCase())}
                    </Badge>

                    <div className="text-sm text-muted-foreground">
                      {formatDate(game.playedAt)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
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
                  <div className="text-sm text-muted-foreground">
                    {t("points")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
