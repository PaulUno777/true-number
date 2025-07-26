import { Module } from '@nestjs/common';
import { MultiGameService } from './multi-game.service';
import { MultiGameController } from './multi-game.controller';
import { GameGateway } from './game.gateway';
import { SoloGameService } from './solo-game.service';
import { SoloGameController } from './solo-game.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  providers: [MultiGameService, GameGateway, SoloGameService],
  controllers: [MultiGameController, SoloGameController],
  exports: [MultiGameService, GameGateway, SoloGameService],
})
export class GameModule {}
