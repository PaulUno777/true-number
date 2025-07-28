import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class PlaySoloGameDto {
  @ApiProperty({
    description: 'Game bet (points to wager)',
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
    description: 'Number chosen by the player',
    example: 75,
    minimum: 20,
    maximum: 100,
  })
  @IsInt()
  @Min(20)
  @Max(100)
  chosenNumber: number;
}
