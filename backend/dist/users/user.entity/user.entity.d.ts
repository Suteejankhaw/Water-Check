import { BillEntity } from "src/bills/bill.entity/bill.entity";
import { LandEntity } from "src/lands/land.entity/land.entity";
export declare class UserEntity {
    id: number;
    username: string;
    password: string;
    fullname: string;
    phone_no: string;
    role: string;
    lands: LandEntity[];
}
export declare class CollectorEntity extends UserEntity {
    bill: BillEntity[];
}
export declare class AdminEntity extends UserEntity {
    bills: BillEntity[];
}
