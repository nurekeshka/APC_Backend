import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from "class-validator";

import { Conclusion } from '../entities/conclusion.entity';

export class CreateApprovalDto {
  conclusion: Conclusion;

  @ApiProperty({example : ""})
  @IsString()
  position: string;
  
  @ApiProperty({example : "John"})
  @IsString()
  name: string;
  
  @ApiProperty({example : "Согласовано"})
  @IsString()
  status: string;

  @IsString()
  date: string;
  
  @IsString()
  rejectionReason: string;
}
