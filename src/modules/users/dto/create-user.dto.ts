import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { RoleEnum, SexEnum } from '../enums/users.enums';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsString()
  region: string;

  @IsStrongPassword()
  password: string;
}
