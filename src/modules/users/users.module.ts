import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaginationService } from '../../common/pagination/pagination.service';
import { ValidationService } from '../../common/validation';

import { UsersController } from './controller/users.controller';
import { UserEntities } from './entities';
import { UsersService } from './service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature(UserEntities)],
  controllers: [UsersController],
  providers: [UsersService, PaginationService, ValidationService],
  exports: [UsersService],
})
export class UsersModule {}
