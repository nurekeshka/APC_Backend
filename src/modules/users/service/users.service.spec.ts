import { OperationsServiceTestsFactory } from '../../../common/operations/service/operations.service.tests';
import { User } from '../entities/user.entity';

import { UsersService } from './users.service';

OperationsServiceTestsFactory(User, UsersService);
