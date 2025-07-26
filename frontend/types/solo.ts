// Solo Game Types matching backend DTOs

export interface PlaySoloGameDto {
  bet: number;
  chosenNumber: number;
}

export enum SoloGameResult {
  EXACT_MATCH = 'EXACT_MATCH',
  HIGHER = 'HIGHER',
  LOWER = 'LOWER'
}

export interface SoloGameDto {
  id: string;
  userId: string;
  bet: number;
  chosenNumber: number;
  generatedNumber: number;
  result: SoloGameResult;
  balanceChange: number;
  multiplier: number;
  playedAt: Date;
}

export interface PlaySoloGameResponseDto {
  game: SoloGameDto;
  message: string;
  newBalance: number;
}

export interface GetSoloGameHistoryResponseDto {
  games: SoloGameDto[];
  meta: any;
  message: string;
  stats: {
    totalGames: number;
    totalWon: number;
    totalLost: number;
    winRate: number;
    totalEarnings: number;
  };
}

export interface SoloGameStatsDto {
  totalGames: number;
  exactMatches: number;
  higherWins: number;
  losses: number;
  totalBet: number;
  totalWinnings: number;
  message: string;
}