export interface GamePlayResponse {
  message: string;
  result: 'WON' | 'LOST';
  generatedNumber: number;
  balanceChange: number;
  newBalance: number;
}

export interface GameHistoryItem {
  id: string;
  generatedNumber: number;
  result: 'WON' | 'LOST';
  balanceChange: number;
  newBalance: number;
  playedAt: Date;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface GameHistoryResponse {
  data: GameHistoryItem[];
  meta: {
    page: number;
    size: number;
    totalPages: number;
    totalCount: number;
  };
  message: string;
}

export interface GlobalStats {
  totalUsers: number;
  totalGames: number;
  wonGames: number;
  lostGames: number;
  globalWinRate: number;
  averageBalance: number;
  topPlayers: {
    id: string;
    username: string;
    balance: number;
    gameHistory: number;
  }[];
}