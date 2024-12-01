import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailerService } from '../../../common/mailer';
import { Template } from '../../../common/mailer/mailer.types';
import { RedisService } from '../../../common/redis';
import { UsersService } from '../../users/service/users.service';
import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
    private readonly mailer: MailerService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneForAuth(email);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    if (await this.usersService.existsByEmail(dto.email))
      throw new HttpException(
        'Users with this email address already exists.',
        400,
      );

    await this.mailer.dispatch(
      Template.Verification,
      dto.email,
      'Your verification code',
      {
        name: dto.name,
        link: `http://localhost:8080/auth/verify?code=${'123456'}`,
      },
    );

    await this.redis.set(`verification_${dto.email}`, JSON.stringify(dto));

    return { message: 'Sent' };
  }
}
