import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { 
  GamePlayResponseDto, 
  GetBalanceResponseDto, 
  GetHistoryResponseDto, 
  GetGlobalStatsResponseDto 
} from './dto/game-output.dto';
import { Role } from '@generated/prisma';
import { I18nLang } from 'nestjs-i18n';
import { PaginationDto } from '@shared/dtos';

@ApiTags('Game')
@Controller('game')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('play')
  @ApiOperation({ summary: 'Play TrueNumber game' })
  @ApiResponse({
    status: 201,
    description: 'Game played successfully',
    type: GamePlayResponseDto,
  })
  async playGame(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<GamePlayResponseDto> {
    return this.gameService.playGame(req.user.id, lang);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({
    status: 200,
    description: 'User balance retrieved',
    type: GetBalanceResponseDto,
  })
  async getBalance(@Request() req: any, @I18nLang() lang: string): Promise<GetBalanceResponseDto> {
    return this.gameService.getUserBalance(req.user.id, lang);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get user game history' })
  @ApiResponse({ 
    status: 200, 
    description: 'User game history retrieved',
    type: GetHistoryResponseDto 
  })
  async getHistory(
    @Request() req: any,
    @Query() query: PaginationDto,
    @I18nLang() lang: string,
  ): Promise<GetHistoryResponseDto> {
    return this.gameService.getUserHistory(req.user.id, query, lang);
  }

  @Get('history/all')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users game history (Admin only)' })
  @ApiResponse({ 
    status: 200, 
    description: 'All game history retrieved',
    type: GetHistoryResponseDto 
  })
  async getAllHistory(@Query() query: PaginationDto, @I18nLang() lang: string): Promise<GetHistoryResponseDto> {
    return this.gameService.getAllHistory(query, lang);
  }

  @Get('stats/global')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get global game statistics (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Global game statistics retrieved',
    type: GetGlobalStatsResponseDto,
  })
  async getGlobalStats(): Promise<GetGlobalStatsResponseDto> {
    return this.gameService.getGlobalStats();
  }
}
