import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() body: any) {
    return this.userService.register(body);
  }

  @Post('subscription')
  subscription(@Body() body: any) {
    return this.userService.subscription(body);
  }
}
