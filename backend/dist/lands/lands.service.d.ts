import { Repository } from 'typeorm';
import { LandEntity } from './land.entity/land.entity';
export declare class LandService {
    private readonly landRepository;
    constructor(landRepository: Repository<LandEntity>);
    findOne(id: number): Promise<LandEntity>;
}
