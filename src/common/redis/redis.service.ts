import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis, { RedisKey, RedisValue } from 'ioredis';

import { RedisClient } from './redis.constants';

@Injectable()
export class RedisService {
  @Inject(RedisClient) private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);

  async set(key: RedisKey, value: RedisValue, seconds?: number): Promise<void> {
    if (seconds) {
      this.logger.log(`SET ${key} ${value} EX ${seconds}`);
      await this.client.set(key, value, 'EX', seconds);
    } else {
      this.logger.log(`SET ${key} ${value}`);
      await this.client.set(key, value);
    }
  }

  async get(key: RedisKey): Promise<RedisValue> {
    this.logger.log(`GET ${key}`);
    return this.client.get(key);
  }

  async del(key: RedisKey): Promise<void> {
    this.logger.log(`DEL ${key}`);
    await this.client.del(key);
  }

  async ttl(key: RedisKey): Promise<number> {
    this.logger.log(`TTL ${key}`);
    return this.client.ttl(key);
  }

  async exists(key: RedisKey): Promise<boolean> {
    this.logger.log(`EXISTS ${key}`);
    return (await this.client.exists(key)) == 1;
  }
}
