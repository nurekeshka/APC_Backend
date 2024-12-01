import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailerService } from '../../../common/mailer';
import { RedisService } from '../../../common/redis';
import { UsersService } from '../../users/service/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { VerifyDto } from '../dto/verify.dto';

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
        'User with this email address already exists.',
        400,
      );

    const code = '123456';

    // await this.mailer.dispatch(
    //   Template.Verification,
    //   dto.email,
    //   'Your verification code',
    //   {
    //     name: dto.name,
    //     link: `http://localhost:8080/auth/verify?code=${code}`,
    //   },
    // );

    await this.redis.set(
      `verification_${dto.email}`,
      JSON.stringify({ user: dto, code }),
    );

    return { message: 'Sent' };
  }

  async verify(dto: VerifyDto) {
    if (!(await this.redis.exists(`verification_${dto.email}`)))
      throw new HttpException('No active verification for that user', 400);

    const data = JSON.parse(
      (await this.redis.get(`verification_${dto.email}`)) as string,
    );
    const user = data.user as SignUpDto;
    const code = data.code as string;

    console.log(user);
    console.log(code);

    if (code !== dto.code)
      throw new HttpException("Validation code doesn't match", 400);

    return await this.usersService.create(user);
  }
}
