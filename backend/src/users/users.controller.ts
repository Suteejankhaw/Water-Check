import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';

@Controller('users')
export class UsersController {
    userRepository: any;

    constructor(private userService: UsersService) { }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
      return this.userService.findOne(id);
    }  
}