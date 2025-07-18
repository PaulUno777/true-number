import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CreateUserDto, UpdateUserDto } from './dto/user-input.dto';
import { 
  CreateUserResponseDto, 
  UpdateUserResponseDto, 
  DeleteUserResponseDto, 
  GetUserResponseDto, 
  GetUserWithStatsResponseDto 
} from './dto/user-output.dto';
import { hashData } from '@shared/utils';
import { I18nTranslations } from '@generated/i18n.generated';
import { I18nService } from 'nestjs-i18n';
import { PaginationDto } from '@shared/dtos';
import { PageOption, PrismaParams } from 'prisma-paginator';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  async create(createUserDto: CreateUserDto, lang: string): Promise<CreateUserResponseDto> {
    const { username, email, password, phone, role } = createUserDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        this.i18n.translate('auth.userExists', { lang }),
      );
    }

    // Hash password
    const hashedPassword = await hashData(password);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        balance: true,
        createdAt: true,
      },
    });

    return {
      data: user,
      message: this.i18n.translate('user.userCreated', { lang }),
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const pageOption: PageOption = {
      page: paginationDto.page || 1,
      size: paginationDto.size || 10,
      sort: paginationDto.sort || ['createdAt=desc'],
      filter: paginationDto.filter,
    };

    const prismaParams: PrismaParams = {
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        balance: true,
        createdAt: true,
        _count: {
          select: {
            gameHistory: true,
          },
        },
      },
    };

    return await this.prisma.paginate<any>('user', pageOption, prismaParams);
  }

  async findOne(id: string, lang?: string): Promise<GetUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        balance: true,
        createdAt: true,
        _count: {
          select: {
            gameHistory: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }

    return { data: user };
  }

  async findMe(id: string, lang?: string): Promise<GetUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        balance: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }

    return {data: user};
  }

  async update(id: string, updateUserDto: UpdateUserDto, lang?: string): Promise<UpdateUserResponseDto> {
    const { username, email, phone, role } = updateUserDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }

    // Check for conflicts if updating email or username
    if (email || username) {
      const conflictUser = await this.prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            ...(email || username
              ? [
                  {
                    OR: [
                      ...(email ? [{ email }] : []),
                      ...(username ? [{ username }] : []),
                      ...(phone ? [{ phone }] : []),
                    ],
                  },
                ]
              : []),
          ],
        },
      });

      if (conflictUser) {
        throw new ConflictException(
          this.i18n.translate('auth.userExists', { lang }),
        );
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        phone,
        role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: updatedUser,
      message: this.i18n.translate('user.userUpdated', { lang }),
    };
  }

  async remove(id: string, lang): Promise<DeleteUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: this.i18n.translate('user.userDeleted', { lang }),
    };
  }

  async getUserWithGameStats(id: string, lang?: string): Promise<GetUserWithStatsResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        balance: true,
        createdAt: true,
        gameHistory: {
          select: {
            result: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }

    const totalGames = user.gameHistory.length;
    const wonGames = user.gameHistory.filter(
      (game) => game.result === 'WON',
    ).length;
    const lostGames = totalGames - wonGames;
    const winRate = totalGames > 0 ? (wonGames / totalGames) * 100 : 0;

    const { gameHistory, ...userWithoutHistory } = user;

    return {
      data: {
        ...userWithoutHistory,
        stats: {
          totalGames,
          wonGames,
          lostGames,
          winRate: Math.round(winRate * 100) / 100, // Round to 2 decimal places
        },
      },
    };
  }
}
