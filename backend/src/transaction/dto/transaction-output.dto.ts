import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '@generated/prisma';

export class TransactionDto {
  @ApiProperty({
    description: 'Transaction ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Transaction type',
    enum: TransactionType,
    example: TransactionType.CREDIT,
  })
  type: TransactionType;

  @ApiProperty({
    description: 'Transaction amount',
    example: 100,
  })
  amount: number;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Solo game win',
  })
  description: string;

  @ApiProperty({
    description: 'Reference ID (game ID, recharge ID, etc.)',
    example: '507f1f77bcf86cd799439011',
    nullable: true,
  })
  reference?: string;

  @ApiProperty({
    description: 'Transaction status',
    enum: TransactionStatus,
    example: TransactionStatus.COMPLETED,
  })
  status: TransactionStatus;

  @ApiProperty({
    description: 'Transaction date',
    example: '2024-01-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Balance after this transaction',
    example: 1500,
    required: false,
  })
  balanceAfter?: number;
}

export class GetBalanceResponseDto {
  @ApiProperty({
    description: 'Current user balance',
    example: 1500,
  })
  balance: number;

  @ApiProperty({
    description: 'Message',
    example: 'Balance retrieved successfully',
  })
  message?: string;
}

export class GetTransactionHistoryResponseDto {
  @ApiProperty({
    description: 'List of transactions',
    type: [TransactionDto],
  })
  transactions: TransactionDto[];

  @ApiProperty({
    description: 'Total number of transactions',
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Page size',
    example: 10,
  })
  size: number;

  @ApiProperty({
    description: 'Total pages',
    example: 3,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Message',
    example: 'Transaction history retrieved successfully',
  })
  message?: string;
}