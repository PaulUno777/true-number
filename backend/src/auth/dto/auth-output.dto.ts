import { Role } from '@generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'Message' })
  message: string;

  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'User information' })
  user: {
    id: string;
    username: string;
    email: string;
    role: Role;
    balance: number;
  };
}

export class LogoutResponseDto {
  @ApiProperty({ description: 'Logout message' })
  message: string;
}
