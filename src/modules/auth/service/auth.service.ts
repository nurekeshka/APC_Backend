import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailerService } from '../../../common/mailer';
import { Template } from '../../../common/mailer/mailer.types';
import { RedisService } from '../../../common/redis';
import { UsersService } from '../../users/service/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { VerifyDto } from '../dto/verify.dto';

const prefix = 'verification_';

export interface UserInterface {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly mailer: MailerService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.users.findOneForAuth(email);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    if (await this.users.existsByEmail(dto.email))
      throw new HttpException(
        { message: 'User with this email address already exists.' },
        HttpStatus.BAD_REQUEST,
      );

    if (await this.redis.exists(`${prefix}${dto.email}`))
      throw new HttpException(
        { message: 'Verification is already in process' },
        HttpStatus.BAD_REQUEST,
      );

    const code = (Math.floor(Math.random() * 1_000_000) - 1).toString();

    await this.mailer.dispatch(
      Template.Verification,
      dto.email,
      'Your verification code',
      {
        name: dto.name,
        link: `http://localhost:8080/auth/verify?code=${code}`,
      },
    );

    await this.redis.set(
      `${prefix}${dto.email}`,
      JSON.stringify({ user: dto, code }),
    );

    return { message: 'Verification code was sent to your email' };
  }

  async verify(dto: VerifyDto) {
    if (!(await this.redis.exists(`${prefix}${dto.email}`)))
      throw new HttpException(
        { message: 'No active verification for that user' },
        HttpStatus.BAD_REQUEST,
      );

    const data = JSON.parse(
      (await this.redis.get(`${prefix}${dto.email}`)).toString(),
    ) as { user: SignUpDto; code: string };

    if (data.code !== dto.code)
      throw new HttpException(
        { message: "Validation code doesn't match" },
        HttpStatus.BAD_REQUEST,
      );

    return await this.users.create(data.user);
  }

  async profile(user: UserInterface) {
    const sub = user.sub;
    return { profile: await this.users.findOne(sub), jwt: user };
  }
}
