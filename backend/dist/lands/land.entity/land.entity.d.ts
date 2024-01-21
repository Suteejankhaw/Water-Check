import { BillEntity } from "src/bills/bill.entity/bill.entity";
import { UserEntity } from "src/users/user.entity/user.entity";
export declare class LandEntity {
    id: number;
    meter_no: string;
    bill: BillEntity[];
    user: UserEntity;
}
