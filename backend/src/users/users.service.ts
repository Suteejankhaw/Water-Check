import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UsersService {
 constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
 ) {}

 async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
 }

 async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({where: {id: id}});
 }

 async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
 }

 async update(id: number, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({where: {id: id}});
 }

 async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
 }

 async createMultipleUsers(usersData: Partial<UserEntity>[]): Promise<UserEntity[]> {
  const users = usersData.map((data) => this.userRepository.create(data));
  return this.userRepository.save(users);
}

async findUserWithLandsAndBills(userId: number): Promise<UserEntity> {
   return this.userRepository
     .createQueryBuilder('user')
     .leftJoinAndSelect('user.lands', 'land')
     .leftJoinAndSelect('land.bill', 'bill')
     .where('user.id = :userId', { userId })
     .getOne();
 }
}
