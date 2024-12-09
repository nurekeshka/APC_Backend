import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';
import { FindOptionsRelations } from 'typeorm';

import { OperationsDtos } from '../../../common/operations/decorators/operations.dtos.decorator';
import { OperationsEntity } from '../../../common/operations/decorators/operations.entity.decorator';
import { OperationsService } from '../../../common/operations/service/operations.service';
import { CreateIncidentDto } from '../dto/create-incident.dto';
import { UpdateIncidentDto } from '../dto/update-incident.dto';
import { Incident } from '../entities/incident.entity';

@Injectable()
@OperationsEntity({ entity: Incident })
@OperationsDtos({ create: CreateIncidentDto, update: UpdateIncidentDto })
export class IncidentService extends OperationsService<
  Incident,
  CreateIncidentDto
> {
  sortableColumns = [
    'description',
    'solution',
    'registrationDate',
  ] as Column<Incident>[];
  relations = [] as FindOptionsRelations<Incident>;
}
