import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@generated/prisma';
import { getPaginatorFunc, PageOption, PrismaParams } from 'prisma-paginator';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly config: ConfigService) {
    super({
      errorFormat: 'pretty',
      datasourceUrl: config.get('DATABASE_URL'),
    });
  }

  paginate<T>(
    model: string,
    pageOption: PageOption,
    prismaParams?: PrismaParams,
  ) {
    const paginateWithClient = getPaginatorFunc(this);
    return paginateWithClient<T>(model, pageOption, prismaParams);
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
