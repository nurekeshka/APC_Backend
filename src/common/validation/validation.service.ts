import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// Это сервис для валидации чтобы после вручную валидировать на контроллерах

@Injectable()
export class ValidationService {
  async validate(clazz: any, body: any) {
    const instance = plainToInstance(clazz, body);
    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    const message: string[] = [];

    errors.forEach((error) => {
      message.push(...Object.values(error.constraints));
    });

    return { message, error: 'Bad Request', statusCode: 400 };
  }
}
