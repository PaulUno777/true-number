import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { TransactionService } from './transaction.service';
import { CreateRechargeDto } from './dto/recharge-input.dto';
import { CreateRechargeResponseDto, GetRechargeHistoryResponseDto } from './dto/recharge-output.dto';
import { PaymentMethod, RechargeStatus } from '@generated/prisma';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';

@Injectable()
export class RechargeService {
  constructor(
    private prisma: PrismaService,
    private transactionService: TransactionService,
    private i18n: I18nService//<I18nTranslations>,
  ) {}

  async createRecharge(
    userId: string,
    createRechargeDto: CreateRechargeDto,
    lang?: string,
  ): Promise<CreateRechargeResponseDto> {
    const { amount, method, ...billingData } = createRechargeDto;

    // Validate billing data based on payment method
    this.validateBillingData(method, billingData);

    // Simulate payment processing
    const paymentResult = await this.simulatePayment(method, amount, billingData);
    
    if (!paymentResult.success) {
      throw new BadRequestException(
        this.i18n.t('recharge.paymentFailed', { lang }) || 'Payment failed',
      );
    }

    // Create transaction first
    const transaction = await this.transactionService.createRechargeTransaction(
      userId,
      amount,
      '', // Will be updated with recharge ID
    );

    // Create recharge record
    const recharge = await this.prisma.recharge.create({
      data: {
        userId,
        amount,
        method,
        status: RechargeStatus.COMPLETED,
        transactionId: transaction.id,
        billingData: this.sanitizeBillingData(billingData),
        completedAt: new Date(),
      },
    });

    // Update transaction reference with recharge ID
    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: { reference: recharge.id },
    });

    // Get new balance
    const newBalance = await this.transactionService.getUserBalance(userId);

    return {
      recharge: this.mapRechargeToDto(recharge),
      newBalance,
      message: this.i18n.t('recharge.success', { lang }) || 'Recharge completed successfully',
    };
  }

  async getRechargeHistory(
    userId: string,
    page: number = 1,
    size: number = 10,
    lang?: string,
  ): Promise<GetRechargeHistoryResponseDto> {
    const skip = (page - 1) * size;

    const [recharges, total] = await Promise.all([
      this.prisma.recharge.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: size,
      }),
      this.prisma.recharge.count({
        where: { userId },
      }),
    ]);

    return {
      recharges: recharges.map(this.mapRechargeToDto),
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
      message: this.i18n.t('recharge.historyRetrieved', { lang }) || 'Recharge history retrieved successfully',
    };
  }

  private validateBillingData(method: PaymentMethod, billingData: any) {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        if (!billingData.cardNumber || !billingData.cardExpiry || !billingData.cardCvv) {
          throw new BadRequestException('Credit card details are required');
        }
        break;
      case PaymentMethod.PAYPAL:
        if (!billingData.paypalEmail) {
          throw new BadRequestException('PayPal email is required');
        }
        break;
      case PaymentMethod.BANK_TRANSFER:
        if (!billingData.bankAccount) {
          throw new BadRequestException('Bank account is required');
        }
        break;
      case PaymentMethod.CRYPTO:
        if (!billingData.cryptoWallet) {
          throw new BadRequestException('Crypto wallet address is required');
        }
        break;
    }
  }

  private async simulatePayment(
    method: PaymentMethod,
    amount: number,
    billingData: any,
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simulate payment scenarios
    const scenarios = [
      { success: true, probability: 0.9 }, // 90% success rate
      { success: false, error: 'Insufficient funds', probability: 0.05 },
      { success: false, error: 'Card declined', probability: 0.03 },
      { success: false, error: 'Network error', probability: 0.02 },
    ];

    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const scenario of scenarios) {
      cumulativeProbability += scenario.probability;
      if (random <= cumulativeProbability) {
        if (scenario.success) {
          return {
            success: true,
            transactionId: this.generateFakeTransactionId(method),
          };
        } else {
          return {
            success: false,
            error: scenario.error,
          };
        }
      }
    }

    // Fallback (should not reach here)
    return { success: true, transactionId: this.generateFakeTransactionId(method) };
  }

  private generateFakeTransactionId(method: PaymentMethod): string {
    const prefixes = {
      [PaymentMethod.CREDIT_CARD]: 'CC',
      [PaymentMethod.PAYPAL]: 'PP',
      [PaymentMethod.BANK_TRANSFER]: 'BT',
      [PaymentMethod.CRYPTO]: 'CR',
    };

    const prefix = prefixes[method];
    const randomId = Math.random().toString(36).substring(2, 15);
    return `${prefix}${Date.now()}${randomId}`.toUpperCase();
  }

  private sanitizeBillingData(billingData: any): any {
    // Remove sensitive data and keep only necessary information for records
    const sanitized = { ...billingData };
    
    if (sanitized.cardNumber) {
      // Keep only last 4 digits
      sanitized.cardNumber = `****-****-****-${sanitized.cardNumber.slice(-4)}`;
    }
    
    if (sanitized.cardCvv) {
      delete sanitized.cardCvv; // Never store CVV
    }

    return sanitized;
  }

  private mapRechargeToDto(recharge: any) {
    return {
      id: recharge.id,
      userId: recharge.userId,
      amount: recharge.amount,
      method: recharge.method,
      status: recharge.status,
      transactionId: recharge.transactionId,
      createdAt: recharge.createdAt,
      completedAt: recharge.completedAt,
    };
  }
}