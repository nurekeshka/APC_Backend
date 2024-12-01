import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

import { TransporterProverMockFactory } from '../../../test/utils/transporter.mock';

import { MailerService } from './mailer.service';
import { TransporterService } from './mailer.types';

const TransporterProviderFactory = {
  provide: TransporterService,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return config.get<boolean>('mailer.mock')
      ? TransporterProverMockFactory()
      : createTransport(
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
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TransporterProviderFactory, MailerService],
  exports: [MailerService],
})
export class MailerModule {}
