import { IsString, IsUUID } from 'class-validator';

export class CreateApprovalDto {
  @IsUUID()
  conclusion: string;

  @IsString()
  position: string;

  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  date: string;

  @IsString()
  rejectionReason: string;
}
