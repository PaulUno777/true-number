import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponseDto, LogoutResponseDto } from './dto/auth-output.dto';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth-input.dto';
import { I18nLang, I18nValidationExceptionFilter } from 'nestjs-i18n';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @Body() registerDto: RegisterDto,
    @I18nLang() lang: string,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerDto, lang);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @I18nLang() lang: string,
  ): Promise<AuthResponseDto> {
    return this.authService.login(loginDto, lang);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto,
    @I18nLang() lang: string,
  ): Promise<AuthResponseDto> {
    return this.authService.refreshTokens(refreshTokenDto, lang);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged out',
    type: LogoutResponseDto 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Request() req: any, @I18nLang() lang: string): Promise<LogoutResponseDto> {
    return await this.authService.logout(req.user.id, lang);
  }
}
