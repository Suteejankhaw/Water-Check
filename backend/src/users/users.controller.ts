import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Get('lands/:userId')
  async getLandsByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<LandEntity[]> {
    return this.userService.findLandsByUserId(userId);
  }
}
