import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';

import { PaginationService } from '../../../common/pagination/pagination.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly paginationService: PaginationService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDTO) {
    return this.usersRepository.save(dto);
  }

  findAll(query: PaginateQuery) {
    return this.paginationService.paginate<User>(query, this.usersRepository, {
      sortableColumns: [
        'email',
        'name',
        'surname',
        'id',
        'region',
        'sex',
        'role',
      ],
    });
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: string, dto: UpdateUserDTO) {
    return this.usersRepository.update(id, dto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
