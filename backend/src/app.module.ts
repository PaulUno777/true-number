import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { join } from 'path';
import { PrismaModule } from '@shared/prisma';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { UsersModule } from './users/users.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
    }),
    PrismaModule,
    AuthModule,
    GameModule,
    UsersModule,
    TransactionModule,
  ],
})
export class AppModule {}
