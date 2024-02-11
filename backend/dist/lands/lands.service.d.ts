import { Repository } from 'typeorm';
import { LandEntity } from './land.entity/land.entity';
export declare class LandsService {
    private readonly landRepository;
    constructor(landRepository: Repository<LandEntity>);
    findAll(): Promise<LandEntity[]>;
    findById(id: number): Promise<LandEntity>;
    create(land: LandEntity): Promise<LandEntity>;
    update(id: number, land: LandEntity): Promise<LandEntity>;
    delete(id: number): Promise<void>;
    createMultipleLands(landsData: Partial<LandEntity>[]): Promise<LandEntity[]>;
    findOneByIdWithUserAndBills(id: number): Promise<LandEntity | undefined>;
}
