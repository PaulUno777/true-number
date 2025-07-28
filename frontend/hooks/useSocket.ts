"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/providers/AuthProvider";
import { WSGameLeft } from "@/types/multiplayer";
import {
  GAME_EVENTS,
  GameLifecycleEvents,
  PlayerActionEvents,
  TimerEvents,
  SystemEvents,
} from "@/types/game-events";
import Cookies from "js-cookie";

export interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  joinGame: (gameId: string) => void;
  leaveGame: (gameId: string) => void;
  // Event listeners
  onPlayerJoined: (
    callback: (data: GameLifecycleEvents["GameJoined"]) => void
  ) => void;
  onPlayerLeft: (
    callback: (data: PlayerActionEvents["PlayerLeftGame"]) => void
  ) => void;
  onTurnPlayed: (
    callback: (data: PlayerActionEvents["TurnPlayed"]) => void
  ) => void;
  onGameFinished: (
    callback: (data: GameLifecycleEvents["GameFinished"]) => void
  ) => void;
  onGameStarted: (
    callback: (data: GameLifecycleEvents["GameStarted"]) => void
  ) => void;
  onGameTimer: (callback: (data: TimerEvents["TimerUpdate"]) => void) => void;
  onNewGameCreated: (
    callback: (data: GameLifecycleEvents["GameCreated"]) => void
  ) => void;
  onWaitingGames: (
    callback: (data: SystemEvents["WaitingGames"]) => void
  ) => void;
  onGameState: (callback: (data: SystemEvents["GameState"]) => void) => void;
  onGameLeft: (callback: (data: WSGameLeft) => void) => void;
  onError: (callback: (data: SystemEvents["Error"]) => void) => void;
  onGameTimerEnded: (
    callback: (data: TimerEvents["TimerEnded"]) => void
  ) => void;
  onGameTimeoutForfeit: (
    callback: (data: TimerEvents["TimeoutForfeit"]) => void
  ) => void;
  onGameCancelled: (
    callback: (data: GameLifecycleEvents["GameCancelled"]) => void
  ) => void;
}

export const useSocket = (): UseSocketReturn => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const currentGameIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      // Clean up socket if user is null
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    // Don't recreate socket if it exists and is connected
    if (socketRef.current && socketRef.current.connected) {
      return;
    }

    // Initialize socket connection
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      timeout: 20000,
      forceNew: false,
      auth: {
        token: Cookies.get("accessToken"),
      },
      query: {
        userId: user.id,
        username: user.username,
      },
    });

    socket.on("connect", () => {
      console.log("🟢 Connected to game server");
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Disconnected from game server:", reason);
      setIsConnected(false);
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log(
        "🔄 Reconnected to game server after",
        attemptNumber,
        "attempts"
      );
      setIsConnected(true);
      
      // Backend will automatically rejoin user to their active game room
      // and send game state - no additional frontend action needed
      console.log("✅ Auto-rejoin handled by backend");
    });

    socket.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [user]);

  const joinGame = (gameId: string) => {
    console.log(`🚀 Joining game room: ${gameId}`);
    socketRef.current?.emit("join-game", { gameId });
  };

  const leaveGame = (gameId: string) => {
    console.log(`👋 Leaving game room: ${gameId}`);
    socketRef.current?.emit("leave-game", { gameId });
  };

  const onPlayerJoined = (
    callback: (data: GameLifecycleEvents["GameJoined"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.GAME_JOINED, callback);
  };

  const onPlayerLeft = (
    callback: (data: PlayerActionEvents["PlayerLeftGame"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.PLAYER_LEFT_GAME, callback);
  };

  const onTurnPlayed = (
    callback: (data: PlayerActionEvents["TurnPlayed"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.TURN_PLAYED, callback);
  };

  const onGameFinished = (
    callback: (data: GameLifecycleEvents["GameFinished"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.GAME_FINISHED, callback);
  };

  const onGameStarted = (
    callback: (data: GameLifecycleEvents["GameStarted"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.GAME_STARTED, callback);
  };

  const onGameTimer = (
    callback: (data: TimerEvents["TimerUpdate"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.TIMER_UPDATE, callback);
  };

  const onNewGameCreated = (
    callback: (data: GameLifecycleEvents["GameCreated"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.GAME_CREATED, callback);
  };

  const onWaitingGames = (
    callback: (data: SystemEvents["WaitingGames"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.WAITING_GAMES, callback);
  };

  const onGameState = (callback: (data: SystemEvents["GameState"]) => void) => {
    socketRef.current?.on(GAME_EVENTS.GAME_STATE, callback);
  };

  const onGameLeft = (callback: (data: WSGameLeft) => void) => {
    // This event is now handled by the REST API response, keeping for backward compatibility
    socketRef.current?.on("game-left", callback);
  };

  const onGameCancelled = (
    callback: (data: GameLifecycleEvents["GameCancelled"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.GAME_CANCELLED, callback);
  };

  const onError = (callback: (data: SystemEvents["Error"]) => void) => {
    socketRef.current?.on(GAME_EVENTS.ERROR, callback);
  };

  const onGameTimerEnded = (
    callback: (data: TimerEvents["TimerEnded"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.TIMER_ENDED, callback);
  };

  const onGameTimeoutForfeit = (
    callback: (data: TimerEvents["TimeoutForfeit"]) => void
  ) => {
    socketRef.current?.on(GAME_EVENTS.TIMEOUT_FORFEIT, callback);
  };

  return {
    socket: socketRef.current,
    isConnected,
    joinGame,
    leaveGame,
    onPlayerJoined,
    onPlayerLeft,
    onTurnPlayed,
    onGameFinished,
    onGameStarted,
    onGameTimer,
    onNewGameCreated,
    onWaitingGames,
    onGameState,
    onGameLeft,
    onError,
    onGameTimerEnded,
    onGameTimeoutForfeit,
    onGameCancelled,
  };
};
