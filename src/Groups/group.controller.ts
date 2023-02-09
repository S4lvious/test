import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly userService: GroupService) {}

  @Post('createGroup')
  create(@Body() body: any) {
    return this.userService.create(body);
  }
}
