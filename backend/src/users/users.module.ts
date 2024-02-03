import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AdminEntity, UserEntity, CollectorEntity } from './user.entity/user.entity';

@Module({
 imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([AdminEntity]), TypeOrmModule.forFeature([CollectorEntity])],
 exports: [TypeOrmModule],
 providers: [UsersService],
 controllers: [UsersController]
})
export class UsersModule {}
