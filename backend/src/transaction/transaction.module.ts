import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { RechargeService } from './recharge.service';
import { PrismaModule } from '@shared/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionController],
  providers: [TransactionService, RechargeService],
  exports: [TransactionService, RechargeService],
})
export class TransactionModule {}