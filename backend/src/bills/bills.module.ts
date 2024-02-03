import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from './bill.entity/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillEntity])],
  exports: [TypeOrmModule],
  providers: [BillsService],
  controllers: [BillsController]
})
export class BillsModule {}
