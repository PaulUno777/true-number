import { ApiProperty } from '@nestjs/swagger';
import { SoloGameResult } from '@generated/prisma';

export class SoloGameDto {
  @ApiProperty({
    description: 'Game ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Player ID',
    example: '507f1f77bcf86cd799439011',
  })
  userId: string;

  @ApiProperty({
    description: 'Game bet',
    example: 100,
  })
  bet: number;

  @ApiProperty({
    description: 'Number chosen by the player',
    example: 75,
  })
  chosenNumber: number;

  @ApiProperty({
    description: 'Randomly generated number',
    example: 82,
  })
  generatedNumber: number;

  @ApiProperty({
    description: 'Game result',
    enum: SoloGameResult,
    example: SoloGameResult.HIGHER,
  })
  result: SoloGameResult;

  @ApiProperty({
    description: 'Balance change',
    example: 150,
  })
  balanceChange: number;

  @ApiProperty({
    description: 'Applied multiplier',
    example: 1.5,
  })
  multiplier: number;

  @ApiProperty({
    description: 'Game date',
    example: '2024-01-01T12:00:00Z',
  })
  playedAt: Date;
}

export class PlaySoloGameResponseDto {
  @ApiProperty({
    description: 'Details of the game played',
    type: SoloGameDto,
  })
  game: SoloGameDto;

  @ApiProperty({
    description: 'Result message',
    example: 'Congratulations! You won 150 points!',
  })
  message: string;

  @ApiProperty({
    description: 'Player\'s new balance',
    example: 1150,
  })
  newBalance: number;
}

export class GetSoloGameHistoryResponseDto {
  @ApiProperty({
    description: 'Solo games history',
    type: [SoloGameDto],
  })
  games: SoloGameDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: 'object',
    additionalProperties: true,
  })
  meta: any;

  @ApiProperty({
    description: 'Message',
    example: 'Solo game history retrieved',
  })
  message: string;

  @ApiProperty({
    description: 'Player\'s statistics',
    type: 'object',
    properties: {
      totalGames: { type: 'number' },
      totalWon: { type: 'number' },
      totalLost: { type: 'number' },
      winRate: { type: 'number' },
      totalEarnings: { type: 'number' },
    },
  })
  stats: {
    totalGames: number;
    totalWon: number;
    totalLost: number;
    winRate: number;
    totalEarnings: number;
  };
}

export class SoloGameStatsDto {
  @ApiProperty({
    description: 'Total number of solo games played',
    example: 1250,
  })
  totalGames: number;

  @ApiProperty({
    description: 'Number of exact wins (x2)',
    example: 125,
  })
  exactMatches: number;

  @ApiProperty({
    description: 'Number of higher wins (x1.5)',
    example: 312,
  })
  higherWins: number;

  @ApiProperty({
    description: 'Number of losses',
    example: 813,
  })
  losses: number;

  @ApiProperty({
    description: 'Total bet amount',
    example: 125000,
  })
  totalBet: number;

  @ApiProperty({
    description: 'Total winnings distributed',
    example: 62500,
  })
  totalWinnings: number;

  @ApiProperty({
    description: 'Message',
    example: 'Solo game statistics retrieved',
  })
  message: string;
}
