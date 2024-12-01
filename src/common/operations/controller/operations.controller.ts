import {
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  OnModuleInit,
  Controller,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

import { GuardianService } from '../../guardian/guardian.service';
import { ValidationService } from '../../validation';
import {
  OperationsDtosParams,
  OperationsDtosParamsTitle,
} from '../decorators/operations.dtos.decorator';
import {
  OperationsGuardsParams,
  OperationsGuardsParamsTitle,
} from '../decorators/operations.guards.decorator';
import { OperationsService } from '../service/operations.service';

@Controller()
export abstract class OperationsController<T, D extends object>
  implements OnModuleInit
{
  private dtos: OperationsDtosParams<D, Partial<D>>;
  private guards: OperationsGuardsParams = {
    create: [],
    findOne: [],
    findAll: [],
    update: [],
    delete: [],
  };
  abstract service: OperationsService<T>;

  constructor(
    private readonly reflector: Reflector,
    private readonly validator: ValidationService,
    private readonly guardian: GuardianService,
  ) {}

  onModuleInit() {
    const params = this.reflector.get(
      OperationsDtosParamsTitle,
      this.constructor,
    );

    if (params) {
      this.dtos = params;
    } else {
      throw new Error('Data transfer objects metadata not found.');
    }

    const guards = this.reflector.get(
      OperationsGuardsParamsTitle,
      this.constructor,
    );

    if (guards) {
      for (const method of Object.keys(guards)) {
        this.guards[method] = guards[method] ?? [];
      }
    }
  }

  @Post()
  async create(@Body() dto: typeof this.dtos.create) {
    this.guardian.serve(this.guards.create);
    const errors = await this.validator.validate(this.dtos.create, dto);
    if (errors.message.length > 0) return errors;
    return this.service.create(dto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    this.guardian.serve(this.guards.findAll);
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.guardian.serve(this.guards.findOne);
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: typeof this.dtos.update) {
    this.guardian.serve(this.guards.update);
    const errors = await this.validator.validate(this.dtos.update, dto);
    if (errors.message.length > 0) return errors;
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.guardian.serve(this.guards.delete);
    return this.service.remove(id);
  }
}
