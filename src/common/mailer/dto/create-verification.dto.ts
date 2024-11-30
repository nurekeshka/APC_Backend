import { IsEmail } from 'class-validator';

export class CreateVerificationDto {
  @IsEmail()
  email: string;
}