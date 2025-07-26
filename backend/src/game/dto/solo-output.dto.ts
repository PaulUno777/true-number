import { ApiProperty } from '@nestjs/swagger';
import { SoloGameResult } from '@generated/prisma';

export class SoloGameDto {
  @ApiProperty({
    description: 'ID de la partie',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'ID du joueur',
    example: '507f1f77bcf86cd799439011',
  })
  userId: string;

  @ApiProperty({
    description: 'Mise de la partie',
    example: 100,
  })
  bet: number;

  @ApiProperty({
    description: 'Nombre choisi par le joueur',
    example: 75,
  })
  chosenNumber: number;

  @ApiProperty({
    description: 'Nombre généré aléatoirement',
    example: 82,
  })
  generatedNumber: number;

  @ApiProperty({
    description: 'Résultat de la partie',
    enum: SoloGameResult,
    example: SoloGameResult.HIGHER,
  })
  result: SoloGameResult;

  @ApiProperty({
    description: 'Changement de balance',
    example: 150,
  })
  balanceChange: number;

  @ApiProperty({
    description: 'Multiplicateur appliqué',
    example: 1.5,
  })
  multiplier: number;

  @ApiProperty({
    description: 'Date de la partie',
    example: '2024-01-01T12:00:00Z',
  })
  playedAt: Date;
}

export class PlaySoloGameResponseDto {
  @ApiProperty({
    description: 'Détails de la partie jouée',
    type: SoloGameDto,
  })
  game: SoloGameDto;

  @ApiProperty({
    description: 'Message de résultat',
    example: 'Bravo ! Vous avez gagné 150 points !',
  })
  message: string;

  @ApiProperty({
    description: 'Nouveau solde du joueur',
    example: 1150,
  })
  newBalance: number;
}

export class GetSoloGameHistoryResponseDto {
  @ApiProperty({
    description: 'Historique des parties solo',
    type: [SoloGameDto],
  })
  games: SoloGameDto[];

  @ApiProperty({
    description: 'Métadonnées de pagination',
    type: 'object',
    additionalProperties: true,
  })
  meta: any;

  @ApiProperty({
    description: 'Message',
    example: 'Historique des parties solo récupéré',
  })
  message: string;

  @ApiProperty({
    description: 'Statistiques de l\'utilisateur',
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
    description: 'Nombre total de parties solo jouées',
    example: 1250,
  })
  totalGames: number;

  @ApiProperty({
    description: 'Nombre de victoires exactes (x2)',
    example: 125,
  })
  exactMatches: number;

  @ApiProperty({
    description: 'Nombre de victoires supérieures (x1.5)',
    example: 312,
  })
  higherWins: number;

  @ApiProperty({
    description: 'Nombre de défaites',
    example: 813,
  })
  losses: number;

  @ApiProperty({
    description: 'Mise totale pariée',
    example: 125000,
  })
  totalBet: number;

  @ApiProperty({
    description: 'Gains totaux distribués',
    example: 62500,
  })
  totalWinnings: number;

  @ApiProperty({
    description: 'Message',
    example: 'Statistiques des parties solo récupérées',
  })
  message: string;
}