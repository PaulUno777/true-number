import { ApiProperty } from '@nestjs/swagger';
import { GameStatus } from '@generated/prisma';

export class GamePlayerDto {
  @ApiProperty({
    description: 'ID du joueur',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur',
    example: 'player1',
  })
  username: string;

  @ApiProperty({
    description: 'Nombre généré par le joueur',
    example: 75,
    nullable: true,
  })
  generatedNumber?: number;

  @ApiProperty({
    description: 'Date à laquelle le joueur a joué',
    example: '2024-01-01T12:00:00Z',
    nullable: true,
  })
  playedAt?: Date;

  @ApiProperty({
    description: 'Si le joueur est le gagnant',
    example: false,
  })
  isWinner: boolean;

  @ApiProperty({
    description: 'Changement de balance pour ce joueur',
    example: 100,
  })
  balanceChange: number;
}

export class MultiplayerGameDto {
  @ApiProperty({
    description: 'ID de la partie',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Mise de la partie',
    example: 100,
  })
  bet: number;

  @ApiProperty({
    description: 'Temps de réflexion en secondes',
    example: 30,
  })
  thinkingTime: number;

  @ApiProperty({
    description: 'Statut de la partie',
    enum: GameStatus,
    example: GameStatus.WAITING,
  })
  status: GameStatus;

  @ApiProperty({
    description: 'ID du créateur',
    example: '507f1f77bcf86cd799439011',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Nom du créateur',
    example: 'creator_user',
  })
  creatorUsername: string;

  @ApiProperty({
    description: 'ID du gagnant',
    example: '507f1f77bcf86cd799439011',
    nullable: true,
  })
  winnerId?: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-01-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de début',
    example: '2024-01-01T12:00:00Z',
    nullable: true,
  })
  startedAt?: Date;

  @ApiProperty({
    description: 'Date de fin',
    example: '2024-01-01T12:00:00Z',
    nullable: true,
  })
  finishedAt?: Date;

  @ApiProperty({
    description: 'Joueurs de la partie',
    type: [GamePlayerDto],
  })
  players: GamePlayerDto[];
}

export class CreateGameResponseDto {
  @ApiProperty({
    description: 'Partie créée',
    type: MultiplayerGameDto,
  })
  game: MultiplayerGameDto;

  @ApiProperty({
    description: 'Message de succès',
    example: 'Partie créée avec succès',
  })
  message: string;
}

export class GetWaitingGamesResponseDto {
  @ApiProperty({
    description: 'Liste des parties en attente',
    type: [MultiplayerGameDto],
  })
  games: MultiplayerGameDto[];

  @ApiProperty({
    description: 'Message',
    example: 'Parties en attente récupérées',
  })
  message: string;
}

export class JoinGameResponseDto {
  @ApiProperty({
    description: 'Partie rejointe',
    type: MultiplayerGameDto,
  })
  game: MultiplayerGameDto;

  @ApiProperty({
    description: 'Message de succès',
    example: 'Partie rejointe avec succès',
  })
  message: string;
}

export class PlayTurnResponseDto {
  @ApiProperty({
    description: 'Nombre généré',
    example: 75,
  })
  generatedNumber: number;

  @ApiProperty({
    description: 'Partie mise à jour',
    type: MultiplayerGameDto,
  })
  game: MultiplayerGameDto;

  @ApiProperty({
    description: 'Message',
    example: 'Tour joué avec succès',
  })
  message: string;
}

export class GameFinishedResponseDto {
  @ApiProperty({
    description: 'Partie terminée',
    type: MultiplayerGameDto,
  })
  game: MultiplayerGameDto;

  @ApiProperty({
    description: 'ID du gagnant',
    example: '507f1f77bcf86cd799439011',
  })
  winnerId: string;

  @ApiProperty({
    description: 'Nom du gagnant',
    example: 'winner_user',
  })
  winnerUsername: string;

  @ApiProperty({
    description: 'Message du résultat',
    example: 'winner_user gagne la partie et reçoit 100 points !',
  })
  message: string;
}

export class GetUserGamesResponseDto {
  @ApiProperty({
    description: 'Parties de l\'utilisateur',
    type: [MultiplayerGameDto],
  })
  games: MultiplayerGameDto[];

  @ApiProperty({
    description: 'Métadonnées de pagination',
    type: 'object',
    additionalProperties: true,
  })
  meta: any;

  @ApiProperty({
    description: 'Message',
    example: 'Historique des parties récupéré',
  })
  message: string;
}

export class MultiplayerStatsDto {
  @ApiProperty({
    description: 'Nombre total de parties multijoueur',
    example: 150,
  })
  totalGames: number;

  @ApiProperty({
    description: 'Nombre de parties en cours',
    example: 5,
  })
  activeGames: number;

  @ApiProperty({
    description: 'Nombre de parties en attente',
    example: 3,
  })
  waitingGames: number;

  @ApiProperty({
    description: 'Mise moyenne des parties',
    example: 85.5,
  })
  averageBet: number;

  @ApiProperty({
    description: 'Temps de réflexion moyen',
    example: 45.2,
  })
  averageThinkingTime: number;

  @ApiProperty({
    description: 'Top joueurs par victoires',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        wins: { type: 'number' },
        totalGames: { type: 'number' },
        winRate: { type: 'number' },
      },
    },
  })
  topWinners: Array<{
    id: string;
    username: string;
    wins: number;
    totalGames: number;
    winRate: number;
  }>;

  @ApiProperty({
    description: 'Message',
    example: 'Statistiques multijoueur récupérées',
  })
  message: string;
}