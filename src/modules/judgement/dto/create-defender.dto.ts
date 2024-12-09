import { IsString, IsUUID } from 'class-validator';

export class CreateDefenderDto {
  @IsUUID()
  conclusion: string;

  @IsString()
  iin: string;

  @IsString()
  name: string;
}
