import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'example@api.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Strong123!', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
