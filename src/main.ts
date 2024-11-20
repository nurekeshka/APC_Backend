import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { cors as developmentCors } from './configurations/development.json';
import { cors as productionCors } from './configurations/production.json';
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

  const config = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swagger.path, app, document);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.enableCors({
      ...developmentCors,
      methods: developmentCors.methods.join(','),
    });
  } else if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      ...productionCors,
      methods: developmentCors.methods.join(','),
    });
  }

  await app.listen(6000);
}

bootstrap();
