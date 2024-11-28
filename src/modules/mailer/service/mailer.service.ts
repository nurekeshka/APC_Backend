import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  private codes = new Map<string, string>();

  constructor(private readonly mailerService: NestMailerService) {}

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(email: string): Promise<string> {
    const code = this.generateCode();

    this.codes.set(email, code);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });
    
    return code;
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const storedCode = this.codes.get(email);
    if (!storedCode) {
      return false;
    }
    
    return storedCode === code;
  }
}
