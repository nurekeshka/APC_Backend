import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuardianService } from '../../common/guardian';
import { PaginationService } from '../../common/pagination/pagination.service';
import { ValidationService } from '../../common/validation';

import { EmployeeController } from './controller/employee.controller';
import { UsersController } from './controller/users.controller';
import { UserEntities } from './entities';
import { EmployeeService } from './service/employee.service';
import { UsersService } from './service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature(UserEntities)],
  controllers: [UsersController, EmployeeController],
  providers: [
    UsersService,
    EmployeeService,
    PaginationService,
    ValidationService,
    GuardianService,
  ],
  exports: [UsersService, EmployeeService],
})
export class UsersModule {}
