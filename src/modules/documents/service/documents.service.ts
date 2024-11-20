import { Injectable } from '@nestjs/common';
import { CreateDocumentDTO } from '../dto/create-document.dto';
import { UpdateDocumentDTO } from '../dto/update-document.dto';

@Injectable()
export class DocumentsService {
  create(createDocumentDto: CreateDocumentDTO) {
    return 'This action adds a new document';
  }

  findAll() {
    return `This action returns all documents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDTO) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
