import { LandEntity } from './land.entity/land.entity';
import { LandService } from './lands.service';
export declare class LandController {
    private readonly landService;
    constructor(landService: LandService);
    getLand(id: number): Promise<LandEntity>;
}
