import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from '../service/mailer.service';
import { CreateVerificationDto } from '../dto/create-verification.dto';
import { CompleteVerificationDto } from '../dto/complete-verification.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-code')
  async sendVerificationCode(
    @Body() createVerificationDto: CreateVerificationDto,
  ): Promise<string> {
    const { email } = createVerificationDto;
    await this.mailerService.sendVerificationCode(email);
    return `Verification code sent to ${email}`;
  }

  @Post('verify-code')
  async verifyCode(
    @Body() completeVerificationDto: CompleteVerificationDto,
  ): Promise<string> {
    const { email, code } = completeVerificationDto;
    const isValid = await this.mailerService.verifyCode(email, code);
    return isValid ? 'Code verified successfully!' : 'Invalid code!';
  }
}
