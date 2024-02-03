import { LandEntity } from './land.entity/land.entity';
import { LandService } from './lands.service';
export declare class LandController {
    private readonly landService;
    constructor(landService: LandService);
    findAll(): Promise<LandEntity[]>;
    findById(id: number): Promise<LandEntity>;
    create(land: LandEntity): Promise<LandEntity>;
    update(id: number, land: LandEntity): Promise<LandEntity>;
    delete(id: number): Promise<void>;
}
