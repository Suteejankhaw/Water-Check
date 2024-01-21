import { LandEntity } from "src/lands/land.entity/land.entity";
import { UserEntity } from "src/users/user.entity/user.entity";
export declare class BillEntity {
    id: number;
    cost_value: string;
    unit_value: string;
    month: string;
    dateTime: Date;
    land: LandEntity;
    collector: UserEntity;
}
