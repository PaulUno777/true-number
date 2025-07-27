import { Role } from '@generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'Phone number' })
  phone: string;

  @ApiProperty({ enum: Role, description: 'User role' })
  role: Role;

  @ApiProperty({ description: 'User balance' })
  balance: number;

  @ApiProperty({ description: 'Account creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', required: false })
  updatedAt?: Date;
}

export class UserWithCountDto extends UserDto {
  @ApiProperty({ description: 'Game count information' })
  _count: {
    gameHistory: number;
  };
}

export class UserStatsDto {
  @ApiProperty({ description: 'Total games played' })
  totalGames: number;

  @ApiProperty({ description: 'Total won games' })
  wonGames: number;

  @ApiProperty({ description: 'Total lost games' })
  lostGames: number;

  @ApiProperty({ description: 'Win rate percentage' })
  winRate: number;
}

export class UserWithStatsDto extends UserDto {
  @ApiProperty({ type: UserStatsDto, description: 'User game statistics' })
  stats: UserStatsDto;
}

export class GetUserResponseDto {
  @ApiProperty({ type: UserDto, description: 'User data' })
  data: UserDto;

  @ApiProperty({ description: 'Response message', required: false })
  message?: string;
}

export class GetUserWithStatsResponseDto {
  @ApiProperty({ type: UserWithStatsDto, description: 'User data with stats' })
  data: UserWithStatsDto;

  @ApiProperty({ description: 'Response message', required: false })
  message?: string;
}

export class GetUsersResponseDto {
  @ApiProperty({ type: [UserWithCountDto], description: 'Users list' })
  data: UserWithCountDto[];

  @ApiProperty({ description: 'Pagination meta information' })
  meta: {
    page: number;
    size: number;
    totalPages: number;
    totalCount: number;
  };

  @ApiProperty({ description: 'Response message', required: false })
  message?: string;
}

export class CreateUserResponseDto {
  @ApiProperty({ type: UserDto, description: 'Created user data' })
  data: UserDto;

  @ApiProperty({ description: 'Response message' })
  message: string;
}

export class UpdateUserResponseDto {
  @ApiProperty({ type: UserDto, description: 'Updated user data' })
  data: UserDto;

  @ApiProperty({ description: 'Response message' })
  message: string;
}

export class DeleteUserResponseDto {
  @ApiProperty({ description: 'Response message' })
  message: string;
}

export class TopPlayerDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'User balance' })
  balance: number;

  @ApiProperty({ description: 'Total games played' })
  totalGames: number;

  @ApiProperty({ description: 'Total won games' })
  wonGames: number;

  @ApiProperty({ description: 'Win rate percentage' })
  winRate: number;

  @ApiProperty({ enum: Role, description: 'User role' })
  role: Role;

  @ApiProperty({ description: 'Account creation date' })
  createdAt: Date;
}

export class GetTopPlayersResponseDto {
  @ApiProperty({ type: [TopPlayerDto], description: 'Top players list' })
  data: TopPlayerDto[];

  @ApiProperty({ description: 'Response message', required: false })
  message?: string;
}