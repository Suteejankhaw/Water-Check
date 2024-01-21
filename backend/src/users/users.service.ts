import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User not found with ID ${id}`);
      }

      return user;
    } catch (error) {
      throw new NotFoundException(`User not found with ID ${id}`);
    }
  }

  async findLandsByUserId(id: number): Promise<LandEntity[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id }, 
        relations: ['lands'] 
      });

      if (!user.lands) {
        throw new NotFoundException(`lands not found with userID ${id}`);
      }

      return user.lands;
    } catch (error) {
      throw new NotFoundException(`lands not found with userID ${id}`);
    }
  }
}
