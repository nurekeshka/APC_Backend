import {
  IsString
} from "class-validator";

import { Conclusion } from '../entities/conclusion.entity';

export class DefenderDto {

  @IsString()
  iin: string;

  conclusion: Conclusion;

  @IsString()
  name: string;
}
