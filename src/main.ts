import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Bootstrapper } from './common/bootstrapper/bootstrapper.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Bootstrapper.setup(app);
  await app.listen(8080);
}

bootstrap();
