import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DevelopmentModeOnly } from '../../../common/bootstrapper/guards/development.guard';
import { OperationsController } from '../../../common/operations/controller/operations.controller';
import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsGuards } from '../../../common/operations/decorators/operations.guards.decorator';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@ApiTags('Users Controller')
@Controller('users')
@OperationsDtos({ create: CreateUserDTO, update: UpdateUserDTO })
@OperationsGuards({
  create: [DevelopmentModeOnly],
  update: [DevelopmentModeOnly],
  delete: [DevelopmentModeOnly],
})
export class UsersController extends OperationsController<User, CreateUserDTO> {
  @Inject(UsersService)
  service: UsersService;
}
