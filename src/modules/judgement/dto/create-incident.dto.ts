import{
  IsString,
} from "class-validator";

import { Conclusion } from '../entities/conclusion.entity';

export class CreateIncidentDto {

  conclusion: Conclusion;

  @IsString()
  registrationDate: string;

  @IsString()
  article: string;

  @IsString()
  solution: string;

  @IsString()
  description: string;
}
