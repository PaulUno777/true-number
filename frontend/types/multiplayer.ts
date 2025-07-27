export interface GamePlayer {
  id: string;
  username: string;
  generatedNumber?: number;
  playedAt?: string;
  isWinner: boolean;
  balanceChange: number;
}

export interface MultiplayerGame {
  id: string;
  bet: number;
  thinkingTime: number;
  status: 'WAITING' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
  createdBy: string;
  creatorUsername: string;
  winnerId?: string;
  currentTurnPlayerId?: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  players: GamePlayer[];
}

export interface CreateGameDto {
  bet: number;
  thinkingTime: number;
}

export interface CreateGameResponse {
  game: MultiplayerGame;
  message: string;
}

export interface GetWaitingGamesResponse {
  games: MultiplayerGame[];
  message: string;
}

export interface JoinGameResponse {
  game: MultiplayerGame;
  message: string;
}

export interface PlayTurnResponse {
  generatedNumber: number;
  game: MultiplayerGame;
  message: string;
}

export interface GetUserGamesResponse {
  games: MultiplayerGame[];
  message: string;
}

export interface MultiplayerStats {
  totalGames: number;
  activeGames: number;
  waitingGames: number;
  averageBet: number;
  averageThinkingTime: number;
  topWinners: Array<{
    id: string;
    username: string;
    wins: number;
    totalGames: number;
    winRate: number;
  }>;
  message: string;
}

// WebSocket Events
export interface WSPlayerJoined {
  userId: string;
  username: string;
  game: MultiplayerGame;
  timestamp: string;
}

export interface WSPlayerLeft {
  userId: string;
  username: string;
  game: MultiplayerGame;
  timestamp: string;
}

export interface WSGameLeft {
  game: MultiplayerGame;
  message: string;
  timestamp: string;
}

export interface WSTurnPlayed {
  userId: string;
  username: string;
  generatedNumber: number;
  game: MultiplayerGame;
  timestamp: string;
}

export interface WSGameFinished {
  winnerId: string;
  winnerUsername: string;
  game: MultiplayerGame;
  message: string;
  isWinner?: boolean;
  timestamp: string;
}

export interface WSGameStarted {
  game: MultiplayerGame;
  message: string;
  timestamp: string;
}

export interface WSGameTimer {
  remainingTime: number;
  timestamp: string;
}

export interface WSNewGameCreated {
  game: MultiplayerGame;
  timestamp: string;
}