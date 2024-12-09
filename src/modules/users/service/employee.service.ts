import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';

@Injectable()
@OperationsEntity({ entity: Employee })
export class EmployeeService extends OperationsService<
  Employee,
  CreateEmployeeDto
> {
  sortableColumns = ['workplace'] as Column<Employee>[];
}
