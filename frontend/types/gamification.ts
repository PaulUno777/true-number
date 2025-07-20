export interface GameStreak {
  current: number;
  longest: number;
  lastGameResult: "WIN" | "LOSS" | null;
  lastGameDate: Date | null;
}

export interface UserStats {
  totalGames: number;
  wonGames: number;
  lostGames: number;
  winRate: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
}
