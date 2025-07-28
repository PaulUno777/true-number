import { useEffect, useRef } from "react";
import { UseSocketReturn } from "@/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import type { GameAction, User } from "../types/dashboard.types";
import {
  GameLifecycleEvents,
  PlayerActionEvents,
  TimerEvents,
  SystemEvents,
  GAME_EVENTS,
} from "@/types/game-events";

interface UseSocketHandlersProps {
  socket: UseSocketReturn;
  dispatch: React.Dispatch<GameAction>;
  refetchWaitingGames: () => void;
  refreshUser: () => void;
  user: User | null;
  triggerBlink: (elementId: string) => void;
}

export const useSocketHandlers = ({
  socket,
  dispatch,
  refetchWaitingGames,
  refreshUser,
  user,
  triggerBlink,
}: UseSocketHandlersProps) => {
  const queryClient = useQueryClient();
  const t = useTranslations("dashboard");

  // Use refs to store the latest values without causing re-renders
  const latestRefs = useRef({
    dispatch,
    refetchWaitingGames,
    refreshUser,
    user,
    triggerBlink,
    queryClient,
    t,
  });

  // Update refs on every render
  latestRefs.current = {
    dispatch,
    refetchWaitingGames,
    refreshUser,
    user,
    triggerBlink,
    queryClient,
    t,
  };

  useEffect(() => {
    const socketInstance = socket.socket;

    if (!socketInstance || !socket.isConnected) {
      console.log("🔗 Socket not ready, skipping event listener setup");
      return;
    }

    console.log("🔗 Setting up socket event listeners");

    // Create stable handlers that use the latest refs
    const stableHandlers = {
      handlePlayerJoined: (data: GameLifecycleEvents["GameJoined"]) => {
        console.log("🎮 Socket Event: Player Joined", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        if (data.joinedPlayerId !== latestRefs.current.user?.id) {
          latestRefs.current.triggerBlink("current-game");
        }
        latestRefs.current.refetchWaitingGames();
      },

      handleGameStarted: (data: GameLifecycleEvents["GameStarted"]) => {
        console.log("🚀 Socket Event: Game Started", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        latestRefs.current.triggerBlink("current-game");
        toast.success(data.message, { duration: 3000, icon: "🎮" });
      },

      handleTurnPlayed: (data: PlayerActionEvents["TurnPlayed"]) => {
        console.log("🎯 Socket Event: Turn Played", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        latestRefs.current.dispatch({ type: "SET_GAME_TIMER", payload: null });

        if (data.playerId === latestRefs.current.user?.id) {
          // Current player played - no toast needed
        } else {
          latestRefs.current.triggerBlink(`player-${data.playerId}`);
          latestRefs.current.triggerBlink("current-game");
          toast(`${data.playerUsername} played: ${data.generatedNumber}`, {
            duration: 3000,
            icon: "🎯",
          });
        }
      },

      handleGameFinished: (data: GameLifecycleEvents["GameFinished"]) => {
        console.log("🏆 Socket Event: Game Finished", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        latestRefs.current.dispatch({ type: "SET_GAME_TIMER", payload: null });

        const isWinner = data.winnerId === latestRefs.current.user?.id;
        if (isWinner) {
          latestRefs.current.dispatch({ type: "SET_CONFETTI", payload: true });
        }

        latestRefs.current.refreshUser();
        latestRefs.current.queryClient.invalidateQueries({
          queryKey: ["userGames"],
        });
        latestRefs.current.queryClient.invalidateQueries({
          queryKey: ["balance"],
        });
      },

      handleNewGameCreated: (data: GameLifecycleEvents["GameCreated"]) => {
        console.log("🆕 Socket Event: New Game Created", data);
        latestRefs.current.refetchWaitingGames();

        if (data.game.createdBy !== latestRefs.current.user?.id) {
          toast.success(latestRefs.current.t("newGameAvailable"), {
            duration: 3000,
            icon: "🎮",
          });
        }
      },

      handleGameState: (data: SystemEvents["GameState"]) => {
        console.log("📊 Socket Event: Game State", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        
        // This is likely triggered by auto-rejoin after reconnection
        if (data.game && (data.game.status === "WAITING" || data.game.status === "IN_PROGRESS")) {
          console.log("🔄 Game state recovered after reconnection");
          // Optional: Show subtle notification that connection was restored
          // toast.success("Game reconnected", { duration: 2000, icon: "🔄" });
        }
      },

      handlePlayerLeft: (data: PlayerActionEvents["PlayerLeftGame"]) => {
        console.log("🚪 Socket Event: Player Left", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        toast.error(data.message, { duration: 4000, icon: "🚪" });
        latestRefs.current.triggerBlink("current-game");
      },

      handleGameCancelled: (data: GameLifecycleEvents["GameCancelled"]) => {
        console.log("❌ Socket Event: Game Cancelled", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: null,
        });
        toast.error(
          latestRefs.current.t("gameCancelled", { reason: data.reason }),
          {
            duration: 5000,
            icon: "❌",
          }
        );
        latestRefs.current.refetchWaitingGames();
      },

      handleGameLeft: () => {
        console.log("👋 Socket Event: Game Left");
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: null,
        });
      },

      handleError: (data: SystemEvents["Error"]) => {
        console.error("💥 Socket Event: Error", data);
        toast.error(data.message);
      },

      handleGameTimer: (data: TimerEvents["TimerUpdate"]) => {
        console.log("⏰ Socket Event: Timer Update", data);
        latestRefs.current.dispatch({
          type: "SET_GAME_TIMER",
          payload: data.remainingTime,
        });
      },

      handleGameTimerEnded: (data: TimerEvents["TimerEnded"]) => {
        console.log("⏰ Socket Event: Timer Ended", data);
        latestRefs.current.dispatch({ type: "SET_GAME_TIMER", payload: null });
        toast(data.message, { duration: 5000, icon: "⏰" });
      },

      handleGameTimeoutForfeit: (data: TimerEvents["TimeoutForfeit"]) => {
        console.log("⏰ Socket Event: Timeout Forfeit", data);
        latestRefs.current.dispatch({
          type: "SET_SELECTED_GAME",
          payload: data.game,
        });
        latestRefs.current.dispatch({ type: "SET_GAME_TIMER", payload: null });

        const isCurrentUserTimeout =
          data.timeoutUserId === latestRefs.current.user?.id;
        const isCurrentUserWinner =
          data.winnerId === latestRefs.current.user?.id;

        if (isCurrentUserTimeout) {
          toast.error(latestRefs.current.t("timeoutForfeit"), {
            duration: 6000,
            icon: "⏰",
          });
        } else if (isCurrentUserWinner) {
          toast.success(latestRefs.current.t("wonByTimeout"), {
            duration: 5000,
            icon: "🏆",
          });
          latestRefs.current.dispatch({ type: "SET_CONFETTI", payload: true });
        }

        latestRefs.current.refreshUser();
        latestRefs.current.queryClient.invalidateQueries({
          queryKey: ["userGames"],
        });
        latestRefs.current.queryClient.invalidateQueries({
          queryKey: ["balance"],
        });
      },
    };

    // Add listeners directly to socket instance with specific event names
    socketInstance.on(GAME_EVENTS.GAME_JOINED, stableHandlers.handlePlayerJoined);
    socketInstance.on(GAME_EVENTS.GAME_STARTED, stableHandlers.handleGameStarted);
    socketInstance.on(GAME_EVENTS.TURN_PLAYED, stableHandlers.handleTurnPlayed);
    socketInstance.on(GAME_EVENTS.GAME_FINISHED, stableHandlers.handleGameFinished);
    socketInstance.on(GAME_EVENTS.GAME_CREATED, stableHandlers.handleNewGameCreated);
    socketInstance.on(GAME_EVENTS.GAME_STATE, stableHandlers.handleGameState);
    socketInstance.on(GAME_EVENTS.PLAYER_LEFT_GAME, stableHandlers.handlePlayerLeft);
    socketInstance.on(GAME_EVENTS.GAME_CANCELLED, stableHandlers.handleGameCancelled);
    socketInstance.on("game-left", stableHandlers.handleGameLeft);
    socketInstance.on(GAME_EVENTS.ERROR, stableHandlers.handleError);
    socketInstance.on(GAME_EVENTS.TIMER_UPDATE, stableHandlers.handleGameTimer);
    socketInstance.on(GAME_EVENTS.TIMER_ENDED, stableHandlers.handleGameTimerEnded);
    socketInstance.on(GAME_EVENTS.TIMEOUT_FORFEIT, stableHandlers.handleGameTimeoutForfeit);

    console.log("🔗 Socket event listeners attached directly");

    return () => {
      // Remove specific listeners to avoid removing other important listeners
      if (socketInstance) {
        socketInstance.off(GAME_EVENTS.GAME_JOINED, stableHandlers.handlePlayerJoined);
        socketInstance.off(GAME_EVENTS.GAME_STARTED, stableHandlers.handleGameStarted);
        socketInstance.off(GAME_EVENTS.TURN_PLAYED, stableHandlers.handleTurnPlayed);
        socketInstance.off(GAME_EVENTS.GAME_FINISHED, stableHandlers.handleGameFinished);
        socketInstance.off(GAME_EVENTS.GAME_CREATED, stableHandlers.handleNewGameCreated);
        socketInstance.off(GAME_EVENTS.GAME_STATE, stableHandlers.handleGameState);
        socketInstance.off(GAME_EVENTS.PLAYER_LEFT_GAME, stableHandlers.handlePlayerLeft);
        socketInstance.off(GAME_EVENTS.GAME_CANCELLED, stableHandlers.handleGameCancelled);
        socketInstance.off("game-left", stableHandlers.handleGameLeft);
        socketInstance.off(GAME_EVENTS.ERROR, stableHandlers.handleError);
        socketInstance.off(GAME_EVENTS.TIMER_UPDATE, stableHandlers.handleGameTimer);
        socketInstance.off(GAME_EVENTS.TIMER_ENDED, stableHandlers.handleGameTimerEnded);
        socketInstance.off(GAME_EVENTS.TIMEOUT_FORFEIT, stableHandlers.handleGameTimeoutForfeit);
        console.log("🔌 Specific socket event listeners removed");
      }
    };
    // Depend on connection state to setup listeners when connected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.isConnected]);
};
