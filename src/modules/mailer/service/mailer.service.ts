import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { RedisService } from '../../../common/redis/redis.service';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: NestMailerService,
    private readonly redisService: RedisService
  ) {}

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(email: string): Promise<string> {
    const code = this.generateCode();

    await this.redisService.set(`verification_code_${email}`, code, 300);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });
    
    return code;
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const storedCode = await this.redisService.get(`verification_code_${email}`);
    return storedCode === code;
  }
}
