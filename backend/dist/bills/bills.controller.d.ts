import { BillsService } from './bills.service';
import { Bill } from './bills.service';
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
    getAllBills(): Bill[];
    getBillById(id: string): Bill | undefined;
    createBill(billData: any): string;
    updateBill(id: string, updatedData: any): "Bill updated successfully" | "Bill not found";
    deleteBill(id: string): string;
}
