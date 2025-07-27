import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { TransactionType, TransactionStatus } from '@generated/prisma';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    description: string,
    reference?: string,
  ) {
    const balance = await this.getUserBalance(userId);
    const balanceAfter =
      type == TransactionType.CREDIT ? balance + amount : balance - amount;

    return this.prisma.transaction.create({
      data: {
        userId,
        type,
        description,
        amount,
        balanceAfter,
        reference,
        status: TransactionStatus.COMPLETED,
      },
    });
  }

  async getUserBalance(userId: string): Promise<number> {
    const result = await this.prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId,
        status: TransactionStatus.COMPLETED,
      },
      _sum: {
        amount: true,
      },
    });

    const creditSum =
      result.find((r) => r.type === TransactionType.CREDIT)?._sum.amount ?? 0;
    const debitSum =
      result.find((r) => r.type === TransactionType.DEBIT)?._sum.amount ?? 0;

    return creditSum - debitSum;
  }

  async hasUserSufficientBalance(
    userId: string,
    amount: number,
  ): Promise<boolean> {
    const balance = await this.getUserBalance(userId);
    return balance >= amount;
  }

  async getUserTransactionHistory(
    userId: string,
    page: number = 1,
    size: number = 10,
  ) {
    const skip = (page - 1) * size;

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: size,
        select: {
          id: true,
          type: true,
          amount: true,
          description: true,
          reference: true,
          status: true,
          createdAt: true,
        },
      }),
      this.prisma.transaction.count({
        where: { userId },
      }),
    ]);

    return {
      transactions,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }

  async createGameDebitTransaction(
    userId: string,
    amount: number,
    gameType: 'solo' | 'multiplayer',
    gameId: string,
  ) {
    // Check if user has sufficient balance
    const hasSufficientBalance = await this.hasUserSufficientBalance(
      userId,
      amount,
    );
    if (!hasSufficientBalance) {
      throw new Error('Insufficient balance');
    }

    return this.createTransaction(
      userId,
      TransactionType.DEBIT,
      amount,
      `${gameType === 'solo' ? 'Solo' : 'Multiplayer'} game bet`,
      gameId,
    );
  }

  async createGameCreditTransaction(
    userId: string,
    amount: number,
    gameType: 'solo' | 'multiplayer',
    gameId: string,
  ) {
    return this.createTransaction(
      userId,
      TransactionType.CREDIT,
      amount,
      `${gameType === 'solo' ? 'Solo' : 'Multiplayer'} game win`,
      gameId,
    );
  }

  async createRechargeTransaction(
    userId: string,
    amount: number,
    rechargeId: string,
  ) {
    return this.createTransaction(
      userId,
      TransactionType.CREDIT,
      amount,
      'Account recharge',
      rechargeId,
    );
  }

  async getBalanceHistory(userId: string, page: number = 1, size: number = 10) {
    const transactions = await this.getUserTransactionHistory(
      userId,
      page,
      size,
    );

    // Calculate running balance for each transaction
    let runningBalance = 0;
    const allTransactions = await this.prisma.transaction.findMany({
      where: { userId, status: TransactionStatus.COMPLETED },
      orderBy: { createdAt: 'asc' },
      select: { type: true, amount: true, createdAt: true },
    });

    const transactionsWithBalance = transactions.transactions.map(
      (transaction) => {
        // Find the running balance at this transaction's time
        const transactionsUpToThis = allTransactions.filter(
          (t) => t.createdAt <= transaction.createdAt,
        );

        const balanceAtTransaction = transactionsUpToThis.reduce(
          (balance, t) => {
            return t.type === TransactionType.CREDIT
              ? balance + t.amount
              : balance - t.amount;
          },
          0,
        );

        return {
          ...transaction,
          reference: transaction.reference ?? undefined,
          balanceAfter: balanceAtTransaction,
        };
      },
    );

    return {
      ...transactions,
      transactions: transactionsWithBalance,
    };
  }
}
