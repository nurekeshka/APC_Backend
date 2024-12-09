import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DevelopmentModeOnly } from '../../../common/bootstrapper/guards/development.guard';
import { OperationsController } from '../../../common/operations/controller/operations.controller';
import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsGuards } from '../../../common/operations/decorators/operations.guards.decorator';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';
import { EmployeeService } from '../service/employee.service';

@ApiTags('Employee Controller')
@Controller('employees')
@OperationsDtos({ create: CreateEmployeeDto, update: UpdateEmployeeDto })
@OperationsGuards({
  create: [DevelopmentModeOnly],
  update: [DevelopmentModeOnly],
  delete: [DevelopmentModeOnly],
})
export class EmployeeController extends OperationsController<
  Employee,
  CreateEmployeeDto
> {
  @Inject(EmployeeService)
  service: EmployeeService;
}
