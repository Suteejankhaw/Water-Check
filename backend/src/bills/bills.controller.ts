import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BillsService } from './bills.service';
import { Bill } from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get()
  getAllBills(): Bill[] {
    return this.billsService.getAllBills();
  }

  @Get(':id')
  getBillById(@Param('id') id: string): Bill | undefined {
    return this.billsService.getBillById(id);
  }

  @Post()
  createBill(@Body() billData: any) {
    this.billsService.createBill(billData);
    return 'Bill created successfully';
  }

  @Put(':id')
  updateBill(@Param('id') id: string, @Body() updatedData: any) {
    const updatedBill = this.billsService.updateBill(id, updatedData);

    if (updatedBill) {
      return 'Bill updated successfully';
    } else {
      return 'Bill not found';
    }
  }

  @Delete(':id')
  deleteBill(@Param('id') id: string) {
    this.billsService.deleteBill(id);
    return 'Bill deleted successfully';
  }
}

