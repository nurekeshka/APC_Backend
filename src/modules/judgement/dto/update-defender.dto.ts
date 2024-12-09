import { PartialType } from '@nestjs/swagger';

import { CreateDefenderDto } from './create-defender.dto';

export class UpdateDefenderDto extends PartialType(CreateDefenderDto) {}
