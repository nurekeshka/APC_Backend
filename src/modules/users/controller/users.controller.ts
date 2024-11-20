import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UsersService } from '../service/users.service';

@ApiTags('Users Controller')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    example: {
      name: 'John',
      surname: 'Doe',
      email: 'example@api.com',
      sex: 'male',
      role: 'employee',
      region: 'New York',
    },
  })
  @ApiResponse({
    status: 400,
    example: {
      message: [
        'email must be an email',
        'name should not be empty',
        'name must be a string',
        'surname should not be empty',
        'surname must be a string',
        'sex must be one of the following values: male, female',
        'role must be one of the following values: employee, analytics, moderator',
        'region must be a string',
        'password is not strong enough',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  create(@Body() dto: CreateUserDTO) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    example: [
      {
        name: 'John',
        surname: 'Doe',
        email: 'example@api.com',
        sex: 'male',
        role: 'employee',
        region: 'New York',
      },
    ],
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    example: {
      name: 'John',
      surname: 'Doe',
      email: 'example@api.com',
      sex: 'male',
      role: 'employee',
      region: 'New York',
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    example: {
      raw: [],
      affected: 1,
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    example: {
      raw: [],
      affected: 1,
    },
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
