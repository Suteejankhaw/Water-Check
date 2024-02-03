import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillEntity } from './bill.entity/bill.entity';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get()
  async findAll(): Promise<BillEntity[]> {
     return this.billsService.findAll();
  }
 
  @Get(':id')
  async findById(@Param('id') id: number): Promise<BillEntity> {
     const bill = await this.billsService.findById(id);
     if (!bill) {
       throw new NotFoundException(`Bill with ID ${id} not found.`);
     }
     return bill;
  }
 
  @Post()
  async create(@Body() bill: BillEntity): Promise<BillEntity> {
     return this.billsService.create(bill);
  }
 
  @Put(':id')
  async update(@Param('id') id: number, @Body() bill: BillEntity): Promise<BillEntity> {
     return this.billsService.update(id, bill);
  }
 
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
     await this.billsService.delete(id);
  }
 
}
