import {
  IsString,
  IsBoolean,
  IsNotEmpty
} from "class-validator";

import { Approval } from '../entities/approval.entity';
import { Called } from '../entities/called.entity';
import { Incident } from '../entities/incident.entity';
import { Defender } from '../entities/defender.entity';

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

  approvals: Approval[];

  called: Called[];

  incident: Incident[];

  defender: Defender[];
}
