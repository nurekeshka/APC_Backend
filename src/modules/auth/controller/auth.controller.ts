import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    example: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
  })
  @ApiResponse({
    status: 401,
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    example: {
      email: 'example@api.com',
      iat: 1732127822,
      exp: 1732131422,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  getProfile(@Request() request: any) {
    return request.user;
  }
}
