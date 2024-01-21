export declare class BillsService {
    private bills;
    createBill(billData: Bill): void;
    getAllBills(): Bill[];
    getBillById(billId: string): Bill | undefined;
    updateBill(billId: string, updatedData: Partial<Bill>): Bill | undefined;
    deleteBill(billId: string): void;
}
interface Bill {
    id: string;
    amount: number;
    description: string;
}
export {};
