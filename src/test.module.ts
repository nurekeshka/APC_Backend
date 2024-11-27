import fs from 'fs';
import path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseTypeOptions } from './app.module';
import { PaginationService } from './common/pagination/pagination.service';
import { database } from './configurations/test.json';
import { entities } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => {
          const configurationPath = path.resolve(
            __dirname,
            'configurations/test.json',
          );
          return JSON.parse(fs.readFileSync(configurationPath, 'utf8'));
        },
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: database.type as DatabaseTypeOptions,
      database: database.name,
      dropSchema: database.dropSchema,
      synchronize: database.synchronize,
      entities,
    }),
  ],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class TestAppModule {}
