import { UserService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
export declare class UsersController {
    private readonly userService;
    userRepository: any;
    constructor(userService: UserService);
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    create(user: UserEntity): Promise<UserEntity>;
    update(id: number, user: UserEntity): Promise<UserEntity>;
    delete(id: number): Promise<void>;
    getUserWithLandsAndBills(userId: number): Promise<UserEntity>;
}
