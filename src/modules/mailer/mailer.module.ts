import { Module } from '@nestjs/common';
import { MailerService } from './service/mailer.service'; 
import { MailerController } from './controller/mailer.controller'; 
import { MailerConfigModule } from './config/mailer.config';

@Module({
  imports: [MailerConfigModule], 
  providers: [MailerService],
  controllers: [MailerController], 
  exports: [MailerService],
})
export class MailerModule {}
