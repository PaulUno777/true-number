import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum, IsString, Min, IsOptional } from 'class-validator';
import { PaymentMethod } from '@generated/prisma';

export class CreateRechargeDto {
  @ApiProperty({
    description: 'Amount to recharge in points',
    example: 1000,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD,
  })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({
    description: 'Card number (fake for demo)',
    example: '4111111111111111',
    required: false,
  })
  @IsOptional()
  @IsString()
  cardNumber?: string;

  @ApiProperty({
    description: 'Card expiry (fake for demo)',
    example: '12/25',
    required: false,
  })
  @IsOptional()
  @IsString()
  cardExpiry?: string;

  @ApiProperty({
    description: 'Card CVV (fake for demo)',
    example: '123',
    required: false,
  })
  @IsOptional()
  @IsString()
  cardCvv?: string;

  @ApiProperty({
    description: 'Cardholder name (fake for demo)',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  cardholderName?: string;

  @ApiProperty({
    description: 'PayPal email (fake for demo)',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  paypalEmail?: string;

  @ApiProperty({
    description: 'Bank account number (fake for demo)',
    example: 'ACC123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  bankAccount?: string;

  @ApiProperty({
    description: 'Crypto wallet address (fake for demo)',
    example: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    required: false,
  })
  @IsOptional()
  @IsString()
  cryptoWallet?: string;
}