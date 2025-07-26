import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, RechargeStatus } from '@generated/prisma';

export class RechargeDto {
  @ApiProperty({
    description: 'Recharge ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  userId: string;

  @ApiProperty({
    description: 'Recharge amount',
    example: 1000,
  })
  amount: number;

  @ApiProperty({
    description: 'Payment method used',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD,
  })
  method: PaymentMethod;

  @ApiProperty({
    description: 'Recharge status',
    enum: RechargeStatus,
    example: RechargeStatus.COMPLETED,
  })
  status: RechargeStatus;

  @ApiProperty({
    description: 'Transaction ID',
    example: '507f1f77bcf86cd799439011',
  })
  transactionId: string;

  @ApiProperty({
    description: 'Recharge creation date',
    example: '2024-01-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Recharge completion date',
    example: '2024-01-01T12:05:00Z',
    nullable: true,
  })
  completedAt?: Date;
}

export class CreateRechargeResponseDto {
  @ApiProperty({
    description: 'Recharge details',
    type: RechargeDto,
  })
  recharge: RechargeDto;

  @ApiProperty({
    description: 'New user balance after recharge',
    example: 2500,
  })
  newBalance: number;

  @ApiProperty({
    description: 'Success message',
    example: 'Recharge completed successfully',
  })
  message: string;
}

export class GetRechargeHistoryResponseDto {
  @ApiProperty({
    description: 'List of recharges',
    type: [RechargeDto],
  })
  recharges: RechargeDto[];

  @ApiProperty({
    description: 'Total number of recharges',
    example: 15,
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
    example: 2,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Message',
    example: 'Recharge history retrieved successfully',
  })
  message?: string;
}