import fs from 'fs';
import path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { entities, modules } from './modules';

export type DatabaseTypeOptions = 'postgres' | 'sqlite';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => {
          const env = process.env.NODE_ENV ?? 'development';
          const configurationPath = path.resolve(
            __dirname,
            `../src/configurations/${env}.json`,
          );
          return JSON.parse(fs.readFileSync(configurationPath, 'utf8'));
        },
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: configService.get<DatabaseTypeOptions>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: entities,
          migrations: ['src/database/migrations/*{.ts,.js}'],
          synchronize: configService.get<boolean>('database.synchronize'),
          dropSchema: configService.get<boolean>('database.dropSchema'),
          logging: true,
        };
      },
    }),
    ...modules,
  ],
})
export class AppModule {}
