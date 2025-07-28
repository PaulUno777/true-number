import { MultiplayerGame } from "./multiplayer";

// Game event constants matching backend
export const GAME_EVENTS = {
  // Game Lifecycle
  GAME_CREATED: 'game:created',
  GAME_JOINED: 'game:joined', 
  GAME_STARTED: 'game:started',
  GAME_FINISHED: 'game:finished',
  GAME_CANCELLED: 'game:cancelled',

  // Player Actions
  TURN_PLAYED: 'player:turn-played',
  PLAYER_JOINED_ROOM: 'player:joined-room',
  PLAYER_LEFT_ROOM: 'player:left-room',
  PLAYER_LEFT_GAME: 'player:left-game',

  // Timer Events
  TIMER_UPDATE: 'timer:update',
  TIMER_ENDED: 'timer:ended',
  TIMEOUT_FORFEIT: 'timer:timeout-forfeit',

  // System Events
  GAME_STATE: 'system:game-state',
  WAITING_GAMES: 'system:waiting-games',
  ERROR: 'system:error',
} as const;

// Event payload types matching backend structure
export interface GameLifecycleEvents {
  GameCreated: {
    game: MultiplayerGame;
    timestamp: Date;
  };

  GameJoined: {
    gameId: string;
    game: MultiplayerGame;
    joinedPlayerId: string;
    joinedPlayerUsername: string;
    timestamp: Date;
  };

  GameStarted: {
    gameId: string;
    game: MultiplayerGame;
    message: string;
    timestamp: Date;
  };

  GameFinished: {
    gameId: string;
    game: MultiplayerGame;
    winnerId: string;
    winnerUsername?: string;
    isWinner?: boolean;
    message?: string;
    timestamp: Date;
  };

  GameCancelled: {
    gameId: string;
    game: MultiplayerGame;
    reason: string;
    timestamp: Date;
  };
}

export interface PlayerActionEvents {
  TurnPlayed: {
    gameId: string;
    game: MultiplayerGame;
    playerId: string;
    playerUsername: string;
    generatedNumber: number;
    timestamp: Date;
  };

  PlayerJoinedRoom: {
    gameId: string;
    userId: string;
    username: string;
    game: MultiplayerGame;
    timestamp: Date;
  };

  PlayerLeftRoom: {
    gameId: string;
    userId: string;
    username: string;
    game: MultiplayerGame;
    timestamp: Date;
  };

  PlayerLeftGame: {
    gameId: string;
    game: MultiplayerGame;
    message: string;
    timestamp: Date;
  };
}

export interface TimerEvents {
  TimerUpdate: {
    gameId: string;
    remainingTime: number;
    timestamp: Date;
  };

  TimerEnded: {
    gameId: string;
    message: string;
    timestamp: Date;
  };

  TimeoutForfeit: {
    gameId: string;
    timeoutUserId: string;
    winnerId: string;
    game: MultiplayerGame;
    message: string;
    timestamp: Date;
  };
}

export interface SystemEvents {
  GameState: {
    game: MultiplayerGame;
    timestamp: Date;
  };

  WaitingGames: {
    games: MultiplayerGame[];
    message: string;
    timestamp: Date;
  };

  Error: {
    message: string;
    code?: string;
    timestamp: Date;
  };
}