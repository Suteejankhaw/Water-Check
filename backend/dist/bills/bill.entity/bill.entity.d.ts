import { LandEntity } from "src/lands/land.entity/land.entity";
import { UserEntity } from "src/users/user.entity/user.entity";
export declare class BillEntity {
    id: number;
    cost_value: number;
    unit_value: number;
    month: string;
    dateTime: Date;
    land: LandEntity;
    collector: UserEntity;
}
