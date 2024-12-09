import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateConclusionDto } from '../dto/create-conclusion.dto';
import { UpdateConclusionDto } from '../dto/update-conclusion.dto';
import { Conclusion } from '../entities/conclusion.entity';

@Injectable()
@OperationsEntity({ entity: Conclusion })
@OperationsDtos({ create: CreateConclusionDto, update: UpdateConclusionDto })
export class ConclusionService extends OperationsService<
  Conclusion,
  CreateConclusionDto
> {
  sortableColumns = [
    'actionResult',
    'position',
    'status',
    'region',
  ] as Column<Conclusion>[];
}
