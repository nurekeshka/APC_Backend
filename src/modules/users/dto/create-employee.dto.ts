import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
  @IsUUID()
  user: string;

  @IsString()
  @IsNotEmpty()
  iin: string;

  @IsString()
  @IsNotEmpty()
  workplace: string;
}
