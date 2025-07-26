import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
import { SoloGameResult } from '@generated/prisma';
import { PaginationDto } from '@shared/dtos';
import { PageOption, PrismaParams } from 'prisma-paginator';
import { TransactionService } from '../transaction/transaction.service';
import { PlaySoloGameDto } from './dto/solo-input.dto';
import {
  PlaySoloGameResponseDto,
  GetSoloGameHistoryResponseDto,
  SoloGameStatsDto,
  SoloGameDto,
} from './dto/solo-output.dto';

@Injectable()
export class SoloGameService {
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService<I18nTranslations>,
    private transactionService: TransactionService,
  ) {}

  async playSoloGame(
    userId: string,
    playSoloGameDto: PlaySoloGameDto,
    lang?: string,
  ): Promise<PlaySoloGameResponseDto> {
    const { bet, chosenNumber } = playSoloGameDto;

    // Check user exists and has sufficient balance
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }

    const hasBalance = await this.transactionService.hasUserSufficientBalance(userId, bet);
    if (!hasBalance) {
      throw new BadRequestException(
        this.i18n.t('game.insufficientBalance', { lang }),
      );
    }

    // Generates a random integer between 0 and 100 (inclusive)
    const generatedNumber = Math.floor(Math.random() * 101);

    // Check result and calculate gain
    let result: SoloGameResult;
    let multiplier: number;
    let balanceChange: number;
    //Response message
    let message: string;

    if (generatedNumber === chosenNumber) {
      result = SoloGameResult.EXACT_MATCH;
      multiplier = 2.0;
      balanceChange = bet * multiplier;
      message = this.i18n.t('game.solo.exactMatch', {
        lang,
        args: { points: balanceChange },
      });
    } else if (generatedNumber > chosenNumber) {
      result = SoloGameResult.HIGHER;
      multiplier = 1.5;
      balanceChange = bet * multiplier;
      message = this.i18n.t('game.solo.higher', {
        lang,
        args: { points: balanceChange },
      });
    } else {
      result = SoloGameResult.LOWER;
      multiplier = 0;
      balanceChange = -bet;
      message = this.i18n.t('game.solo.lower', {
        lang,
        args: { points: bet },
      });
    }

    // Create debit transaction for the bet
    const debitTransaction = await this.transactionService.createGameDebitTransaction(
      userId,
      bet,
      'solo',
      '', // Will be updated with game ID
    );

    let creditTransaction: any = null;
    if (result === SoloGameResult.EXACT_MATCH || result === SoloGameResult.HIGHER) {
      // Create credit transaction for winnings
      creditTransaction = await this.transactionService.createGameCreditTransaction(
        userId,
        balanceChange,
        'solo',
        '', // Will be updated with game ID
      );
    }

    // Create game record
    const soloGame = await this.prisma.soloGame.create({
      data: {
        userId,
        bet,
        chosenNumber,
        generatedNumber,
        result,
        balanceChange,
        multiplier,
        transactionId: creditTransaction?.id || debitTransaction.id,
      },
    });

    // Update transaction references with game ID
    await Promise.all([
      this.prisma.transaction.update({
        where: { id: debitTransaction.id },
        data: { reference: soloGame.id },
      }),
      creditTransaction ? this.prisma.transaction.update({
        where: { id: creditTransaction.id },
        data: { reference: soloGame.id },
      }) : Promise.resolve(),
    ]);

    // Get new balance
    const newBalance = await this.transactionService.getUserBalance(userId);

    const gameDto = this.mapSoloGameToDto(soloGame);

    return {
      game: gameDto,
      message,
      newBalance,
    };
  }

  async getSoloGameHistory(
    userId: string,
    paginationDto: PaginationDto,
    lang?: string,
  ): Promise<GetSoloGameHistoryResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.userNotFound', { lang }));
    }

    const pageOption: PageOption = {
      page: paginationDto.page || 1,
      size: paginationDto.size || 10,
      sort: paginationDto.sort || ['playedAt=desc'],
      filter: paginationDto.filter,
    };

    const prismaParams: PrismaParams = {
      where: { userId },
      select: {
        id: true,
        userId: true,
        bet: true,
        chosenNumber: true,
        generatedNumber: true,
        result: true,
        balanceChange: true,
        multiplier: true,
        playedAt: true,
      },
    };

    const result = await this.prisma.paginate<any>(
      'soloGame',
      pageOption,
      prismaParams,
    );

    const gamesDto = result.content.map((game) => this.mapSoloGameToDto(game));

    // Calculate stats for all user games (not just current page)
    const allUserGames = await this.prisma.soloGame.findMany({
      where: { userId },
      select: {
        result: true,
        balanceChange: true,
      },
    });

    const totalGames = allUserGames.length;
    const totalWon = allUserGames.filter(
      (g) =>
        g.result === SoloGameResult.EXACT_MATCH ||
        g.result === SoloGameResult.HIGHER,
    ).length;
    const totalLost = allUserGames.filter(
      (g) => g.result === SoloGameResult.LOWER,
    ).length;
    const winRate =
      totalGames > 0 ? Math.round((totalWon / totalGames) * 100) : 0;
    const totalEarnings = allUserGames.reduce(
      (sum, game) => sum + game.balanceChange,
      0,
    );

    return {
      games: gamesDto,
      meta: result.metaData,
      message: this.i18n.t('game.solo.historyRetrieved', { lang }),
      stats: {
        totalGames,
        totalWon,
        totalLost,
        winRate,
        totalEarnings,
      },
    };
  }

  async getSoloGameStats(lang?: string): Promise<SoloGameStatsDto> {
    const totalGames = await this.prisma.soloGame.count();

    const exactMatches = await this.prisma.soloGame.count({
      where: { result: SoloGameResult.EXACT_MATCH },
    });

    const higherWins = await this.prisma.soloGame.count({
      where: { result: SoloGameResult.HIGHER },
    });

    const losses = await this.prisma.soloGame.count({
      where: { result: SoloGameResult.LOWER },
    });

    const betSum = await this.prisma.soloGame.aggregate({
      _sum: { bet: true },
    });

    const winningsSum = await this.prisma.soloGame.aggregate({
      _sum: { balanceChange: true },
      where: {
        result: {
          in: [SoloGameResult.EXACT_MATCH, SoloGameResult.HIGHER],
        },
      },
    });

    return {
      totalGames,
      exactMatches,
      higherWins,
      losses,
      totalBet: betSum._sum.bet || 0,
      totalWinnings: winningsSum._sum.balanceChange || 0,
      message: this.i18n.t('game.solo.statsRetrieved', { lang }),
    };
  }

  private mapSoloGameToDto(soloGame: any): SoloGameDto {
    return {
      id: soloGame.id,
      userId: soloGame.userId,
      bet: soloGame.bet,
      chosenNumber: soloGame.chosenNumber,
      generatedNumber: soloGame.generatedNumber,
      result: soloGame.result,
      balanceChange: soloGame.balanceChange,
      multiplier: soloGame.multiplier,
      playedAt: soloGame.playedAt,
    };
  }
}
