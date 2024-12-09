import { IsString, IsUUID } from 'class-validator';

export class DefenderDto {
  @IsUUID()
  conclusion: string;

  @IsString()
  iin: string;

  @IsString()
  name: string;
}
