import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUser(id: number): Promise<UserEntity>;
    getLandsByUserId(userId: number): Promise<LandEntity[]>;
}
