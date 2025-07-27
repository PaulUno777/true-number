import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user-input.dto';
import {
  GetUserResponseDto,
  GetUserWithStatsResponseDto,
  CreateUserResponseDto,
  UpdateUserResponseDto,
  DeleteUserResponseDto,
} from './dto/user-output.dto';
import { Role } from '@generated/prisma';
import { I18nLang } from 'nestjs-i18n';
import { PaginationDto } from '@shared/dtos';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile retrieved',
    type: GetUserResponseDto,
  })
  findMe(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<GetUserResponseDto> {
    return this.usersService.findMe(req.user.id, lang);
  }

  @Get('me/stats')
  @ApiOperation({ summary: 'Get current user profile with game statistics' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile with stats retrieved',
    type: GetUserWithStatsResponseDto,
  })
  findMeWithStats(
    @Request() req: any,
    @I18nLang() lang: string,
  ): Promise<GetUserWithStatsResponseDto> {
    return this.usersService.getUserWithGameStats(req.user.id, lang);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  create(
    @Body() createUserDto: CreateUserDto,
    @I18nLang() lang: string,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto, lang);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'All users retrieved' })
  findAll(@Query() query: PaginationDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved',
    type: GetUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(
    @Param('id') id: string,
    @I18nLang() lang: string,
  ): Promise<GetUserResponseDto> {
    return this.usersService.findOne(id, lang);
  }

  @Get(':id/stats')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get user with game statistics (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User with statistics retrieved',
    type: GetUserWithStatsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOneWithStats(
    @Param('id') id: string,
    @I18nLang() lang: string,
  ): Promise<GetUserWithStatsResponseDto> {
    return this.usersService.getUserWithGameStats(id, lang);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update user (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UpdateUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @I18nLang() lang: string,
  ): Promise<UpdateUserResponseDto> {
    return this.usersService.update(id, updateUserDto, lang);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(
    @Param('id') id: string,
    @I18nLang() lang: string,
  ): Promise<DeleteUserResponseDto> {
    return this.usersService.remove(id, lang);
  }
}
