import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  paginate,
  PaginateConfig,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';

export interface DefaultPagination
  extends Pick<
    PaginateConfig<never>,
    | 'loadEagerRelations'
    | 'withDeleted'
    | 'paginationType'
    | 'relativePath'
    | 'origin'
    | 'ignoreSearchByInQueryParam'
    | 'ignoreSelectInQueryParam'
    | 'defaultLimit'
    | 'maxLimit'
    | 'nullSort'
  > {}

@Injectable()
export class PaginationService {
  private readonly config: DefaultPagination;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<DefaultPagination>('pagination');
  }

  paginate<T>(
    query: PaginateQuery,
    repository: Repository<T>,
    configuration: PaginateConfig<T>,
  ): Promise<Paginated<T>> {
    return paginate<T>(query, repository, {
      ...this.config,
      ...configuration,
    });
  }
}
