import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { MultiGameService } from './multi-game.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateGameDto } from './dto/multiplayer-input.dto';
import {
  GameResponseDto,
  GetWaitingGamesResponseDto,
  JoinGameResponseDto,
  PlayTurnResponseDto,
  GetUserGamesResponseDto,
  MultiplayerStatsDto,
} from './dto/multiplayer-output.dto';
import { Role } from '@generated/prisma';
import { I18nLang } from 'nestjs-i18n';
import { PaginationDto } from '@shared/dtos';

@ApiTags('Multiplayer Game')
@Controller('multi-game')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MultiGameController {
  constructor(private readonly gameService: MultiGameService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new multiplayer game' })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
    type: GameResponseDto,
  })
  async createGame(
    @Request() req: any,
    @Body() createGameDto: CreateGameDto,
    @I18nLang() lang: string,
  ): Promise<GameResponseDto> {
    return this.gameService.createGame(req.user.id, createGameDto, lang);
  }

  @Get('waiting')
  @ApiOperation({ summary: 'Get list of waiting games' })
  @ApiResponse({
    status: 200,
    description: 'Waiting games retrieved successfully',
    type: GetWaitingGamesResponseDto,
  })
  async getWaitingGames(
    @I18nLang() lang: string,
  ): Promise<GetWaitingGamesResponseDto> {
    return this.gameService.getWaitingGames(lang);
  }

  @Post('join/:gameId')
  @ApiOperation({ summary: 'Join a waiting game' })
  @ApiParam({
    name: 'gameId',
    description: 'ID of the game to join',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Joined game successfully',
    type: JoinGameResponseDto,
  })
  async joinGame(
    @Request() req: any,
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<JoinGameResponseDto> {
    return this.gameService.joinGame(req.user.id, gameId, lang);
  }

  @Post('play/:gameId')
  @ApiOperation({ summary: 'Play a turn in a game' })
  @ApiParam({
    name: 'gameId',
    description: 'ID of the game',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Turn played successfully',
    type: PlayTurnResponseDto,
  })
  async playTurn(
    @Request() req: any,
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<PlayTurnResponseDto> {
    return this.gameService.playTurn(req.user.id, gameId, lang);
  }

  @Get('details/:gameId')
  @ApiOperation({ summary: 'Get game details' })
  @ApiParam({
    name: 'gameId',
    description: 'ID of the game',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Game details retrieved',
    type: GameResponseDto,
  })
  async getGameDetails(
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<GameResponseDto> {
    return this.gameService.getGameDetails(gameId, lang);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get user multiplayer game history',
  })
  @ApiResponse({
    status: 200,
    description: 'Multiplayer game history retrieved',
    type: GetUserGamesResponseDto,
  })
  async getMultiplayerGameHistory(
    @Request() req: any,
    @Query() query: PaginationDto,
    @I18nLang() lang: string,
  ): Promise<GetUserGamesResponseDto> {
    return this.gameService.getMultiplayerGameHistory(req.user.id, query, lang);
  }

  @Get('stats/multiplayer')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get multiplayer stats (Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Multiplayer stats retrieved',
    type: MultiplayerStatsDto,
  })
  async getMultiplayerStats(
    @I18nLang() lang: string,
  ): Promise<MultiplayerStatsDto> {
    return this.gameService.getMultiplayerStats(lang);
  }

  @Get('last-created')
  @ApiOperation({
    summary: 'Get the last game created by the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Last created game retrieved',
    type: GameResponseDto,
  })
  async getLastCreatedGame(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<GameResponseDto | null> {
    return this.gameService.getLastCreatedGame(req.user.id, lang);
  }

  @Get('active')
  @ApiOperation({ summary: "Get the user's currently active game" })
  @ApiResponse({
    status: 200,
    description: 'Active game retrieved',
    type: GameResponseDto,
  })
  async getActiveGame(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<GameResponseDto | null> {
    return this.gameService.getActiveGame(req.user.id, lang);
  }

  @Post('leave/:gameId')
  @ApiOperation({ summary: 'Leave a game' })
  @ApiParam({
    name: 'gameId',
    description: 'ID of the game to leave',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Left game successfully',
    type: GameResponseDto,
  })
  async leaveGame(
    @Request() req: any,
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<GameResponseDto> {
    return this.gameService.leaveGame(req.user.id, gameId, lang);
  }

  @Post('forfeit-timeout/:gameId')
  @ApiOperation({
    summary: 'Forfeit due to timeout - called from frontend when time is up',
  })
  @ApiParam({
    name: 'gameId',
    description: 'ID of the game',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Timeout forfeit handled successfully',
    type: GameResponseDto,
  })
  async forfeitByTimeout(
    @Request() req: any,
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<GameResponseDto> {
    return this.gameService.forfeitGameByTimeout(gameId, req.user.id, lang);
  }
}
