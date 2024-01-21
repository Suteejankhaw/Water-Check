import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity/user.entity';

@Module({
 imports: [TypeOrmModule.forFeature([UserEntity])],
 providers: [UsersService],
 controllers: [UsersController]
})
export class UsersModule {}
