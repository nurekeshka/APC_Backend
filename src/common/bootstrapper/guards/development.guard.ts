import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class DevelopmentModeOnly implements CanActivate {
  canActivate(): boolean {
    const env = process.env.NODE_ENV ?? 'development';
    return env === 'development' || env === 'test';
  }
}
