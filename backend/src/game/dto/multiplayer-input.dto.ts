import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'Mise de la partie (points à gagner/perdre)',
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
    description: 'Temps de réflexion par joueur en secondes',
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
    description: 'ID de la partie à rejoindre',
    example: '507f1f77bcf86cd799439011',
  })
  gameId: string;
}

export class PlayTurnDto {
  @ApiProperty({
    description: 'ID de la partie',
    example: '507f1f77bcf86cd799439011',
  })
  gameId: string;
}