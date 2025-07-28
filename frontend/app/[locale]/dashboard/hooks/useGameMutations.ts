import { useMutation, useQueryClient } from "@tanstack/react-query";
import { multiplayerService } from "@/services/multiplayer";
import { useGameErrorHandler } from "./useGameErrorHandler";
import { UseSocketReturn } from "@/hooks/useSocket";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export const useGameMutations = (socket: UseSocketReturn) => {
  const queryClient = useQueryClient();
  const handleError = useGameErrorHandler();
  const t = useTranslations("dashboard");

  const createGameMutation = useMutation({
    mutationFn: multiplayerService.createGame,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
      // Join the socket room for the created game
      if (data.game?.id) {
        socket.joinGame(data.game.id);
      }
    },
    onError: (error) => handleError(error, "createError"),
  });

  const joinGameMutation = useMutation({
    mutationFn: (gameId: string) => multiplayerService.joinGame(gameId),
    onSuccess: (data) => {
      toast.success(data.message);
      // Join the socket room for the joined game
      if (data.game?.id) {
        socket.joinGame(data.game.id);
      }
    },
    onError: (error) => handleError(error, "joinError"),
  });

  const playTurnMutation = useMutation({
    mutationFn: (gameId: string) => multiplayerService.playTurn(gameId),
    retry: (failureCount, error) => {
      // Retry up to 3 times for network errors
      if (failureCount < 3 && (error?.message?.includes('network') || error?.message?.includes('timeout'))) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: (data) => {
      toast.success(t("playedNumber", { number: data.generatedNumber }));
      // Ensure socket is connected after successful play
      if (!socket.isConnected) {
        console.warn("Socket disconnected after play, attempting reconnection...");
      }
    },
    onError: (error) => {
      console.error("Play turn error:", error);
      handleError(error, "playError");
    },
  });

  const joinLastGameMutation = useMutation({
    mutationFn: multiplayerService.getLastCreatedGame,
    onSuccess: (data) => {
      if (data?.game) {
        // Join the socket room for the found game
        socket.joinGame(data.game.id);
        
        if (data.game.status === "WAITING") {
          toast.success(t("backToWaiting"));
        } else if (data.game.status === "IN_PROGRESS") {
          toast.success(t("reconnectSuccess"));
        }
      } else {
        toast.error(t("noRecentGame"));
      }
    },
    onError: (error) => handleError(error, "searchError"),
  });

  const reconnectActiveGameMutation = useMutation({
    mutationFn: multiplayerService.getActiveGame,
    onSuccess: (data) => {
      if (data?.game) {
        // Join the socket room for the active game
        socket.joinGame(data.game.id);
        toast.success(t("reconnectSuccess"));
      } else {
        toast.error(t("noActiveGame"));
      }
    },
    onError: (error) => handleError(error, "reconnectError"),
  });

  const leaveGameMutation = useMutation({
    mutationFn: (gameId: string) => multiplayerService.leaveGame(gameId),
    onSuccess: (data) => {
      toast.success(data.message);
      // Leave the socket room when leaving the game
      if (data.game?.id) {
        socket.leaveGame(data.game.id);
      }
    },
    onError: (error) => handleError(error, "leaveError"),
  });

  return {
    createGameMutation,
    joinGameMutation,
    playTurnMutation,
    joinLastGameMutation,
    reconnectActiveGameMutation,
    leaveGameMutation,
  };
};