import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JudgementEntities } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(JudgementEntities)],
})
export class JudgementModule {}
