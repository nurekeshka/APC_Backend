import { AuthModule } from './auth/auth.module';
import { UserEntities } from './users/entities';
import { UsersModule } from './users/users.module';

export const entities = [...UserEntities];

export const modules = [UsersModule, AuthModule];