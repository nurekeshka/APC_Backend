import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { swagger } from '../../configurations/swagger.json';
import { ErrorsFilter } from '../../middlewares/filters/errors.filter';

export class Bootstrapper {
  static setup(app: INestApplication) {
    this.setupGlobalFilters(app);
    this.setupGlobalPipes(app);
    this.setupSwagger(app);
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
    app.useGlobalFilters(new ErrorsFilter());
  }
}
