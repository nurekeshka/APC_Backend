import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import RedisMock from 'ioredis-mock';

import { RedisClient } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: RedisClient,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<boolean>('redis.mock')
          ? new RedisMock()
          : new Redis({
              host: config.get<string>('redis.host'),
              port: config.get<number>('redis.port'),
            });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
