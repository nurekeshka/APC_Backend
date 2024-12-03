import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bootstrapper } from './common/bootstrapper/bootstrapper.service';
import { GuardianService } from './common/guardian';
import { PaginationService } from './common/pagination/pagination.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Bootstrapper.setupConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: Bootstrapper.setupTestDatabase,
    }),
  ],
  providers: [PaginationService, GuardianService],
  exports: [PaginationService, GuardianService],
})
export class TestAppModule {}
