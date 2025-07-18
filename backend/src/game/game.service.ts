import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import {
  GamePlayResponseDto,
  GetBalanceResponseDto,
  GetHistoryResponseDto,
  GetGlobalStatsResponseDto,
} from './dto/game-output.dto';
import { GameResult } from '@generated/prisma';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
import { DEFAULT_PAGE_SIZE, PaginationDto } from '@shared/dtos';
import { PageOption, PrismaParams } from 'prisma-paginator';
@Injectable()
export class GameService {
  private readonly WIN_POINTS = 50;
  private readonly LOSE_POINTS = -35;
  private readonly WIN_MIN = 70;

  constructor(
    private prisma: PrismaService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  async playGame(userId: string, lang?: string): Promise<GamePlayResponseDto> {
    // Generate random number between 0 and 100
    const generatedNumber = Math.floor(Math.random() * 101);

    // Determine result and balance change
    const isWin = generatedNumber > this.WIN_MIN;
    const result = isWin ? GameResult.WON : GameResult.LOST;
    const balanceChange = isWin ? this.WIN_POINTS : this.LOSE_POINTS;

    // Get current user balance
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }

    const newBalance = user.balance + balanceChange;

    // Update user balance and create game history in a transaction
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { balance: newBalance },
      }),
      this.prisma.gameHistory.create({
        data: {
          userId,
          generatedNumber,
          result,
          balanceChange,
          newBalance,
        },
      }),
    ]);

    const message = isWin
      ? this.i18n.t('game.gameWon', { lang })
      : this.i18n.t('game.gameLost', { lang });

    return {
      result,
      generatedNumber,
      balanceChange,
      newBalance,
      message,
    };
  }

  async getUserBalance(
    userId: string,
    lang?: string,
  ): Promise<GetBalanceResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }
    return {
      balance: user.balance,
    };
  }

  async getUserHistory(
    userId: string,
    paginationDto: PaginationDto,
    lang?: string,
  ): Promise<GetHistoryResponseDto> {
    const pageOption: PageOption = {
      page: paginationDto.page || 1,
      size: paginationDto.size || DEFAULT_PAGE_SIZE,
      sort: paginationDto.sort || ['playedAt=desc'],
      filter: paginationDto.filter,
    };
    const prismaParams: PrismaParams = {
      where: { userId },
      select: {
        id: true,
        generatedNumber: true,
        result: true,
        balanceChange: true,
        newBalance: true,
        playedAt: true,
      },
    };
    const paginatedHistory = await this.prisma.paginate<any>(
      'gameHistory',
      pageOption,
      prismaParams,
    );

    return {
      data: paginatedHistory.content,
      meta: paginatedHistory.metaData,
      message: this.i18n.t('game.historyRetrieved', { lang }),
    };
  }

  async getAllHistory(
    paginationDto: PaginationDto,
    lang?: string,
  ): Promise<GetHistoryResponseDto> {
    const pageOption: PageOption = {
      page: paginationDto.page || 1,
      size: paginationDto.size || DEFAULT_PAGE_SIZE,
      sort: paginationDto.sort || ['playedAt=desc'],
      filter: paginationDto.filter,
    };
    const prismaParams: PrismaParams = {
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    };
    const paginatedHistory = await this.prisma.paginate<any>(
      'gameHistory',
      pageOption,
      prismaParams,
    );

    return {
      data: paginatedHistory.content,
      meta: paginatedHistory.metaData,
      message: this.i18n.t('game.historyRetrieved', { lang }),
    };
  }

  async getGlobalStats(): Promise<GetGlobalStatsResponseDto> {
    const totalUsers = await this.prisma.user.count();
    const totalGames = await this.prisma.gameHistory.count();

    const gameStats = await this.prisma.gameHistory.groupBy({
      by: ['result'],
      _count: {
        result: true,
      },
    });

    const wonGames =
      gameStats.find((s) => s.result === GameResult.WON)?._count.result || 0;
    const lostGames =
      gameStats.find((s) => s.result === GameResult.LOST)?._count.result || 0;

    const averageBalance = await this.prisma.user.aggregate({
      _avg: {
        balance: true,
      },
    });

    const topPlayersRaw = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        balance: true,
        _count: {
          select: {
            gameHistory: true,
          },
        },
      },
      orderBy: {
        balance: 'desc',
      },
      take: 10,
    });

    const topPlayers = topPlayersRaw
      .map((player) => ({
        id: player.id,
        username: player.username,
        balance: player.balance,
        gameHistory: player._count.gameHistory,
      }))
      .filter((item) => item.gameHistory > 0);

    return {
      totalUsers,
      totalGames,
      wonGames,
      lostGames,
      globalWinRate: totalGames > 0 ? (wonGames / totalGames) * 100 : 0,
      averageBalance: averageBalance._avg.balance || 0,
      topPlayers,
    };
  }
}
