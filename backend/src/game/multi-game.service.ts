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

const gameIncludeFields = {
  creator: { select: { id: true, username: true } },
  players: {
    include: {
      player: { select: { id: true, username: true } },
    },
  },
};

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
    await this.ensureUserExists(userId, lang);

    await this.ensureSufficientBalance(userId, createGameDto.bet, lang);

    // Create party
    const game = await this.prisma.multiplayerGame.create({
      data: {
        bet: createGameDto.bet,
        thinkingTime: createGameDto.thinkingTime,
        createdBy: userId,
      },
      include: gameIncludeFields,
    });

    // Add le creator as participant
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
      include: gameIncludeFields,
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
    // Check if game exists and In WAITING status
    const game = await this.getGameByIdOrFail(gameId, lang);

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

    // Check user exists and has sufficient balance
    const user = await this.ensureUserExists(userId, lang);

    await this.ensureSufficientBalance(userId, game.bet, lang);

    // Randomly select first player
    const players = [game.createdBy, userId];
    const randomFirstPlayer =
      players[Math.floor(Math.random() * players.length)];

    // Add player and update game status
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
          currentTurnPlayerId: randomFirstPlayer,
        },
      }),
    ]);

    // Get updated party
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
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        return await this.attemptPlayTurn(userId, gameId, lang);
      } catch (error) {
        // Check if it's a write conflict error (P2034)
        if (error.code === 'P2034' && retryCount < maxRetries - 1) {
          retryCount++;
          // Exponential backoff: wait 100ms, 200ms, 400ms
          const delay = 100 * Math.pow(2, retryCount - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
    
    // This should never be reached, but TypeScript requires it
    throw new Error('Maximum retries exceeded');
  }

  private async attemptPlayTurn(
    userId: string,
    gameId: string,
    lang?: string,
  ): Promise<PlayTurnResponseDto> {
    // Use a transaction with isolation to prevent race conditions
    const transactionResult = await this.prisma.$transaction(async (tx) => {
      // Get game with fresh data inside transaction
      const game = await tx.multiplayerGame.findUnique({
        where: { id: gameId },
        include: {
          creator: { select: { id: true, username: true } },
          players: {
            include: {
              player: { select: { id: true, username: true } },
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

      // Check if user is participant
      const participant = game.players.find((p) => p.playerId === userId);
      if (!participant) {
        throw new ForbiddenException(
          this.i18n.t('game.notParticipant', { lang }),
        );
      }

      // Check if it is user turn
      if (game.currentTurnPlayerId !== userId) {
        throw new BadRequestException(
          this.i18n.t('game.notYourTurn', {
            lang,
            args: { defaultMessage: 'It is not your turn to play' },
          }),
        );
      }

      // Check if user has not played yet
      if (participant.generatedNumber !== null) {
        throw new BadRequestException(
          this.i18n.t('game.alreadyPlayed', { lang }),
        );
      }

      // Generate random number
      const generatedNumber = Math.floor(Math.random() * 101);

      // Get the other player to switch turns
      const otherParticipant = game.players.find((p) => p.playerId !== userId);
      const nextTurnPlayerId = otherParticipant
        ? otherParticipant.playerId
        : null;

      // Update participant and game in atomic operations
      await tx.multiplayerParticipant.update({
        where: { id: participant.id },
        data: {
          generatedNumber,
          playedAt: new Date(),
        },
      });

      await tx.multiplayerGame.update({
        where: { id: gameId },
        data: {
          currentTurnPlayerId: nextTurnPlayerId,
        },
      });

      // Check if all players have played
      const allParticipants = await tx.multiplayerParticipant.findMany({
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

      let gameFinished = false;
      if (allPlayed) {
        gameFinished = true;
        await this.finishGameInTransactionOnly(tx, game.id, allParticipants, game.bet);
      }

      // Get updated game within the same transaction
      const updatedGame = await tx.multiplayerGame.findUnique({
        where: { id: gameId },
        include: {
          creator: { select: { id: true, username: true } },
          players: {
            include: {
              player: { select: { id: true, username: true } },
            },
          },
        },
      });

      return {
        updatedGame,
        gameFinished,
        allParticipants,
        generatedNumber,
        participantUsername: participant.player.username,
      };
    }, {
      maxWait: 5000, // Maximum time to wait for a transaction slot
      timeout: 10000, // Maximum time for the transaction to run
    });

    // Handle post-transaction operations
    if (!transactionResult.updatedGame) {
      throw new Error('Transaction failed to return updated game');
    }
    const gameDto = this.mapGameToDto(transactionResult.updatedGame);

    // Handle balance transactions outside of the main transaction if game finished
    if (transactionResult.gameFinished && transactionResult.updatedGame) {
      await this.createGameFinishTransactions(
        gameId, 
        transactionResult.allParticipants, 
        transactionResult.updatedGame.bet
      );
    }

    // Emit socket events for turn played
    if (this.gameGateway) {
      // Notify all players about the turn
      this.gameGateway.server.to(`game:${gameId}`).emit('turn-played', {
        userId: userId,
        username: transactionResult.participantUsername,
        generatedNumber: transactionResult.generatedNumber,
        game: gameDto,
        timestamp: new Date(),
      });

      // If game is finished, send personalized messages to each player
      if (gameDto.status === 'FINISHED') {
        const winner = gameDto.players.find((p) => p.isWinner);
        
        gameDto.players.forEach(player => {
          // Find the socket connection for this player
          const playerSockets = Array.from(this.gameGateway.server.sockets.sockets.values())
            .filter(socket => (socket as any).userId === player.id);
          
          if (playerSockets.length > 0) {
            const isWinner = player.isWinner;
            const message = isWinner 
              ? this.i18n.t('game.multiplayerGameWon', { 
                  lang, 
                  args: { points: gameDto.bet } 
                })
              : this.i18n.t('game.multiplayerGameLost', { 
                  lang, 
                  args: { winner: winner?.username } 
                });
            
            playerSockets.forEach(playerSocket => {
              playerSocket.emit('game-finished', {
                winnerId: gameDto.winnerId,
                winnerUsername: winner?.username,
                game: gameDto,
                message: message,
                isWinner: isWinner,
                timestamp: new Date(),
              });
            });
          }
        });
      }
    }

    return {
      generatedNumber: transactionResult.generatedNumber,
      game: gameDto,
      message: this.i18n.t('game.turnPlayed', { lang }),
    };
  }

  async getGameDetails(
    gameId: string,
    lang?: string,
  ): Promise<CreateGameResponseDto> {
    const game = await this.getGameByIdOrFail(gameId, lang);

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
          include: gameIncludeFields,
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
      include: gameIncludeFields,
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
          include: gameIncludeFields,
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
    const game = await this.getGameByIdOrFail(gameId, lang);

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


  private async finishGameInTransactionOnly(
    tx: any,
    gameId: string,
    participants: any[],
    bet: number,
  ): Promise<void> {
    // Check winner
    const [player1, player2] = participants;
    const winner =
      player1.generatedNumber > player2.generatedNumber ? player1 : player2;
    const loser = winner === player1 ? player2 : player1;

    // Update winner within the transaction (without transaction ID for now)
    await tx.multiplayerParticipant.update({
      where: { id: winner.id },
      data: {
        isWinner: true,
        balanceChange: bet, // Net change is +bet (gets opponent's bet)
      },
    });

    // Update loser within the transaction (without transaction ID for now)
    await tx.multiplayerParticipant.update({
      where: { id: loser.id },
      data: {
        isWinner: false,
        balanceChange: -bet, // Net change is -bet (loses their bet)
      },
    });

    // Finish game within the transaction
    await tx.multiplayerGame.update({
      where: { id: gameId },
      data: {
        status: GameStatus.FINISHED,
        winnerId: winner.playerId,
        finishedAt: new Date(),
      },
    });
  }

  private async createGameFinishTransactions(
    gameId: string,
    participants: any[],
    bet: number,
  ): Promise<void> {
    // Check winner
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

    // Update participants with transaction IDs
    await this.prisma.$transaction([
      this.prisma.multiplayerParticipant.update({
        where: { id: winner.id },
        data: {
          transactionId: winnerCreditTransaction.id,
        },
      }),
      this.prisma.multiplayerParticipant.update({
        where: { id: loser.id },
        data: {
          transactionId:
            loser.playerId === player1.playerId
              ? player1DebitTransaction.id
              : player2DebitTransaction.id,
        },
      }),
    ]);
  }

  private async getGameByIdOrFail(gameId: string, lang?: string) {
    const game = await this.prisma.multiplayerGame.findUnique({
      where: { id: gameId },
      include: gameIncludeFields,
    });

    if (!game) {
      throw new NotFoundException(this.i18n.t('game.gameNotFound', { lang }));
    }
    return game;
  }

  private async ensureUserExists(userId: string, lang?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }
    return user;
  }

  private async ensureSufficientBalance(
    userId: string,
    amount: number,
    lang?: string,
  ) {
    const hasBalance = await this.transactionService.hasUserSufficientBalance(
      userId,
      amount,
    );
    if (!hasBalance) {
      throw new BadRequestException(
        this.i18n.t('game.insufficientBalance', { lang }),
      );
    }
  }

  private mapGameToDto(game: any): MultiplayerGameDto {
    const players: GamePlayerDto[] = game.players.map((p: any) => ({
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
      currentTurnPlayerId: game.currentTurnPlayerId,
      createdAt: game.createdAt,
      startedAt: game.startedAt,
      finishedAt: game.finishedAt,
      players,
    };
  }
}
