import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('smtp.host'),
          port: configService.get<number>('smtp.port'),
          secure: configService.get<boolean>('smtp.secure'),
          auth: {
            user: configService.get<string>('smtp.auth.user'),
            pass: configService.get<string>('smtp.auth.pass'),
          },
        },
        defaults: {
          from: configService.get<string>('smtp.defaults.from'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailerConfigModule {}
