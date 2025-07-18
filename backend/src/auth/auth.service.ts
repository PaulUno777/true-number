import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@shared/prisma';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth-input.dto';
import { AuthResponseDto } from './dto/auth-output.dto';
import { Role, User } from '@generated/prisma/client';
import { hashData, verifyHash } from '@shared/utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  async register(
    registerDto: RegisterDto,
    lang?: string,
  ): Promise<AuthResponseDto> {
    const { username, email, password, phone } = registerDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException(this.i18n.t('auth.userExists', { lang }));
    }

    // Hash password
    const hashedPassword = await hashData(password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        role: Role.CLIENT,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Save refresh token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      message: this.i18n.t('auth.accountCreated', { lang }),
      ...tokens,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
    };
  }

  async login(loginDto: LoginDto, lang?: string): Promise<AuthResponseDto> {
    const { login, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: login.toLowerCase() }, { phone: login }],
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t('auth.invalidCredentials', { lang }),
      );
    }

    // Verify password
    const isPasswordValid = await verifyHash(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.i18n.t('auth.invalidCredentials', { lang }),
      );
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Save refresh token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
      message: this.i18n.t('auth.loginSuccess', { lang }),
    };
  }

  async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
    lang?: string,
  ): Promise<AuthResponseDto> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException(
          this.i18n.t('auth.invalidRefreshToken', { lang }),
        );
      }

      const refreshTokenMatches = await verifyHash(
        user.refreshToken,
        refreshToken,
      );
      if (!refreshTokenMatches) {
        throw new UnauthorizedException(
          this.i18n.t('auth.invalidRefreshToken', { lang }),
        );
      }

      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        ...tokens,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          balance: user.balance,
        },
        message: this.i18n.t('auth.tokenRefreshed', { lang }),
      };
    } catch (error) {
      throw new UnauthorizedException(
        this.i18n.t('auth.invalidRefreshToken', { lang }),
      );
    }
  }

  async logout(userId: string, lang?: string): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return {
      message: this.i18n.t('auth.logoutSuccess', { lang }),
    };
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '24h'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }
}
