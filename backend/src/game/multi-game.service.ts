import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CreateGameDto } from './dto/multiplayer-input.dto';
import {
  CreateGameResponseDto,
  GetWaitingGamesResponseDto,
  JoinGameResponseDto,
  PlayTurnResponseDto,
  GetUserGamesResponseDto,
  MultiplayerStatsDto,
  MultiplayerGameDto,
  GamePlayerDto,
} from './dto/multiplayer-output.dto';
import { GameStatus } from '@generated/prisma';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
import { PaginationDto } from '@shared/dtos';
import { PageOption, PrismaParams } from 'prisma-paginator';
import { GameGateway } from './game.gateway';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class MultiGameService {
  private gameGateway: GameGateway;
  
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService<I18nTranslations>,
    private transactionService: TransactionService,
  ) {}

  public setGameGateway(gameGateway: GameGateway) {
    this.gameGateway = gameGateway;
  }

  async createGame(
    userId: string,
    createGameDto: CreateGameDto,
    lang?: string,
  ): Promise<CreateGameResponseDto> {
    // Check if user already has an active game (waiting or in progress)
    const existingGame = await this.prisma.multiplayerGame.findFirst({
      where: {
        createdBy: userId,
        status: {
          in: [GameStatus.WAITING, GameStatus.IN_PROGRESS],
        },
      },
    });

    if (existingGame) {
      throw new BadRequestException(
        this.i18n.t('game.alreadyHasActiveGame', { lang }),
      );
    }

    // Check user exists and has sufficient balance
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }

    const hasBalance = await this.transactionService.hasUserSufficientBalance(
      userId,
      createGameDto.bet,
    );
    if (!hasBalance) {
      throw new BadRequestException(
        this.i18n.t('game.insufficientBalance', { lang }),
      );
    }

    // Créer la partie
    const game = await this.prisma.multiplayerGame.create({
      data: {
        bet: createGameDto.bet,
        thinkingTime: createGameDto.thinkingTime,
        createdBy: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    // Ajouter le créateur comme premier joueur
    await this.prisma.multiplayerParticipant.create({
      data: {
        gameId: game.id,
        playerId: userId,
      },
    });

    const gameDto = this.mapGameToDto(game);

    // Notify gateway about new game creation
    if (this.gameGateway) {
      this.gameGateway.notifyGameCreated(gameDto);
    }

    return {
      game: gameDto,
      message: this.i18n.t('game.gameCreated', { lang }),
    };
  }

  async getWaitingGames(lang?: string): Promise<GetWaitingGamesResponseDto> {
    const games = await this.prisma.multiplayerGame.findMany({
      where: {
        status: GameStatus.WAITING,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const gamesDto = games.map((game) => this.mapGameToDto(game));

    return {
      games: gamesDto,
      message: this.i18n.t('game.waitingGamesRetrieved', { lang }),
    };
  }

  async joinGame(
    userId: string,
    gameId: string,
    lang?: string,
  ): Promise<JoinGameResponseDto> {
    // Vérifier que la partie existe et est en attente
    const game = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(this.i18n.t('game.gameNotFound', { lang }));
    }

    if (game.status !== GameStatus.WAITING) {
      throw new BadRequestException(
        this.i18n.t('game.gameNotWaiting', { lang }),
      );
    }

    if (game.createdBy === userId) {
      throw new BadRequestException(
        this.i18n.t('game.cannotJoinOwnGame', { lang }),
      );
    }

    if (game.players.length >= 2) {
      throw new BadRequestException(this.i18n.t('game.gameFull', { lang }));
    }

    // Vérifier le solde de l'utilisateur
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }

    const hasBalance = await this.transactionService.hasUserSufficientBalance(
      userId,
      game.bet,
    );
    if (!hasBalance) {
      throw new BadRequestException(
        this.i18n.t('game.insufficientBalance', { lang }),
      );
    }

    // Ajouter le joueur et mettre à jour le statut de la partie
    await this.prisma.$transaction([
      this.prisma.multiplayerParticipant.create({
        data: {
          gameId: game.id,
          playerId: userId,
        },
      }),
      this.prisma.multiplayerGame.update({
        where: { id: gameId },
        data: {
          status: GameStatus.IN_PROGRESS,
          startedAt: new Date(),
        },
      }),
    ]);

    // Récupérer la partie mise à jour
    const updatedGame = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const gameDto = this.mapGameToDto(updatedGame);

    return {
      game: gameDto,
      message: this.i18n.t('game.gameJoined', { lang }),
    };
  }

  async playTurn(
    userId: string,
    gameId: string,
    lang?: string,
  ): Promise<PlayTurnResponseDto> {
    // Vérifier que la partie existe et est en cours
    const game = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(this.i18n.t('game.gameNotFound', { lang }));
    }

    if (game.status !== GameStatus.IN_PROGRESS) {
      throw new BadRequestException(
        this.i18n.t('game.gameNotInProgress', { lang }),
      );
    }

    // Vérifier que l'utilisateur participe à la partie
    const participant = game.players.find((p) => p.playerId === userId);
    if (!participant) {
      throw new ForbiddenException(
        this.i18n.t('game.notParticipant', { lang }),
      );
    }

    // Vérifier que le joueur n'a pas encore joué
    if (participant.generatedNumber !== null) {
      throw new BadRequestException(
        this.i18n.t('game.alreadyPlayed', { lang }),
      );
    }

    // Générer le nombre aléatoire
    const generatedNumber = Math.floor(Math.random() * 101);

    // Mettre à jour le participant
    await this.prisma.multiplayerParticipant.update({
      where: { id: participant.id },
      data: {
        generatedNumber,
        playedAt: new Date(),
      },
    });

    // Vérifier si les deux joueurs ont joué
    const allParticipants = await this.prisma.multiplayerParticipant.findMany({
      where: { gameId },
      include: {
        player: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const allPlayed = allParticipants.every((p) => p.generatedNumber !== null);

    if (allPlayed) {
      // Déterminer le gagnant et mettre à jour les soldes
      await this.finishGame(game.id, allParticipants, game.bet);
    }

    // Récupérer la partie mise à jour
    const updatedGame = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const gameDto = this.mapGameToDto(updatedGame);

    return {
      generatedNumber,
      game: gameDto,
      message: this.i18n.t('game.turnPlayed', { lang }),
    };
  }

  async getGameDetails(
    gameId: string,
    lang?: string,
  ): Promise<CreateGameResponseDto> {
    const game = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(this.i18n.t('game.gameNotFound', { lang }));
    }

    const gameDto = this.mapGameToDto(game);

    return {
      game: gameDto,
      message: this.i18n.t('game.gameDetailsRetrieved', { lang }),
    };
  }

  async getMultiplayerGameHistory(
    userId: string,
    paginationDto: PaginationDto,
    lang?: string,
  ): Promise<GetUserGamesResponseDto> {
    const pageOption: PageOption = {
      page: paginationDto.page || 1,
      size: paginationDto.size || 10,
      sort: paginationDto.sort || ['joinedAt=desc'],
      filter: paginationDto.filter,
    };

    const prismaParams: PrismaParams = {
      where: { playerId: userId },
      include: {
        game: {
          include: {
            creator: {
              select: {
                id: true,
                username: true,
              },
            },
            players: {
              include: {
                player: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = await this.prisma.paginate<any>(
      'multiplayerParticipant',
      pageOption,
      prismaParams,
    );

    const games = result.content.map((p) => this.mapGameToDto(p.game));

    return {
      games,
      meta: result.metaData,
      message: this.i18n.t('game.userGamesRetrieved', { lang }),
    };
  }

  async getMultiplayerStats(lang?: string): Promise<MultiplayerStatsDto> {
    const totalGames = await this.prisma.multiplayerGame.count();
    const activeGames = await this.prisma.multiplayerGame.count({
      where: { status: GameStatus.IN_PROGRESS },
    });
    const waitingGames = await this.prisma.multiplayerGame.count({
      where: { status: GameStatus.WAITING },
    });

    const avgBet = await this.prisma.multiplayerGame.aggregate({
      _avg: { bet: true },
    });

    const avgThinkingTime = await this.prisma.multiplayerGame.aggregate({
      _avg: { thinkingTime: true },
    });

    // Top gagnants
    const participants = await this.prisma.multiplayerParticipant.findMany({
      where: {
        game: { status: GameStatus.FINISHED },
      },
      include: {
        player: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const playerStats = participants.reduce((acc, p) => {
      const playerId = p.playerId;
      if (!acc[playerId]) {
        acc[playerId] = {
          id: p.player.id,
          username: p.player.username,
          wins: 0,
          totalGames: 0,
        };
      }
      acc[playerId].totalGames++;
      if (p.isWinner) {
        acc[playerId].wins++;
      }
      return acc;
    }, {});

    const topWinners = Object.values(playerStats)
      .map((stats: any) => ({
        ...stats,
        winRate: (stats.wins / stats.totalGames) * 100,
      }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 10);

    return {
      totalGames,
      activeGames,
      waitingGames,
      averageBet: avgBet._avg.bet || 0,
      averageThinkingTime: avgThinkingTime._avg.thinkingTime || 0,
      topWinners,
      message: this.i18n.t('game.statsRetrieved', { lang }),
    };
  }

  async getLastCreatedGame(
    userId: string,
    lang?: string,
  ): Promise<CreateGameResponseDto | null> {
    const game = await this.prisma.multiplayerGame.findFirst({
      where: {
        createdBy: userId,
        status: {
          in: [GameStatus.WAITING, GameStatus.IN_PROGRESS],
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!game) {
      return null;
    }

    const gameDto = this.mapGameToDto(game);

    return {
      game: gameDto,
      message: this.i18n.t('game.lastGameRetrieved', { lang }),
    };
  }

  async getActiveGame(
    userId: string,
    lang?: string,
  ): Promise<CreateGameResponseDto | null> {
    const participation = await this.prisma.multiplayerParticipant.findFirst({
      where: {
        playerId: userId,
        game: {
          status: GameStatus.IN_PROGRESS,
        },
      },
      include: {
        game: {
          include: {
            creator: {
              select: {
                id: true,
                username: true,
              },
            },
            players: {
              include: {
                player: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });

    if (!participation) {
      return null;
    }

    const gameDto = this.mapGameToDto(participation.game);

    return {
      game: gameDto,
      message: this.i18n.t('game.activeGameRetrieved', { lang }),
    };
  }

  async leaveGame(
    userId: string,
    gameId: string,
    lang?: string,
  ): Promise<CreateGameResponseDto> {
    const game = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(this.i18n.t('game.gameNotFound', { lang }));
    }

    const participant = game.players.find((p) => p.playerId === userId);
    if (!participant) {
      throw new ForbiddenException(
        this.i18n.t('game.notParticipant', { lang }),
      );
    }

    if (game.status === GameStatus.WAITING && game.createdBy === userId) {
      // If creator leaves a waiting game, cancel it
      await this.prisma.multiplayerGame.update({
        where: { id: gameId },
        data: {
          status: GameStatus.CANCELLED,
          finishedAt: new Date(),
        },
      });
    } else if (game.status === GameStatus.IN_PROGRESS) {
      // If player leaves during game, forfeit and award win to opponent
      const opponent = game.players.find((p) => p.playerId !== userId);
      if (opponent) {
        await this.forfeitGame(gameId, userId, opponent.playerId, game.bet);
      }
    } else if (game.status === GameStatus.WAITING) {
      // If non-creator leaves waiting game, just remove them
      await this.prisma.multiplayerParticipant.delete({
        where: { id: participant.id },
      });
    }

    // Get updated game
    const updatedGame = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
        players: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const gameDto = this.mapGameToDto(updatedGame);

    return {
      game: gameDto,
      message: this.i18n.t('game.gameLeft', { lang }),
    };
  }

  private async forfeitGame(
    gameId: string,
    forfeitUserId: string,
    winnerId: string,
    bet: number,
  ): Promise<void> {
    // Create debit transaction for forfeiting player
    const forfeitDebitTransaction =
      await this.transactionService.createGameDebitTransaction(
        forfeitUserId,
        bet,
        'multiplayer',
        gameId,
      );

    // Create credit transaction for winning player
    const winnerCreditTransaction =
      await this.transactionService.createGameCreditTransaction(
        winnerId,
        bet,
        'multiplayer',
        gameId,
      );

    await this.prisma.$transaction([
      // Update the forfeiting player
      this.prisma.multiplayerParticipant.updateMany({
        where: {
          gameId,
          playerId: forfeitUserId,
        },
        data: {
          isWinner: false,
          balanceChange: -bet,
          transactionId: forfeitDebitTransaction.id,
        },
      }),
      // Update the winning player
      this.prisma.multiplayerParticipant.updateMany({
        where: {
          gameId,
          playerId: winnerId,
        },
        data: {
          isWinner: true,
          balanceChange: bet,
          transactionId: winnerCreditTransaction.id,
        },
      }),
      // Finish the game
      this.prisma.multiplayerGame.update({
        where: { id: gameId },
        data: {
          status: GameStatus.FINISHED,
          winnerId: winnerId,
          finishedAt: new Date(),
        },
      }),
    ]);
  }

  private async finishGame(
    gameId: string,
    participants: any[],
    bet: number,
  ): Promise<void> {
    // Déterminer le gagnant
    const [player1, player2] = participants;
    const winner =
      player1.generatedNumber > player2.generatedNumber ? player1 : player2;
    const loser = winner === player1 ? player2 : player1;

    // Create debit transactions for both players (they both placed bets)
    const player1DebitTransaction =
      await this.transactionService.createGameDebitTransaction(
        player1.playerId,
        bet,
        'multiplayer',
        gameId,
      );

    const player2DebitTransaction =
      await this.transactionService.createGameDebitTransaction(
        player2.playerId,
        bet,
        'multiplayer',
        gameId,
      );

    // Create credit transaction for winner (winner gets both bets)
    const winnerCreditTransaction =
      await this.transactionService.createGameCreditTransaction(
        winner.playerId,
        bet * 2, // Winner gets their bet back plus opponent's bet
        'multiplayer',
        gameId,
      );

    // Mettre à jour les soldes et marquer le gagnant
    await this.prisma.$transaction([
      // Mettre à jour le gagnant
      this.prisma.multiplayerParticipant.update({
        where: { id: winner.id },
        data: {
          isWinner: true,
          balanceChange: bet, // Net change is +bet (gets opponent's bet)
          transactionId: winnerCreditTransaction.id,
        },
      }),
      // Mettre à jour le perdant
      this.prisma.multiplayerParticipant.update({
        where: { id: loser.id },
        data: {
          isWinner: false,
          balanceChange: -bet, // Net change is -bet (loses their bet)
          transactionId:
            loser.playerId === player1.playerId
              ? player1DebitTransaction.id
              : player2DebitTransaction.id,
        },
      }),
      // Finaliser la partie
      this.prisma.multiplayerGame.update({
        where: { id: gameId },
        data: {
          status: GameStatus.FINISHED,
          winnerId: winner.playerId,
          finishedAt: new Date(),
        },
      }),
    ]);
  }

  private mapGameToDto(game: any): MultiplayerGameDto {
    const players: GamePlayerDto[] = game.players.map((p) => ({
      id: p.player.id,
      username: p.player.username,
      generatedNumber: p.generatedNumber,
      playedAt: p.playedAt,
      isWinner: p.isWinner,
      balanceChange: p.balanceChange,
    }));

    return {
      id: game.id,
      bet: game.bet,
      thinkingTime: game.thinkingTime,
      status: game.status,
      createdBy: game.createdBy,
      creatorUsername: game.creator.username,
      winnerId: game.winnerId,
      createdAt: game.createdAt,
      startedAt: game.startedAt,
      finishedAt: game.finishedAt,
      players,
    };
  }
}
