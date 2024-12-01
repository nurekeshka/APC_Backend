import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

import { MailerService } from './mailer.service';
import { TransporterService } from './mailer.types';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: TransporterService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return createTransport(
          {
            host: config.get<string>('mailer.host'),
            port: config.get<number>('mailer.port'),
            secure: config.get<boolean>('mailer.secure'),
            auth: {
              user: config.get<string>('mailer.username'),
              pass: config.get<string>('mailer.password'),
            },
          },
          {
            from: {
              name: 'No-reply',
              address: config.get<string>('mailer.from'),
            },
          },
        );
      },
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
