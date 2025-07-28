import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'Game bet (points to win/lose)',
    example: 100,
    minimum: 1,
    maximum: 1000,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(1000)
  bet: number;

  @ApiProperty({
    description: 'Thinking time per player in seconds',
    example: 30,
    minimum: 10,
    maximum: 300,
  })
  @IsInt()
  @IsPositive()
  @Min(10)
  @Max(300)
  thinkingTime: number;
}

export class JoinGameDto {
  @ApiProperty({
    description: 'ID of the game to join',
    example: '507f1f77bcf86cd799439011',
  })
  gameId: string;
}

export class PlayTurnDto {
  @ApiProperty({
    description: 'ID of the game',
    example: '507f1f77bcf86cd799439011',
  })
  gameId: string;
}
