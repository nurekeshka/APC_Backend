import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com', 
        port: 587,
        secure: false, 
        auth: {
          user: 'eserikova22@gmail.com', 
          pass: 'zokthaldgnrnfjtw',
        },
      },
      defaults: {
        from: '"Verification Service" <no-reply@example.com>',
      },
    }),
  ],
})
export class MailerConfigModule {}
