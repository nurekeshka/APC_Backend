import * as fs from 'fs';
import * as path from 'path';

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { swagger } from '../../configurations/swagger.json';
import { HttpExceptionFilter } from '../../middlewares/filters/http-exception.filter';
import { entities } from '../../modules';

export type DatabaseTypeOptions = 'postgres' | 'sqlite';

export class Bootstrapper {
  static setup(app: INestApplication) {
    this.setupLogger();
    this.setupGlobalPipes(app);
    this.setupSwagger(app);
    this.setupCors(app);
  }

  static setupCors(app: INestApplication) {
    app.enableCors({
      origin: 'http://localhost:4200',
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });
  }

  static get environment(): string {
    return process.env.NODE_ENV ?? 'development';
  }

  static setupLogger() {
    const logger = new Logger(Bootstrapper.name);
    logger.log(`Bootstrapping in ${Bootstrapper.environment} mode`);
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

  static setupConfiguration() {
    if (Bootstrapper.environment === 'development') {
      const path = Bootstrapper.resolveConfiguration('local');
      if (fs.existsSync(path)) return Bootstrapper.retrieveJSON(path);
    }

    const filepath = Bootstrapper.resolveConfiguration(
      Bootstrapper.environment,
    );

    return Bootstrapper.retrieveJSON(filepath);
  }

  static retrieveJSON(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  }

  static resolveConfiguration(name: string) {
    return path.resolve(__dirname, `../../configurations/${name}.json`);
  }

  static setupDatabase(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: config.get<DatabaseTypeOptions>('database.type'),
      host: config.get<string>('database.host'),
      port: config.get<number>('database.port'),
      username: config.get<string>('database.username'),
      password: config.get<string>('database.password'),
      database: config.get<string>('database.name'),
      entities: entities,
      migrations: ['src/database/migrations/*{.ts,.js}'],
      synchronize: config.get<boolean>('database.synchronize'),
      dropSchema: config.get<boolean>('database.dropSchema'),
      logging: true,
    };
  }

  static setupTestDatabase(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: config.get<DatabaseTypeOptions>('database.type'),
      database: config.get<string>('database.name'),
      dropSchema: config.get<boolean>('database.dropSchema'),
      synchronize: config.get<boolean>('database.synchronize'),
      entities,
    };
  }
}
