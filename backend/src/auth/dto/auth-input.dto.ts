import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsLogin } from '@shared/validators';
import { i18nValidationMessage as t } from 'nestjs-i18n';

export class RegisterDto {
  @ApiProperty({ example: 'pauluno', description: 'Username' })
  @IsString()
  @MinLength(3, {
    message: t('validation.usernameMinLength'),
  })
  @Transform(({ value }) => value?.trim())
  username: string;

  @ApiProperty({ example: 'abc@xyz.com', description: 'Email address' })
  @IsEmail({}, { message: t('validation.emailInvalid') })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Password (min 8 characters)',
  })
  @IsString()
  @MinLength(8, { message: t('validation.passwordMinLength') })
  password: string;

  @ApiProperty({ example: '+237650000000', description: 'Phone number' })
  @IsString()
  phone: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'abc@example.com or +237612345678',
    description: 'Email address or phone number',
  })
  @IsLogin({ message: t('validation.validLogin') })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  login: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString({ message: t('validation.passwordRequired') })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsString({ message: t('validation.stringRequired') })
  refreshToken: string;
}
