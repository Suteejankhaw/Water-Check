import { LandEntity } from './land.entity/land.entity';
import { LandsService } from './lands.service';
export declare class LandsController {
    private readonly landService;
    constructor(landService: LandsService);
    findAll(): Promise<LandEntity[]>;
    findById(id: number): Promise<LandEntity>;
    create(land: LandEntity): Promise<LandEntity>;
    update(id: number, land: LandEntity): Promise<LandEntity>;
    delete(id: number): Promise<void>;
    findOneByIdWithUserAndBills(id: number): Promise<any>;
}
