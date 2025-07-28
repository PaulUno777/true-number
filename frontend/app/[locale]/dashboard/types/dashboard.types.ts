// Re-export common types for convenience
import type { 
  MultiplayerGame, 
  CreateGameDto, 
  WSGameFinished, 
  WSGameStarted, 
  WSTurnPlayed, 
  WSPlayerJoined 
} from "@/types/multiplayer";
import type { UseSocketReturn } from "@/hooks/useSocket";

export type {
  MultiplayerGame,
  CreateGameDto,
  WSGameFinished,
  WSGameStarted,
  WSTurnPlayed,
  WSPlayerJoined
};

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface TranslationFunction {
  (key: string, params?: Record<string, unknown>): string;
}

export interface GameState {
  gameMode: 'solo' | 'multiplayer';
  showCreateForm: boolean;
  selectedGame: MultiplayerGame | null;
  showConfetti: boolean;
  gameTimer: number | null;
  showRechargeModal: boolean;
  blinkingElement: string | null;
  createGameData: CreateGameDto;
}

export type GameAction =
  | { type: 'SET_GAME_MODE'; payload: 'solo' | 'multiplayer' }
  | { type: 'TOGGLE_CREATE_FORM' }
  | { type: 'SET_CREATE_FORM'; payload: boolean }
  | { type: 'SET_SELECTED_GAME'; payload: MultiplayerGame | null }
  | { type: 'SET_CONFETTI'; payload: boolean }
  | { type: 'SET_GAME_TIMER'; payload: number | null }
  | { type: 'TOGGLE_RECHARGE_MODAL' }
  | { type: 'SET_RECHARGE_MODAL'; payload: boolean }
  | { type: 'SET_BLINKING_ELEMENT'; payload: string | null }
  | { type: 'UPDATE_CREATE_GAME_DATA'; payload: Partial<CreateGameDto> }
  | { type: 'RESET_CREATE_GAME_DATA' };

export interface GameActions {
  handleCreateGame: () => void;
  handleJoinGame: (game: MultiplayerGame) => void;
  handlePlayTurn: () => void;
  handleLeaveGame: () => void;
  handleJoinLastGame: () => void;
  handleReconnectActiveGame: () => void;
}

export interface CurrentGameCardProps {
  selectedGame: MultiplayerGame;
  user: User | null;
  gameTimer: number | null;
  blinkingElement: string | null;
  onPlayTurn: () => void;
  onLeaveGame: () => void;
  isLoadingPlayTurn: boolean;
  isLoadingLeaveGame: boolean;
  t: TranslationFunction;
}

export interface CreateGameFormProps {
  showCreateForm: boolean;
  createGameData: CreateGameDto;
  balance: number;
  onCreateGame: () => void;
  onToggleForm: () => void;
  onUpdateData: (data: Partial<CreateGameDto>) => void;
  isLoading: boolean;
  t: TranslationFunction;
  socket: UseSocketReturn;
}

export interface WaitingGamesListProps {
  waitingGames?: { games: MultiplayerGame[] };
  user: User | null;
  balance: number;
  onJoinGame: (game: MultiplayerGame) => void;
  isLoadingJoin: boolean;
  isLoadingBalance: boolean;
  t: TranslationFunction;
}

export interface QuickActionsProps {
  onJoinLastGame: () => void;
  onReconnectActiveGame: () => void;
  isLoadingJoinLast: boolean;
  isLoadingReconnect: boolean;
  t: TranslationFunction;
}

export interface PenaltyWarningProps {
  t: TranslationFunction;
}