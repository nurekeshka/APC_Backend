import { Module } from '@nestjs/common';
import { DocumentsService } from './service/documents.service';
import { DocumentsController } from './controller/documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
