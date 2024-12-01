import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { swagger } from '../../configurations/swagger.json';
import { HttpExceptionFilter } from '../../middlewares/filters/http-exception.filter';

export class Bootstrapper {
  static setup(app: INestApplication) {
    this.setupLogger();
    this.setupGlobalPipes(app);
    this.setupSwagger(app);
  }

  static setupLogger() {
    const logger = new Logger(Bootstrapper.name);
    logger.log(
      `Bootstrapping in ${process.env.NODE_ENV ?? 'development'} mode`,
    );
  }

  static setupGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  static setupSwagger(app: INestApplication) {
    const builder = new DocumentBuilder()
      .setTitle(swagger.title)
      .setDescription(swagger.description)
      .setVersion(swagger.version)
      .addBearerAuth();

    swagger.servers.forEach((server) => {
      builder.addServer(server.link, server.title);
    });

    const config = builder.build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swagger.path, app, document);
  }

  static setupGlobalFilters(app: INestApplication) {
    app.useGlobalFilters(new HttpExceptionFilter());
  }
}
