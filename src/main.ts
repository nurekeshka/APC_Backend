import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { swagger } from './configurations/swagger.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const builder = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addBearerAuth();

  for (const server of swagger.servers) {
    builder.addServer(server.link, server.title);
  }

  const config = builder.build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swagger.path, app, document);

  await app.listen(8080);
}

bootstrap();
