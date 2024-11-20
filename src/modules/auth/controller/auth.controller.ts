import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SignInDTO } from '../dto/sign-in.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Returns Access Token',
    example: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Email and Password mismatch',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  signIn(@Body() dto: SignInDTO) {
    return this.authService.signIn(dto.email, dto.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Returns Profile',
    example: {
      email: 'example@api.com',
      iat: 1732127822,
      exp: 1732131422,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Email and Password mismatch',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  getProfile(@Request() request: any) {
    return request.user;
  }
}
