import { BillsService } from './bills.service';
import { BillEntity } from './bill.entity/bill.entity';
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
    findAll(): Promise<BillEntity[]>;
    findById(id: number): Promise<BillEntity>;
    create(bill: BillEntity): Promise<BillEntity>;
    update(id: number, bill: BillEntity): Promise<BillEntity>;
    delete(id: number): Promise<void>;
}
