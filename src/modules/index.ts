import { MailerModule } from '../common/mailer';
import { RedisModule } from '../common/redis';

import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { UserEntities } from './users/entities';
import { UsersModule } from './users/users.module';

export const entities = [...UserEntities];

export const modules = [
  UsersModule,
  AuthModule,
  DocumentsModule,
  RedisModule,
  MailerModule,
];
