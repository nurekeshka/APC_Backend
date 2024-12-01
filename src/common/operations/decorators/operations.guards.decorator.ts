import { CanActivate, SetMetadata, Type } from '@nestjs/common';

type GuardInput = Type<CanActivate>;

export interface OperationsGuardsParams {
  create: GuardInput[];
  findOne: GuardInput[];
  findAll: GuardInput[];
  update: GuardInput[];
  delete: GuardInput[];
}

export const OperationsGuardsParamsTitle = 'operations-guards';

export const OperationsGuards = (params: Partial<OperationsGuardsParams>) =>
  SetMetadata(OperationsGuardsParamsTitle, params);
