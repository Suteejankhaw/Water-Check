import { UserEntity, CollectorEntity, AdminEntity } from 'src/users/user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';
import { BillEntity } from 'src/bills/bill.entity/bill.entity';
import { Repository } from 'typeorm';
export declare class SeederService {
    private usersRepository;
    private collectorsRepository;
    private adminsRepository;
    private landsRepository;
    private billsRepository;
    constructor(usersRepository: Repository<UserEntity>, collectorsRepository: Repository<CollectorEntity>, adminsRepository: Repository<AdminEntity>, landsRepository: Repository<LandEntity>, billsRepository: Repository<BillEntity>);
    seed(): Promise<void>;
}
