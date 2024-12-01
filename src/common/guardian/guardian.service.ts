import {
  CanActivate,
  HttpException,
  HttpStatus,
  Injectable,
  Type,
} from '@nestjs/common';

@Injectable()
export class GuardianService {
  serve(guards: Type<CanActivate>[]) {
    if (
      guards.some((clazz) => {
        const guard = new clazz();
        return !guard.canActivate({} as never);
      })
    ) {
      throw new HttpException(
        {
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
