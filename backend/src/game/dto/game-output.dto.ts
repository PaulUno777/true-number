import { SoloGameResult } from '@generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class GamePlayResponseDto {
  @ApiProperty({ description: 'Message' })
  message: string;

  @ApiProperty({ enum: SoloGameResult, description: 'Game result' })
  result: SoloGameResult;

  @ApiProperty({ description: 'Generated number (0-100)' })
  generatedNumber: number;

  @ApiProperty({ description: 'Balance change (+50 for win, -35 for loss)' })
  balanceChange: number;

  @ApiProperty({ description: 'New balance after the game' })
  newBalance: number;
}

export class GetBalanceResponseDto {
  @ApiProperty({ description: 'User balance' })
  balance: number;
}

export class GameHistoryItemDto {
  @ApiProperty({ description: 'Game history ID' })
  id: string;

  @ApiProperty({ description: 'Generated number (0-100)' })
  generatedNumber: number;

  @ApiProperty({ enum: SoloGameResult, description: 'Game result' })
  result: SoloGameResult;

  @ApiProperty({ description: 'Balance change (+50 for win, -35 for loss)' })
  balanceChange: number;

  @ApiProperty({ description: 'New balance after the game' })
  newBalance: number;

  @ApiProperty({ description: 'When the game was played' })
  playedAt: Date;

  @ApiProperty({ description: 'User information', required: false })
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export class GetHistoryResponseDto {
  @ApiProperty({
    type: [GameHistoryItemDto],
    description: 'Game history items',
  })
  data: GameHistoryItemDto[];

  @ApiProperty({ description: 'Pagination meta information' })
  meta: {
    page: number;
    size: number;
    totalPages: number;
    totalCount: number;
  };

  @ApiProperty({ description: 'Response message' })
  message: string;
}

export class TopPlayerDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'User balance' })
  balance: number;

  @ApiProperty({ description: 'Total games played' })
  gameHistory: number;
}

export class GetGlobalStatsResponseDto {
  @ApiProperty({ description: 'Total number of users' })
  totalUsers: number;

  @ApiProperty({ description: 'Total number of games played' })
  totalGames: number;

  @ApiProperty({ description: 'Total won games' })
  wonGames: number;

  @ApiProperty({ description: 'Total lost games' })
  lostGames: number;

  @ApiProperty({ description: 'Global win rate percentage' })
  globalWinRate: number;

  @ApiProperty({ description: 'Average balance across all users' })
  averageBalance: number;

  @ApiProperty({
    type: [TopPlayerDto],
    description: 'Top 10 players by balance',
  })
  topPlayers: TopPlayerDto[];
}
