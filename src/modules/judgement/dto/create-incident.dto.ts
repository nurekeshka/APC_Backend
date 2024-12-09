import { IsString, IsUUID } from 'class-validator';

export class CreateIncidentDto {
  @IsUUID()
  conclusion: string;

  @IsString()
  registrationDate: string;

  @IsString()
  article: string;

  @IsString()
  solution: string;

  @IsString()
  description: string;
}
