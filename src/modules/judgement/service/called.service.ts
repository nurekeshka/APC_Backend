import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateCalledDto } from '../dto/create-called.dto';
import { UpdateCalledDto } from '../dto/update-called.dto';
import { Called } from '../entities/called.entity';

@Injectable()
@OperationsEntity({ entity: Called })
@OperationsDtos({ create: CreateCalledDto, update: UpdateCalledDto })
export class CalledService extends OperationsService<Called, CreateCalledDto> {
  sortableColumns = [
    'arrivedAt',
    'caller',
    'name',
    'workplace',
  ] as Column<Called>[];
}
