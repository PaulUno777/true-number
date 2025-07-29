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
import { Trophy, Play, Timer } from "lucide-react";
import type { CurrentGameCardProps } from "../types/dashboard.types";
import type { GamePlayer } from "@/types/multiplayer";
import { useGameTimer } from "../hooks/useGameTimer";

const CurrentGameCard: React.FC<CurrentGameCardProps> = ({
  selectedGame,
  user,
  gameTimer,
  blinkingElement,
  onPlayTurn,
  onLeaveGame,
  isLoadingPlayTurn,
  isLoadingLeaveGame,
  t,
}) => {
  const isMyTurn = selectedGame.currentTurnPlayerId === user?.id;

  // Use the frontend timer hook
  const { timeLeft, stopTimerOnPlay } = useGameTimer({
    gameId: selectedGame.id,
    thinkingTime: selectedGame.thinkingTime,
    currentTurnPlayerId: selectedGame.currentTurnPlayerId || null,
    gameStatus: selectedGame.status,
    isMyTurn,
  });

  // Handle play turn with timer stop
  const handlePlayTurn = () => {
    stopTimerOnPlay(); // Stop timer immediately when button is pressed
    onPlayTurn();
  };

  // Use frontend timer if available, fallback to socket timer
  const displayTimer = timeLeft !== null ? timeLeft : gameTimer;

  const renderPlayerCard = (player: GamePlayer) => {
    const isCurrentPlayer = player.id === user?.id;
    const isBlinking = blinkingElement === `player-${player.id}`;
    const isPlayersTurn = selectedGame.currentTurnPlayerId === player.id;

    return (
      <div
        key={player.id}
        id={`player-${player.id}`}
        className={`p-4 rounded-lg transition-all duration-200 ${
          isCurrentPlayer
            ? "bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-2 border-blue-400/50"
            : "glass-effect border border-gray-600/50"
        } ${
          isPlayersTurn && selectedGame.status === "IN_PROGRESS"
            ? "ring-2 ring-green-400 ring-opacity-75 shadow-lg shadow-green-400/25"
            : ""
        } ${
          isBlinking
            ? "animate-pulse border-yellow-400 shadow-lg shadow-yellow-400/50"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <p
                className={`font-medium ${
                  isCurrentPlayer ? "text-blue-200" : "text-white"
                }`}
              >
                {player.username}
                {isCurrentPlayer && (
                  <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded-full text-white">
                    You
                  </span>
                )}
                {isPlayersTurn && selectedGame.status === "IN_PROGRESS" && (
                  <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded-full text-white animate-pulse">
                    Your Turn
                  </span>
                )}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {player.playedAt ? t("hasPlayed") : t("waiting")}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-2xl font-bold ${
                isCurrentPlayer ? "text-blue-200" : "text-white"
              }`}
            >
              {player.generatedNumber || "?"}
            </p>
            {player.isWinner && selectedGame.status === "FINISHED" && (
              <Trophy className="h-5 w-5 text-yellow-500 ml-auto" />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGameStatus = () => {
    if (selectedGame.status === "IN_PROGRESS") {
      return renderInProgressStatus();
    }

    if (selectedGame.status === "WAITING") {
      return renderWaitingStatus();
    }

    if (selectedGame.status === "FINISHED") {
      return renderFinishedStatus();
    }

    return null;
  };

  const renderInProgressStatus = () => {
    const currentPlayer = selectedGame.players.find((p) => p.id === user?.id);
    const hasCurrentPlayerPlayed =
      currentPlayer?.playedAt || currentPlayer?.generatedNumber !== null;
    const isCurrentPlayerTurn = selectedGame.currentTurnPlayerId === user?.id;

    return (
      <div className="text-center space-y-4">
        {!hasCurrentPlayerPlayed && isCurrentPlayerTurn ? (
          <div className="space-y-2">
            <Button
              onClick={handlePlayTurn}
              isLoading={isLoadingPlayTurn}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse"
              aria-label={t("playTurn")}
              aria-describedby="play-turn-description"
              disabled={isLoadingPlayTurn}
            >
              <Play className="h-6 w-6 mr-2" />
              {isLoadingPlayTurn ? t("playing") : t("playTurn")}
            </Button>
            <p
              id="play-turn-description"
              className="text-sm text-yellow-400 animate-pulse"
            >
              🎯 {t("yourTurn")} - Click to generate your number!
            </p>
          </div>
        ) : (
          <div className="text-center space-y-2">
            {!isCurrentPlayerTurn && !hasCurrentPlayerPlayed && (
              <p className="text-sm text-blue-400">
                🎮{" "}
                {t("waitingForMove", {
                  defaultValue: "Wait for your opponent's move",
                })}
              </p>
            )}
          </div>
        )}
        <Button
          onClick={() => {
            const penaltyAmount = Math.floor(selectedGame.bet * 0.1);
            const confirmMessage = t("leaveConfirmation", {
              penalty: penaltyAmount,
            });
            if (window.confirm(confirmMessage)) {
              onLeaveGame();
            }
          }}
          isLoading={isLoadingLeaveGame}
          variant="outline"
          size="sm"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          aria-label={t("leave")}
          disabled={isLoadingLeaveGame}
        >
          {isLoadingLeaveGame
            ? t("leaving", { defaultValue: "Leaving..." })
            : t("leave")}
        </Button>
      </div>
    );
  };

  const renderWaitingStatus = () => (
    <div className="text-center space-y-4">
      <Button
        onClick={onLeaveGame}
        isLoading={isLoadingLeaveGame}
        variant="outline"
        size="sm"
        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        aria-label={t("leave")}
      >
        {t("leave")}
      </Button>
    </div>
  );

  const renderFinishedStatus = () => {
    const currentPlayer = selectedGame.players.find((p) => p.id === user?.id);
    const isWinner = currentPlayer?.isWinner;
    const winner = selectedGame.players.find((p) => p.isWinner);

    if (!currentPlayer) {
      return (
        <div className="text-center p-4 rounded-lg bg-gray-500/20 border border-gray-500/50">
          <p className="text-gray-300 font-medium">
            {t("gameFinished", { defaultValue: "Game has finished" })}
          </p>
        </div>
      );
    }

    return (
      <div
        className={`text-center p-4 rounded-lg ${
          isWinner
            ? "bg-green-500/20 border border-green-500/50"
            : "bg-red-500/20 border border-red-500/50"
        }`}
        role="status"
        aria-label={isWinner ? t("gameWon") : t("gameLost")}
      >
        <p
          className={`font-bold ${
            isWinner ? "text-green-300" : "text-red-300"
          }`}
        >
          {isWinner
            ? t("congratulations", {
                defaultValue: "Congratulations! You won the game!",
              })
            : t("betterLuck", {
                defaultValue: `${winner?.username} won this time. Better luck next time!`,
                winnerName: winner?.username || "Unknown",
              })}
        </p>
        {isWinner && (
          <p className="text-green-400 text-sm mt-1">
            +{selectedGame.bet}{" "}
            {t("pointsEarned", { defaultValue: "points earned!" })}
          </p>
        )}
        {!isWinner && (
          <p className="text-red-400 text-sm mt-1">
            -{selectedGame.bet}{" "}
            {t("pointsLost", { defaultValue: "points lost" })}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card
      id="current-game"
      className={`game-card border-accent ${
        blinkingElement === "current-game"
          ? "animate-pulse border-yellow-400"
          : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center justify-between">
          <span>{t("currentGame")}</span>
          {displayTimer !== null &&
            selectedGame.status === "IN_PROGRESS" &&
            isMyTurn && (
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg border-2 ${
                  displayTimer <= 10
                    ? "text-red-400 border-red-400 bg-red-400/10 animate-pulse"
                    : displayTimer <= 30
                    ? "text-yellow-400 border-yellow-400 bg-yellow-400/10"
                    : "text-accent border-accent bg-accent/10"
                }`}
              >
                <Timer className="h-5 w-5" />
                <span id="game-timer" className="font-mono text-xl font-bold">
                  {Math.max(0, displayTimer)}s
                </span>
              </div>
            )}
        </CardTitle>
        <CardDescription>
          {t("bet")}: ${selectedGame.bet} • {t("createdBy")}{" "}
          {selectedGame.creatorUsername}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedGame.players.map(renderPlayerCard)}
          {selectedGame.status === "WAITING" &&
            selectedGame.players.length === 1 && (
              <div className="p-4 rounded-lg border-2 border-dashed border-gray-600/50 bg-gray-800/30 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-4xl">👥</div>
                  <p className="text-sm text-muted-foreground">
                    {t("waitingForSecondPlayer")}
                  </p>
                </div>
              </div>
            )}
        </div>
        {renderGameStatus()}
      </CardContent>
    </Card>
  );
};

export default React.memo(CurrentGameCard);
