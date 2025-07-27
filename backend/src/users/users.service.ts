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
  GetUserWithStatsResponseDto,
  GetUsersResponseDto,
  UserWithCountDto,
} from './dto/user-output.dto';
import { hashData } from '@shared/utils';
import { I18nService } from 'nestjs-i18n';
import { PaginationDto } from '@shared/dtos';
import { PageOption, PrismaParams } from 'prisma-paginator';
import { I18nTranslations } from '@generated/i18n.generated';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private i18n: I18nService<I18nTranslations>,
    private transactionService: TransactionService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    lang: string,
  ): Promise<CreateUserResponseDto> {
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
        createdAt: true,
      },
    });

    const balance = await this.transactionService.getUserBalance(user.id);

    return {
      data: { ...user, balance },
      message: this.i18n.translate('user.userCreated', { lang }),
    };
  }

  async findAll(paginationDto: PaginationDto): Promise<GetUsersResponseDto> {
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
        createdAt: true,
        _count: {
          select: {
            soloGames: true,
          },
        },
      },
    };

    const result = await this.prisma.paginate<UserWithCountDto>(
      'user',
      pageOption,
      prismaParams,
    );
    return {
      data: result.content,
      meta: result.metaData,
    };
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
        createdAt: true,
        _count: {
          select: {
            soloGames: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }
    const balance = await this.transactionService.getUserBalance(user.id);

    return { data: { ...user, balance } };
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
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        this.i18n.translate('user.userNotFound', { lang }),
      );
    }
    const balance = await this.transactionService.getUserBalance(user.id);

    return { data: { ...user, balance } };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    lang?: string,
  ): Promise<UpdateUserResponseDto> {
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
        createdAt: true,
        updatedAt: true,
      },
    });

    const balance = await this.transactionService.getUserBalance(id);

    return {
      data: { ...updatedUser, balance },
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

  async getUserWithGameStats(
    id: string,
    lang?: string,
  ): Promise<GetUserWithStatsResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        soloGames: {
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

    const balance = await this.transactionService.getUserBalance(user.id);

    const totalGames = user.soloGames.length;
    const wonGames = user.soloGames.filter(
      (game) => game.result === 'EXACT_MATCH' || game.result === 'HIGHER',
    ).length;
    const lostGames = totalGames - wonGames;
    const winRate = totalGames > 0 ? (wonGames / totalGames) * 100 : 0;

    const { soloGames, ...userWithoutHistory } = user;

    return {
      data: {
        balance,
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
