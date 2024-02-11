import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    create(user: UserEntity): Promise<UserEntity>;
    update(id: number, user: UserEntity): Promise<UserEntity>;
    delete(id: number): Promise<void>;
    createMultipleUsers(usersData: Partial<UserEntity>[]): Promise<UserEntity[]>;
    findUserWithLandsAndBills(userId: number): Promise<UserEntity>;
}
