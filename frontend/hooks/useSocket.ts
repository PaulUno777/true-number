"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/providers/AuthProvider";
import {
  WSPlayerJoined,
  WSPlayerLeft,
  WSTurnPlayed,
  WSGameFinished,
  WSGameStarted,
  WSGameTimer,
  WSNewGameCreated,
  WSGameLeft,
  MultiplayerGame,
  GetWaitingGamesResponse,
} from "@/types/multiplayer";
import Cookies from "js-cookie";

export interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  joinGame: (gameId: string) => void;
  leaveGame: (gameId: string) => void;
  playTurn: (gameId: string) => void;
  getWaitingGames: () => void;
  // Event listeners
  onPlayerJoined: (callback: (data: WSPlayerJoined) => void) => void;
  onPlayerLeft: (callback: (data: WSPlayerLeft) => void) => void;
  onTurnPlayed: (callback: (data: WSTurnPlayed) => void) => void;
  onGameFinished: (callback: (data: WSGameFinished) => void) => void;
  onGameStarted: (callback: (data: WSGameStarted) => void) => void;
  onGameTimer: (callback: (data: WSGameTimer) => void) => void;
  onNewGameCreated: (callback: (data: WSNewGameCreated) => void) => void;
  onWaitingGames: (callback: (data: GetWaitingGamesResponse) => void) => void;
  onGameState: (callback: (data: { game: MultiplayerGame }) => void) => void;
  onGameLeft: (callback: (data: WSGameLeft) => void) => void;
  onError: (callback: (data: { message: string }) => void) => void;
}

export const useSocket = (): UseSocketReturn => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) return;

    // Initialize socket connection
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: Cookies.get("accessToken"),
      },
      query: {
        userId: user.id,
        username: user.username,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to game server");
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from game server:", reason);
      setIsConnected(false);
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to game server after", attemptNumber, "attempts");
      setIsConnected(true);
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
    socketRef.current?.emit("join-game", { gameId });
  };

  const leaveGame = (gameId: string) => {
    socketRef.current?.emit("leave-game", { gameId });
  };

  const playTurn = (gameId: string) => {
    socketRef.current?.emit("play-turn", { gameId });
  };

  const getWaitingGames = () => {
    socketRef.current?.emit("get-waiting-games");
  };

  const onPlayerJoined = (callback: (data: WSPlayerJoined) => void) => {
    socketRef.current?.on("player-joined", callback);
  };

  const onPlayerLeft = (callback: (data: WSPlayerLeft) => void) => {
    socketRef.current?.on("player-left", callback);
  };

  const onTurnPlayed = (callback: (data: WSTurnPlayed) => void) => {
    socketRef.current?.on("turn-played", callback);
  };

  const onGameFinished = (callback: (data: WSGameFinished) => void) => {
    socketRef.current?.on("game-finished", callback);
  };

  const onGameStarted = (callback: (data: WSGameStarted) => void) => {
    socketRef.current?.on("game-started", callback);
  };

  const onGameTimer = (callback: (data: WSGameTimer) => void) => {
    socketRef.current?.on("game-timer", callback);
  };

  const onNewGameCreated = (callback: (data: WSNewGameCreated) => void) => {
    socketRef.current?.on("new-game-created", callback);
  };

  const onWaitingGames = (
    callback: (data: GetWaitingGamesResponse) => void
  ) => {
    socketRef.current?.on("waiting-games", callback);
  };

  const onGameState = (callback: (data: { game: MultiplayerGame }) => void) => {
    socketRef.current?.on("game-state", callback);
  };

  const onGameLeft = (callback: (data: WSGameLeft) => void) => {
    socketRef.current?.on("game-left", callback);
  };

  const onError = (callback: (data: { message: string }) => void) => {
    socketRef.current?.on("error", callback);
  };

  return {
    socket: socketRef.current,
    isConnected,
    joinGame,
    leaveGame,
    playTurn,
    getWaitingGames,
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
  };
};
