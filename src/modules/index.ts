import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { UserEntities } from './users/entities';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';

export const entities = [...UserEntities];

export const modules = [UsersModule, AuthModule, DocumentsModule, MailerModule];
