import { Injectable } from '@nestjs/common';

@Injectable()
export class BillsService {
  private bills: Bill[] = [];

  createBill(billData: Bill): void {
    this.bills.push(billData);
  }

  getAllBills(): Bill[] {
    return this.bills;
  }

  getBillById(billId: string): Bill | undefined {
    return this.bills.find((bill) => bill.id === billId);
  }

  updateBill(billId: string, updatedData: Partial<Bill>): Bill | undefined {
    const billIndex = this.bills.findIndex((bill) => bill.id === billId);

    if (billIndex !== -1) {
      this.bills[billIndex] = { ...this.bills[billIndex], ...updatedData };
      return this.bills[billIndex];
    }

    return undefined;
  }

  deleteBill(billId: string): void {
    this.bills = this.bills.filter((bill) => bill.id !== billId);
  }
}

export interface Bill {
  id: string;
  amount: number;
  description: string;
  // Add more properties as needed
}
