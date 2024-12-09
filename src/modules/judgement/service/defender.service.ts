import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateDefenderDto } from '../dto/create-defender.dto';
import { UpdateDefenderDto } from '../dto/update-defender.dto';
import { Defender } from '../entities/defender.entity';

@Injectable()
@OperationsEntity({ entity: Defender })
@OperationsDtos({ create: CreateDefenderDto, update: UpdateDefenderDto })
export class DefenderService extends OperationsService<
  Defender,
  CreateDefenderDto
> {
  sortableColumns = ['name'] as Column<Defender>[];
}
