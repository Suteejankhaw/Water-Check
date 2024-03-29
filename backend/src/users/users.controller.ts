import { Body, Delete, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
 constructor(private readonly userService: UsersService) {}

 @Get()
 async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
 }

 @Get(':id')
 async findById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
 }

 @Post()
 async create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
 }

 @Put(':id')
 async update(@Param('id') id: number, @Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.update(id, user);
 }

 @Delete(':id')
 async delete(@Param('id') id: number): Promise<void> {
    await this.userService.delete(id);
 }

 @Get(':id/lands-and-bills')
 async getUserWithLandsAndBills(@Param('id') userId: number): Promise<UserEntity> {
   return this.userService.findUserWithLandsAndBills(userId);
 }

}
