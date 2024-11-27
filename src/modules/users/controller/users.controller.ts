import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OperationsController } from '../../../common/operations/controller/operations.controller';
import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@ApiTags('Users Controller')
@Controller('users')
@OperationsDtos({ create: CreateUserDTO, update: UpdateUserDTO })
export class UsersController extends OperationsController<User, CreateUserDTO> {
  @Inject(UsersService)
  service: UsersService;
}
