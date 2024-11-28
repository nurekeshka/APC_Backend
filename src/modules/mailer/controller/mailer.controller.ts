import { Controller, Post, Body, Query } from '@nestjs/common';
import { MailerService } from '../service/mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-code')
  async sendVerificationCode(@Body('email') email: string): Promise<string> {
    const code = await this.mailerService.sendVerificationCode(email);
    return `Verification code sent to ${email}`;
  }

  @Post('verify-code')
  async verifyCode(
    @Query('email') email: string,
    @Body('code') code: string,
  ): Promise<string> {
    const isValid = await this.mailerService.verifyCode(email, code);
    if (isValid) {
      return 'Code verified successfully!';
    } else {
      return 'Invalid code!';
    }
  }
}
