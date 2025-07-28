import { MultiplayerGameDto } from '../dto/multiplayer-output.dto';

// Base event interface
export interface BaseGameEvent {
  timestamp: Date;
  gameId?: string;
}

// Game Lifecycle Events - for managing game state
export namespace GameLifecycleEvents {
  export interface GameCreated extends BaseGameEvent {
    game: MultiplayerGameDto;
  }

  export interface GameJoined extends BaseGameEvent {
    gameId: string;
    game: MultiplayerGameDto;
    joinedPlayerId: string;
    joinedPlayerUsername: string;
  }

  export interface GameStarted extends BaseGameEvent {
    gameId: string;
    game: MultiplayerGameDto;
    message: string;
  }

  export interface GameFinished extends BaseGameEvent {
    gameId: string;
    game: MultiplayerGameDto;
    winnerId: string;
    winnerUsername?: string;
    isWinner?: boolean;
    message?: string;
  }

  export interface GameCancelled extends BaseGameEvent {
    gameId: string;
    game: MultiplayerGameDto;
    reason: string;
  }
}

// Player Action Events - for player-specific actions
export namespace PlayerActionEvents {
  export interface TurnPlayed extends BaseGameEvent {
    gameId: string;
    game: MultiplayerGameDto;
    playerId: string;
    playerUsername: string;
    generatedNumber: number;
  }

  export interface PlayerJoinedRoom extends BaseGameEvent {
    gameId: string;
    userId: string;
    username: string;
    game: MultiplayerGameDto;
  }

  export interface PlayerLeftRoom extends BaseGameEvent {
    gameId: string;
    userId: string;
    username: string;
    game: MultiplayerGameDto;
  }

  export interface PlayerLeftGame extends BaseGameEvent {
    gameId: string;
    game: MultiplayerGameDto;
    message: string;
  }
}

// Timer Events - for timing-related notifications
export namespace TimerEvents {
  export interface TimerUpdate extends BaseGameEvent {
    gameId: string;
    remainingTime: number;
  }

  export interface TimerEnded extends BaseGameEvent {
    gameId: string;
    message: string;
  }

  export interface TimeoutForfeit extends BaseGameEvent {
    gameId: string;
    timeoutUserId: string;
    winnerId: string;
    game: MultiplayerGameDto;
    message: string;
  }
}

// System Events - for system-wide notifications
export namespace SystemEvents {
  export interface GameState extends BaseGameEvent {
    game: MultiplayerGameDto;
  }

  export interface WaitingGames extends BaseGameEvent {
    games: MultiplayerGameDto[];
    message: string;
  }

  export interface Error extends BaseGameEvent {
    message: string;
    code?: string;
  }
}

// Event emitter interface for the gateway
export interface GameEventEmitter {
  // Game Lifecycle Events
  emitGameCreated(event: GameLifecycleEvents.GameCreated): void;
  emitGameJoined(event: GameLifecycleEvents.GameJoined): void;
  emitGameStarted(event: GameLifecycleEvents.GameStarted): void;
  emitGameFinished(event: GameLifecycleEvents.GameFinished): void;
  emitGameCancelled(event: GameLifecycleEvents.GameCancelled): void;

  // Player Action Events
  emitTurnPlayed(event: PlayerActionEvents.TurnPlayed): void;
  emitPlayerJoinedRoom(event: PlayerActionEvents.PlayerJoinedRoom): void;
  emitPlayerLeftRoom(event: PlayerActionEvents.PlayerLeftRoom): void;
  emitPlayerLeftGame(event: PlayerActionEvents.PlayerLeftGame): void;

  // Timer Events
  emitTimerUpdate(event: TimerEvents.TimerUpdate): void;
  emitTimerEnded(event: TimerEvents.TimerEnded): void;
  emitTimeoutForfeit(event: TimerEvents.TimeoutForfeit): void;

  // System Events
  emitGameState(event: SystemEvents.GameState): void;
  emitWaitingGames(event: SystemEvents.WaitingGames): void;
  emitError(event: SystemEvents.Error): void;
}

// Event names constants for type safety
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

export type GameEventName = typeof GAME_EVENTS[keyof typeof GAME_EVENTS];