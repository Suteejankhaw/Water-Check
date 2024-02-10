import { Repository } from 'typeorm';
import { BillEntity } from './bill.entity/bill.entity';
export declare class BillsService {
    private readonly billRepository;
    constructor(billRepository: Repository<BillEntity>);
    findAll(): Promise<BillEntity[]>;
    findById(id: number): Promise<BillEntity>;
    create(bill: BillEntity): Promise<BillEntity>;
    update(id: number, bill: BillEntity): Promise<BillEntity>;
    delete(id: number): Promise<void>;
    createMultipleBills(billsData: Partial<BillEntity>[]): Promise<BillEntity[]>;
}
