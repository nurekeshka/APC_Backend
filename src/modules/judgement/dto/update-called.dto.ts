import { PartialType } from '@nestjs/swagger';

import { CreateCalledDto } from './create-called.dto';

export class UpdateCalledDto extends PartialType(CreateCalledDto) {}
