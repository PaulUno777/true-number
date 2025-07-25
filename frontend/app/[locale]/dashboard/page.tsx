"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { multiplayerService } from "@/services/multiplayer";
import { transactionService } from "@/services/transaction";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/Card";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/hooks/useSocket";
import toast from "react-hot-toast";
import {
  Plus,
  Users,
  Clock,
  Trophy,
  Play,
  Timer,
  Loader2,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Confetti from "@/components/ui/Confetti";
import { AxiosError } from "axios";
import GameModeSwitch from "@/components/GameModeSwitch";
import SoloGame from "@/components/SoloGame";
import RechargeModal from "@/components/RechargeModal";
import {
  MultiplayerGame,
  CreateGameDto,
  WSGameFinished,
  WSGameStarted,
  WSTurnPlayed,
} from "@/types/multiplayer";

export default function GameDashboard() {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const t = useTranslations("multiplayer");

  const [gameMode, setGameMode] = useState<"solo" | "multiplayer">("solo");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState<MultiplayerGame | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameTimer, setGameTimer] = useState<number | null>(null);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [createGameData, setCreateGameData] = useState<CreateGameDto>({
    bet: 50,
    thinkingTime: 30,
  });

  const socket = useSocket();

  // Queries
  const { data: waitingGames, refetch: refetchWaitingGames } = useQuery({
    queryKey: ["waitingGames"],
    queryFn: multiplayerService.getWaitingGames,
  });

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: transactionService.getBalance,
  });

  // Mutations
  const createGameMutation = useMutation({
    mutationFn: multiplayerService.createGame,
    onSuccess: (data) => {
      toast.success(data.message);
      setShowCreateForm(false);
      setSelectedGame(data.game);
      socket.joinGame(data.game.id);
      refetchWaitingGames();
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("createError"));
      }
    },
  });

  const joinGameMutation = useMutation({
    mutationFn: (gameId: string) => multiplayerService.joinGame(gameId),
    onSuccess: (data) => {
      toast.success(data.message);
      setSelectedGame(data.game);
      socket.joinGame(data.game.id);
      refetchWaitingGames();
      refreshUser();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("joinError"));
      }
    },
  });

  const playTurnMutation = useMutation({
    mutationFn: (gameId: string) => multiplayerService.playTurn(gameId),
    onSuccess: (data) => {
      toast.success(t("playedNumber", { number: data.generatedNumber }));
      setSelectedGame(data.game);
      refreshUser();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("playError"));
      }
    },
  });

  const joinLastGameMutation = useMutation({
    mutationFn: multiplayerService.getLastCreatedGame,
    onSuccess: (data) => {
      if (data?.game) {
        if (data.game.status === "WAITING") {
          toast.success(t("backToWaiting"));
          setSelectedGame(data.game);
          socket.joinGame(data.game.id);
        } else if (data.game.status === "IN_PROGRESS") {
          toast.success(t("reconnectSuccess"));
          setSelectedGame(data.game);
          socket.joinGame(data.game.id);
        }
      } else {
        toast.error(t("noRecentGame"));
      }
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("searchError"));
      }
    },
  });

  const reconnectActiveGameMutation = useMutation({
    mutationFn: multiplayerService.getActiveGame,
    onSuccess: (data) => {
      if (data?.game) {
        toast.success(t("reconnectSuccess"));
        setSelectedGame(data.game);
        socket.joinGame(data.game.id);
      } else {
        toast.error(t("noActiveGame"));
      }
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("reconnectError"));
      }
    },
  });

  const leaveGameMutation = useMutation({
    mutationFn: (gameId: string) => multiplayerService.leaveGame(gameId),
    onSuccess: (data) => {
      toast.success(data.message);
      socket.leaveGame(data.game.id);
      setSelectedGame(null);
      refetchWaitingGames();
      refreshUser();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("leaveError"));
      }
    },
  });

  // Socket event handlers
  useEffect(() => {
    if (!socket.isConnected) return;

    socket.onGameStarted((data: WSGameStarted) => {
      toast.success(data.message);
      setSelectedGame(data.game);
      setGameTimer(data.game.thinkingTime);
    });

    socket.onTurnPlayed((data: WSTurnPlayed) => {
      setSelectedGame(data.game);
      toast.success(
        t("playerPlayed", {
          username: data.username,
          number: data.generatedNumber,
        })
      );
    });

    socket.onGameFinished((data: WSGameFinished) => {
      setSelectedGame(data.game);
      setShowConfetti(true);
      toast.success(data.message, {
        duration: 5000,
        style: {
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          color: "white",
        },
      });
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
    });

    socket.onNewGameCreated(() => {
      refetchWaitingGames();
    });

    socket.onGameState((data) => {
      setSelectedGame(data.game);
      toast.success(t("gameCreatedAndJoined"));
    });

    socket.onPlayerLeft((data) => {
      setSelectedGame(data.game);
      toast.success(t("playerLeft", { username: data.username }));
      if (data.game.status === "CANCELLED") {
        setSelectedGame(null);
        toast.error(t("gameCancelled"));
      }
    });

    socket.onGameLeft((data) => {
      toast.success(data.message);
      setSelectedGame(null);
    });

    socket.onError((data) => {
      toast.error(data.message);
    });

    return () => {
      // Cleanup event listeners
    };
  }, [
    queryClient,
    refetchWaitingGames,
    refreshUser,
    socket,
    socket.isConnected,
    t,
  ]);

  // Timer effect
  useEffect(() => {
    if (gameTimer === null || gameTimer <= 0) return;

    const interval = setInterval(() => {
      setGameTimer((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTimer]);

  const handleCreateGame = () => {
    if (createGameData.bet > (balance?.balance || 0)) {
      toast.error(t("insufficientBalance"));
      return;
    }
    createGameMutation.mutate(createGameData);
  };

  const handleJoinGame = (game: MultiplayerGame) => {
    if (game.bet > (balance?.balance || 0)) {
      toast.error(t("insufficientBalanceJoin"));
      return;
    }
    joinGameMutation.mutate(game.id);
  };

  const handlePlayTurn = () => {
    if (!selectedGame) return;
    socket.playTurn(selectedGame.id);
    playTurnMutation.mutate(selectedGame.id);
  };

  const handleJoinLastGame = () => {
    joinLastGameMutation.mutate();
  };

  const handleReconnectActiveGame = () => {
    reconnectActiveGameMutation.mutate();
  };

  const handleLeaveGame = () => {
    if (!selectedGame) return;
    leaveGameMutation.mutate(selectedGame.id);
  };

  const handleGameComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["balance"] });
  };

  return (
    <div className="space-y-6 relative">
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          True Number Game
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose your mode and start playing!
        </p>
      </div>

      {/* Balance Card */}
      <Card className="game-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <p className="text-3xl font-bold text-green-400">
                  ${balance?.balance || 0}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowRechargeModal(true)}
              className="btn-primary flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <CreditCard className="h-4 w-4" />
              <span>Recharge</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Mode Switch */}
      <GameModeSwitch defaultMode={gameMode} onModeChange={setGameMode} />

      {/* Game Content */}
      {gameMode === "solo" ? (
        <SoloGame
          balance={balance?.balance || 0}
          onGameComplete={handleGameComplete}
        />
      ) : (
        <div className="space-y-6">
          {/* Create Game Section */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center justify-between">
                <span>Multiplayer Game</span>
                <Button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {showCreateForm ? "Cancel" : "Create Game"}
                </Button>
              </CardTitle>
            </CardHeader>
            {showCreateForm && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Bet Points
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      value={createGameData.bet}
                      onChange={(e) =>
                        setCreateGameData({
                          ...createGameData,
                          bet: parseInt(e.target.value),
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Thinking Time (sec)
                    </label>
                    <Input
                      type="number"
                      min="10"
                      max="300"
                      value={createGameData.thinkingTime}
                      onChange={(e) =>
                        setCreateGameData({
                          ...createGameData,
                          thinkingTime: parseInt(e.target.value),
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCreateGame}
                  isLoading={createGameMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Create Game
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Play className="h-5 w-5 text-accent" />
                <span>{t("quickActions")}</span>
              </CardTitle>
              <CardDescription>{t("quickActionsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handleJoinLastGame}
                  isLoading={joinLastGameMutation.isPending}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Loader2 className="h-4 w-4" />
                  <span>{t("joinLastGame")}</span>
                </Button>
                <Button
                  onClick={handleReconnectActiveGame}
                  isLoading={reconnectActiveGameMutation.isPending}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>{t("reconnectActive")}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Game */}
          {selectedGame && (
            <Card className="game-card border-accent">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center justify-between">
                  <span>{t("currentGame")}</span>
                  {gameTimer !== null && gameTimer > 0 && (
                    <div className="flex items-center space-x-2 text-accent">
                      <Timer className="h-5 w-5" />
                      <span>{gameTimer}s</span>
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
                  {selectedGame.players.map((player) => (
                    <div
                      key={player.id}
                      className="p-4 rounded-lg glass-effect"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">
                            {player.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {player.playedAt ? t("hasPlayed") : t("waiting")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            {player.generatedNumber || "?"}
                          </p>
                          {player.isWinner &&
                            selectedGame.status === "FINISHED" && (
                              <Trophy className="h-5 w-5 text-yellow-500 ml-auto" />
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedGame.status === "IN_PROGRESS" && (
                  <div className="text-center space-y-4">
                    {selectedGame.players.find(
                      (p) => p.id === user?.id && !p.playedAt
                    ) ? (
                      <Button
                        onClick={handlePlayTurn}
                        isLoading={playTurnMutation.isPending}
                        size="lg"
                        className="bg-accent hover:bg-accent/90"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        {t("playTurn")}
                      </Button>
                    ) : (
                      <p className="text-muted-foreground">
                        {t("waitingForOpponent")}
                      </p>
                    )}
                    <Button
                      onClick={handleLeaveGame}
                      isLoading={leaveGameMutation.isPending}
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      {t("leave")}
                    </Button>
                  </div>
                )}

                {selectedGame.status === "WAITING" && (
                  <div className="text-center">
                    <Button
                      onClick={handleLeaveGame}
                      isLoading={leaveGameMutation.isPending}
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      {t("leave")}
                    </Button>
                  </div>
                )}

                {selectedGame.status === "FINISHED" && (
                  <div className="text-center p-4 rounded-lg bg-green-500/20 border border-green-500/50">
                    <p className="text-green-300 font-bold">
                      {t("gameFinished", {
                        winner:
                          selectedGame.players.find((p) => p.isWinner)
                            ?.username ?? "",
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Waiting Games */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Users className="h-5 w-5 text-accent" />
                <span>{t("waitingGames")}</span>
              </CardTitle>
              <CardDescription>{t("waitingGamesDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {waitingGames?.games.length ? (
                  waitingGames.games
                    .filter((game) => game.createdBy !== user?.id)
                    .map((game) => (
                      <div
                        key={game.id}
                        className="p-4 rounded-lg glass-effect border border-white/20 hover:border-white/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-bold">
                                ${game.bet}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {game.creatorUsername}
                              </p>
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
                            onClick={() => handleJoinGame(game)}
                            isLoading={joinGameMutation.isPending}
                            disabled={game.bet > (balance?.balance || 0)}
                            className="bg-accent hover:bg-accent/90"
                          >
                            {t("join")}
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p>{t("noWaitingGames")}</p>
                    <p className="text-sm">{t("createFirstGame")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        currentBalance={balance?.balance || 0}
      />
    </div>
  );
}
