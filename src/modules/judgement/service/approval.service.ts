import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateApprovalDto } from '../dto/create-approval.dto';
import { UpdateApprovalDto } from '../dto/update-approval.dto';
import { Approval } from '../entities/approval.entity';

@Injectable()
@OperationsEntity({ entity: Approval })
@OperationsDtos({ create: CreateApprovalDto, update: UpdateApprovalDto })
export class EmployeeService extends OperationsService<
  Approval,
  CreateApprovalDto
> {
  sortableColumns = ['name', 'position', 'date'] as Column<Approval>[];
}
