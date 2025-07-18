import { Role } from '@generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'Username' })
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value?.trim())
  username: string;

  @ApiProperty({ example: 'abc@xyz.com', description: 'Email address' })
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+237650000000', description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ enum: Role, default: Role.CLIENT, description: 'User role' })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.CLIENT;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Username',
    required: false,
  })
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  username?: string;

  @ApiProperty({
    example: 'abc@xyz.com',
    description: 'Email address',
    required: false,
  })
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '+237650000000',
    description: 'Phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: Role, description: 'User role', required: false })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
