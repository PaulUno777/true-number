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
      if (data?.message) {
        toast.success(data.message);
      }
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
      // Broadcasting mode: No need to join rooms
      console.log(`📡 Game created: ${data?.game?.id} - using broadcast mode`);
    },
    onError: (error) => {
      console.error("Create game error:", error);
      handleError(error, "createError");
    },
  });

  const joinGameMutation = useMutation({
    mutationFn: (gameId: string) => {
      if (!gameId) {
        throw new Error("Game ID is required");
      }
      return multiplayerService.joinGame(gameId);
    },
    onSuccess: (data) => {
      if (data?.message) {
        toast.success(data.message);
      }
      // Broadcasting mode: No need to join rooms
      console.log(`📡 Game joined: ${data?.game?.id} - using broadcast mode`);
    },
    onError: (error) => {
      console.error("Join game error:", error);
      handleError(error, "joinError");
    },
  });

  const playTurnMutation = useMutation({
    mutationFn: (gameId: string) => {
      if (!gameId) {
        throw new Error("Game ID is required");
      }
      return multiplayerService.playTurn(gameId);
    },
    retry: (failureCount, error: any) => {
      // Retry up to 3 times for network errors but not for game logic errors
      const isNetworkError = error?.message?.includes('network') || 
                            error?.message?.includes('timeout') ||
                            error?.code === 'NETWORK_ERROR';
      const isRetryableStatus = error?.response?.status >= 500; // Server errors
      
      if (failureCount < 3 && (isNetworkError || isRetryableStatus)) {
        console.log(`Retrying play turn (attempt ${failureCount + 1})`);
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: (data) => {
      if (data?.generatedNumber !== undefined) {
        toast.success(t("playedNumber", { 
          number: data.generatedNumber,
          defaultValue: `You played: ${data.generatedNumber}`
        }));
      }
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
        // Broadcasting mode: No need to join rooms
        console.log(`📡 Last game found: ${data.game.id} - using broadcast mode`);
        
        if (data.game.status === "WAITING") {
          toast.success(t("backToWaiting", { 
            defaultValue: "Rejoined your waiting game"
          }));
        } else if (data.game.status === "IN_PROGRESS") {
          toast.success(t("reconnectSuccess", {
            defaultValue: "Reconnected to your active game"
          }));
        }
      } else {
        toast.error(t("noRecentGame", {
          defaultValue: "No recent game found to rejoin"
        }));
      }
    },
    onError: (error) => {
      console.error("Join last game error:", error);
      handleError(error, "searchError");
    },
  });

  const reconnectActiveGameMutation = useMutation({
    mutationFn: multiplayerService.getActiveGame,
    onSuccess: (data) => {
      if (data?.game) {
        // Broadcasting mode: No need to join rooms
        console.log(`📡 Active game found: ${data.game.id} - using broadcast mode`);
        toast.success(t("reconnectSuccess", {
          defaultValue: "Reconnected to your active game"
        }));
      } else {
        toast.error(t("noActiveGame", {
          defaultValue: "No active game found to reconnect to"
        }));
      }
    },
    onError: (error) => {
      console.error("Reconnect active game error:", error);
      handleError(error, "reconnectError");
    },
  });

  const leaveGameMutation = useMutation({
    mutationFn: (gameId: string) => {
      if (!gameId) {
        throw new Error("Game ID is required");
      }
      return multiplayerService.leaveGame(gameId);
    },
    onSuccess: (data) => {
      if (data?.message) {
        toast.success(data.message);
      }
      // Broadcasting mode: No need to leave rooms
      console.log(`📡 Game left: ${data?.game?.id} - using broadcast mode`);
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["waitingGames"] });
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
    onError: (error) => {
      console.error("Leave game error:", error);
      handleError(error, "leaveError");
    },
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