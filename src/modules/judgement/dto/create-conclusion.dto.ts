import { IsString, IsBoolean } from 'class-validator';

export class CreateConclusionDto {
  @IsString()
  registrationDate: string;

  @IsString()
  position: string;

  @IsString()
  region: string;

  @IsString()
  plannedActions: string;

  @IsString()
  eventDate: string;

  @IsString()
  eventPlace: string;

  @IsString()
  investigator: string;

  @IsString()
  status: string;

  @IsString()
  eventRelation: string;

  @IsString()
  investigationType: string;

  @IsBoolean()
  isBusinessRelated: boolean;

  @IsString()
  justification: string;

  @IsString()
  actionResult: string;
}
