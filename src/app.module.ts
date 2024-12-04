import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bootstrapper } from './common/bootstrapper/bootstrapper.service';
import { modules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Bootstrapper.setupConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: Bootstrapper.setupDatabase,
    }),
    ...modules,
  ],
})
export class AppModule {}
