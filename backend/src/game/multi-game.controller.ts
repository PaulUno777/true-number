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
import { CreateGameDto, PlayTurnDto } from './dto/multiplayer-input.dto';
import {
  CreateGameResponseDto,
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
  @ApiOperation({ summary: 'Créer une nouvelle partie multijoueur' })
  @ApiResponse({
    status: 201,
    description: 'Partie créée avec succès',
    type: CreateGameResponseDto,
  })
  async createGame(
    @Request() req: any,
    @Body() createGameDto: CreateGameDto,
    @I18nLang() lang: string,
  ): Promise<CreateGameResponseDto> {
    return this.gameService.createGame(req.user.id, createGameDto, lang);
  }

  @Get('waiting')
  @ApiOperation({ summary: 'Obtenir la liste des parties en attente' })
  @ApiResponse({
    status: 200,
    description: 'Parties en attente récupérées',
    type: GetWaitingGamesResponseDto,
  })
  async getWaitingGames(
    @I18nLang() lang: string,
  ): Promise<GetWaitingGamesResponseDto> {
    return this.gameService.getWaitingGames(lang);
  }

  @Post('join/:gameId')
  @ApiOperation({ summary: 'Rejoindre une partie en attente' })
  @ApiParam({
    name: 'gameId',
    description: 'ID de la partie à rejoindre',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Partie rejointe avec succès',
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
  @ApiOperation({ summary: 'Jouer son tour dans une partie' })
  @ApiParam({
    name: 'gameId',
    description: 'ID de la partie',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Tour joué avec succès',
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
  @ApiOperation({ summary: "Obtenir les détails d'une partie" })
  @ApiParam({
    name: 'gameId',
    description: 'ID de la partie',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Détails de la partie récupérés',
    type: CreateGameResponseDto,
  })
  async getGameDetails(
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<CreateGameResponseDto> {
    return this.gameService.getGameDetails(gameId, lang);
  }

  @Get('history')
  @ApiOperation({
    summary: "Obtenir l'historique des parties multijoueur de l'utilisateur",
  })
  @ApiResponse({
    status: 200,
    description: 'Historique des parties multijoueur récupéré',
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
    summary: 'Obtenir les statistiques multijoueur (Admin seulement)',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistiques multijoueur récupérées',
    type: MultiplayerStatsDto,
  })
  async getMultiplayerStats(
    @I18nLang() lang: string,
  ): Promise<MultiplayerStatsDto> {
    return this.gameService.getMultiplayerStats(lang);
  }

  @Get('last-created')
  @ApiOperation({
    summary: "Obtenir la dernière partie créée par l'utilisateur",
  })
  @ApiResponse({
    status: 200,
    description: 'Dernière partie créée récupérée',
    type: CreateGameResponseDto,
  })
  async getLastCreatedGame(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<CreateGameResponseDto | null> {
    return this.gameService.getLastCreatedGame(req.user.id, lang);
  }

  @Get('active')
  @ApiOperation({ summary: "Obtenir la partie active de l'utilisateur" })
  @ApiResponse({
    status: 200,
    description: 'Partie active récupérée',
    type: CreateGameResponseDto,
  })
  async getActiveGame(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<CreateGameResponseDto | null> {
    return this.gameService.getActiveGame(req.user.id, lang);
  }

  @Post('leave/:gameId')
  @ApiOperation({ summary: 'Quitter une partie' })
  @ApiParam({
    name: 'gameId',
    description: 'ID de la partie à quitter',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 201,
    description: 'Partie quittée avec succès',
    type: CreateGameResponseDto,
  })
  async leaveGame(
    @Request() req: any,
    @Param('gameId') gameId: string,
    @I18nLang() lang: string,
  ): Promise<CreateGameResponseDto> {
    return this.gameService.leaveGame(req.user.id, gameId, lang);
  }
}
