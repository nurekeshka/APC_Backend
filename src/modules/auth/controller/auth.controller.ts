import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignInDTO } from '../dto/sign-in.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() dto: SignInDTO) {
    return this.authService.signIn(dto.email, dto.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() request: any) {
    return request.user;
  }
}
