import { CanActivate, Injectable } from '@nestjs/common';

import { Bootstrapper } from '../bootstrapper.service';

@Injectable()
export class DevelopmentModeOnly implements CanActivate {
  canActivate(): boolean {
    return ['development', 'test'].includes(Bootstrapper.environment);
  }
}
