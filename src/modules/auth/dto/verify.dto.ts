import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyDto {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(6)
  @MinLength(6)
  code: string;
}
