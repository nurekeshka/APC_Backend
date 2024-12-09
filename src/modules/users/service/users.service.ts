import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
@OperationsEntity({ entity: User })
@OperationsDtos({ create: CreateUserDto, update: UpdateUserDto })
export class UsersService extends OperationsService<User, CreateUserDto> {
  sortableColumns = [
    'email',
    'name',
    'surname',
    'id',
    'region',
    'sex',
    'role',
  ] as Column<User>[];

  findOneForAuth(email: string) {
    return this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  existsByEmail(email: string) {
    return this.repository.exists({ where: { email } });
  }
}
