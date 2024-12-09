import { IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateCalledDto {
  @IsUUID()
  conclusion: string;

  @IsString()
  iin: string;

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

  @IsDateString()
  arrivedAt: string;

  @IsDateString()
  leftAt: string;

  @IsString()
  reason: string;
}
