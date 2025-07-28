import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SoloGameService } from './solo-game.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PlaySoloGameDto } from './dto/solo-input.dto';
import {
  PlaySoloGameResponseDto,
  GetSoloGameHistoryResponseDto,
  SoloGameStatsDto,
} from './dto/solo-output.dto';
import { Role } from '@generated/prisma';
import { I18nLang } from 'nestjs-i18n';
import { PaginationDto } from '@shared/dtos';

@ApiTags('Solo Game')
@Controller('solo-game')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SoloGameController {
  constructor(private readonly soloGameService: SoloGameService) {}

  @Post('play')
  @ApiOperation({ summary: 'Play a solo game' })
  @ApiResponse({
    status: 201,
    description: 'Solo game played successfully',
    type: PlaySoloGameResponseDto,
  })
  async playSoloGame(
    @Request() req: any,
    @Body() playSoloGameDto: PlaySoloGameDto,
    @I18nLang() lang: string,
  ): Promise<PlaySoloGameResponseDto> {
    return this.soloGameService.playSoloGame(req.user.id, playSoloGameDto, lang);
  }

  @Get('history')
  @ApiOperation({ summary: "Get the user's solo game history" })
  @ApiResponse({
    status: 200,
    description: 'Solo game history retrieved successfully',
    type: GetSoloGameHistoryResponseDto,
  })
  async getSoloGameHistory(
    @Request() req: any,
    @Query() query: PaginationDto,
    @I18nLang() lang: string,
  ): Promise<GetSoloGameHistoryResponseDto> {
    return this.soloGameService.getSoloGameHistory(req.user.id, query, lang);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get solo game statistics (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Solo game statistics retrieved successfully',
    type: SoloGameStatsDto,
  })
  async getSoloGameStats(
    @I18nLang() lang: string,
  ): Promise<SoloGameStatsDto> {
    return this.soloGameService.getSoloGameStats(lang);
  }
}
