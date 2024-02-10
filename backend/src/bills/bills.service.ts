import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillEntity } from './bill.entity/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillEntity)
    private readonly billRepository: Repository<BillEntity>,
  ) {}

  async findAll(): Promise<BillEntity[]> {
    return this.billRepository.find({
      relations: ['land', 'collector'],
    });
  }

  async findById(id: number): Promise<BillEntity> {
    return this.billRepository.findOne({
      where: {id: id},
      relations: ['land', 'collector'],
    });
 }

 async create(bill: BillEntity): Promise<BillEntity> {
    return this.billRepository.save(bill);
 }

 async update(id: number, bill: BillEntity): Promise<BillEntity> {
    await this.billRepository.update(id, bill);
    return this.billRepository.findOne({where: {id: id}});
 }

 async delete(id: number): Promise<void> {
  await this.billRepository.delete(id);
 }

 
 async createMultipleBills(billsData: Partial<BillEntity>[]): Promise<BillEntity[]> {
  const bills = billsData.map((data) => this.billRepository.create(data));
  return this.billRepository.save(bills);
  }
}