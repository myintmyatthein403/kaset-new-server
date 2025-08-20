import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base/base.controller';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
