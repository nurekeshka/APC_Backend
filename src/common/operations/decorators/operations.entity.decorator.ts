import { SetMetadata } from '@nestjs/common';
import { EntityTarget } from 'typeorm';

export interface OperationsEntityParams {
  entity: EntityTarget<never>;
}

export const OperationsEntityParamsTitle = 'operations-entity';

// Это декоратор с помощью которого я передаю entity по которым он достает репозиторий

export const OperationsEntity = (params: OperationsEntityParams) =>
  SetMetadata(OperationsEntityParamsTitle, params);
