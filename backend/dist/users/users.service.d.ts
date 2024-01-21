import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findOne(id: number): Promise<UserEntity>;
    findLandsByUserId(id: number): Promise<LandEntity[]>;
}
