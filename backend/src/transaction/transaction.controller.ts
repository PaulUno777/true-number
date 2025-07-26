import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { RechargeService } from './recharge.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRechargeDto } from './dto/recharge-input.dto';
import { 
  GetBalanceResponseDto, 
  GetTransactionHistoryResponseDto 
} from './dto/transaction-output.dto';
import { 
  CreateRechargeResponseDto, 
  GetRechargeHistoryResponseDto 
} from './dto/recharge-output.dto';
import { I18nLang } from 'nestjs-i18n';

@ApiTags('Transactions & Balance')
@Controller('transaction')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly rechargeService: RechargeService,
  ) {}

  @Get('balance')
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved successfully',
    type: GetBalanceResponseDto,
  })
  async getBalance(
    @Request() req: any,
  ): Promise<GetBalanceResponseDto> {
    const balance = await this.transactionService.getUserBalance(req.user.id);
    return {
      balance,
      message: 'Balance retrieved successfully',
    };
  }

  @Get('history')
  @ApiOperation({ summary: 'Get user transaction history' })
  @ApiResponse({
    status: 200,
    description: 'Transaction history retrieved successfully',
    type: GetTransactionHistoryResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  async getTransactionHistory(
    @Request() req: any,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ): Promise<GetTransactionHistoryResponseDto> {
    const result = await this.transactionService.getBalanceHistory(
      req.user.id,
      Number(page),
      Number(size),
    );
    
    return {
      ...result,
      message: 'Transaction history retrieved successfully',
    };
  }

  @Post('recharge')
  @ApiOperation({ summary: 'Recharge user account' })
  @ApiResponse({
    status: 201,
    description: 'Recharge completed successfully',
    type: CreateRechargeResponseDto,
  })
  async createRecharge(
    @Request() req: any,
    @Body() createRechargeDto: CreateRechargeDto,
    @I18nLang() lang: string,
  ): Promise<CreateRechargeResponseDto> {
    return this.rechargeService.createRecharge(req.user.id, createRechargeDto, lang);
  }

  @Get('recharge/history')
  @ApiOperation({ summary: 'Get user recharge history' })
  @ApiResponse({
    status: 200,
    description: 'Recharge history retrieved successfully',
    type: GetRechargeHistoryResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  async getRechargeHistory(
    @Request() req: any,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @I18nLang() lang: string,
  ): Promise<GetRechargeHistoryResponseDto> {
    return this.rechargeService.getRechargeHistory(
      req.user.id,
      Number(page),
      Number(size),
      lang,
    );
  }
}