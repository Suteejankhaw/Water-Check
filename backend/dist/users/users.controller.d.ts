import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    create(user: UserEntity): Promise<UserEntity>;
    update(id: number, user: UserEntity): Promise<UserEntity>;
    delete(id: number): Promise<void>;
}
