"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/Card";
import { Users, Clock } from "lucide-react";
import type { WaitingGamesListProps } from "../types/dashboard.types";
import { MultiplayerGame } from "@/types/multiplayer";
import PenaltyWarning from "./PenaltyWarning";

const WaitingGamesList: React.FC<WaitingGamesListProps> = ({
  waitingGames,
  user,
  balance,
  onJoinGame,
  joiningGameId,
  isLoadingBalance,
  t,
}) => {
  // Safely filter games, excluding user's own games
  const filteredGames = React.useMemo(() => {
    if (!waitingGames?.games || !user?.id) return [];
    return waitingGames.games.filter((game) => game.createdBy !== user.id);
  }, [waitingGames?.games, user?.id]);

  const renderGameItem = (game: MultiplayerGame) => {
    const canJoin = !isLoadingBalance && game.bet <= balance;
    const isJoiningThisGame = joiningGameId === game.id;
    const isAnyGameJoining = joiningGameId !== null;
    
    return (
      <div
        key={game.id}
        className="p-4 rounded-lg glass-effect border border-white/20 hover:border-white/30 transition-colors"
        role="listitem"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">${game.bet}</span>
            </div>
            <div>
              <p className="font-medium text-white">{game.creatorUsername}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {game.thinkingTime}s
                </span>
                <span>
                  {game.players.length}/2 {t("players")}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => onJoinGame(game)}
            isLoading={isJoiningThisGame}
            disabled={!canJoin || isAnyGameJoining}
            className="bg-primary hover:bg-primary/90"
            aria-label={t("joinGame", { 
              creator: game.creatorUsername, 
              bet: game.bet 
            })}
            aria-describedby={!canJoin ? `insufficient-balance-error-${game.id}` : undefined}
          >
            {isJoiningThisGame ? t("joining", { defaultValue: "Joining..." }) : t("join")}
          </Button>
        </div>
        {!canJoin && game.bet > balance && (
          <p id={`insufficient-balance-error-${game.id}`} className="text-red-400 text-sm mt-2">
            {t("insufficientBalanceJoin", { 
              defaultValue: "Insufficient balance to join this game",
              required: game.bet,
              current: balance
            })}
          </p>
        )}
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="text-center py-8 text-muted-foreground" role="status">
      <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
      <p>{t("noWaitingGames", { defaultValue: "No games waiting for players" })}</p>
      <p className="text-sm">{t("createFirstGame", { defaultValue: "Create the first game to get started!" })}</p>
    </div>
  );

  return (
    <Card className="game-card card-hover">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center space-x-2">
          <Users className="h-5 w-5 text-accent" />
          <span>{t("waitingGames")}</span>
        </CardTitle>
        <CardDescription>
          {t("waitingGamesDescription", { 
            defaultValue: "Join existing games or create your own" 
          })}
        </CardDescription>
        <PenaltyWarning t={t} />
      </CardHeader>
      <CardContent>
        <div className="space-y-3" role="list" aria-label={t("waitingGames")}>
          {filteredGames.length > 0
            ? filteredGames.map(renderGameItem)
            : renderEmptyState()}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(WaitingGamesList);