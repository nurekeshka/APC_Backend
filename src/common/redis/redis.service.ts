import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisKey, RedisValue } from 'ioredis';

import { RedisClient } from './redis.constants';

@Injectable()
export class RedisService {
  constructor(@Inject(RedisClient) private readonly client: Redis) {}

  async set(key: RedisKey, value: RedisValue, seconds?: number): Promise<void> {
    if (seconds) {
      await this.client.set(key, value, 'EX', seconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: RedisKey): Promise<RedisValue> {
    return this.client.get(key);
  }

  async del(key: RedisKey): Promise<void> {
    await this.client.del(key);
  }

  async ttl(key: RedisKey): Promise<number> {
    return this.client.ttl(key);
  }

  async exists(key: RedisKey): Promise<boolean> {
    return (await this.client.exists(key)) == 1;
  }
}
