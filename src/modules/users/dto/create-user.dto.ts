import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { RoleEnum, SexEnum } from '../enums/users.enums';

export class CreateUserDto {
  @ApiProperty({ example: 'example@api.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: 'male' })
  @IsEnum(SexEnum)
  sex: SexEnum;

  @ApiProperty({ example: 'employee' })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({ example: 'New York' })
  @IsString()
  region: string;

  @ApiProperty({ example: 'Strong123!' })
  @IsStrongPassword()
  password: string;
}
