import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty
} from "class-validator";

import { Conclusion } from '../entities/conclusion.entity';

export class CalledDto {

  
  conclusion: Conclusion;

  @ApiProperty({example: '010203441570'})
  @IsString()
  iin: string;

  @ApiProperty({example: 'John'})
  @IsString()
  name: string;

  @IsString()
  pensionIin: string;

  @IsString()
  workplace: string;

  @IsString()
  lastCall: string;

  @IsString()
  caller: string;

  @IsString()
  status: string;

  //Дата как строка
  @IsString()
  arrivedAt: string;
  //Дата как строка
  @IsString()
  leftAt: string;

  @IsString()
  reason: string;
}
