import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PlayGameDto {
  @ApiProperty({
    description: 'Language preference for response messages',
    required: false,
    example: 'en',
  })
  @IsOptional()
  @IsString()
  lang?: string;
}

export class GetBalanceDto {
  @ApiProperty({
    description: 'Language preference for response messages',
    required: false,
    example: 'en',
  })
  @IsOptional()
  @IsString()
  lang?: string;
}

export class GetHistoryDto {
  @ApiProperty({
    description: 'Language preference for response messages',
    required: false,
    example: 'en',
  })
  @IsOptional()
  @IsString()
  lang?: string;
}

export class GetAllHistoryDto {
  @ApiProperty({
    description: 'Language preference for response messages',
    required: false,
    example: 'en',
  })
  @IsOptional()
  @IsString()
  lang?: string;
}

export class GetGlobalStatsDto {
  @ApiProperty({
    description: 'Language preference for response messages',
    required: false,
    example: 'en',
  })
  @IsOptional()
  @IsString()
  lang?: string;
}