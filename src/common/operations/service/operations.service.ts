import { Injectable, OnModuleInit } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Column, RelationColumn } from 'nestjs-paginate/lib/helper';
import { Repository, DataSource, FindOptionsRelations } from 'typeorm';

import { PaginationService } from '../../pagination';
import {
  OperationsDtosParams,
  OperationsDtosParamsTitle,
} from '../decorators/operations.dtos.decorator';
import {
  OperationsEntityParams,
  OperationsEntityParamsTitle,
} from '../decorators/operations.entity.decorator';

@Injectable()
export abstract class OperationsService<T, D extends object>
  implements OnModuleInit
{
  abstract sortableColumns: Column<T>[];
  relations: FindOptionsRelations<T> | RelationColumn<T>[] = [];

  private dtos: OperationsDtosParams<D, Partial<D>>;

  protected repository: Repository<T>;

  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
    private readonly pagination: PaginationService,
  ) {}

  onModuleInit() {
    const entities = this.reflector.get<OperationsEntityParams>(
      OperationsEntityParamsTitle,
      this.constructor,
    );

    if (entities) {
      const { entity } = entities;
      this.repository = this.dataSource.getRepository<T>(entity);
    } else {
      throw new Error('Entity metadata not found.');
    }

    const dtos = this.reflector.get(
      OperationsDtosParamsTitle,
      this.constructor,
    );

    if (dtos) {
      this.dtos = dtos;
    } else {
      throw new Error('Data transfer objects metadata not found.');
    }
  }

  create(dto: typeof this.dtos.create): Promise<T> {
    const entity = this.repository.create(dto as never) as T;
    return this.repository.save(entity);
  }

  findAll(query: PaginateQuery): Promise<Paginated<T>> {
    return this.pagination.paginate<T>(query, this.repository, {
      sortableColumns: this.sortableColumns,
      relations: this.relations,
    });
  }

  findOne(id: string): Promise<T | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    } as any);
  }

  async update(
    id: string,
    dto: typeof this.dtos.update,
  ): Promise<T | undefined> {
    await this.repository.update(id, dto as never);
    return this.findOne(id);
  }

  async remove(id: string): Promise<T | undefined> {
    const entity = await this.findOne(id);
    await this.repository.delete(id);
    return entity;
  }
}
