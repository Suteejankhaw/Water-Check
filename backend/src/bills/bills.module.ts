import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from './bill.entity/bill.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillEntity]), TypeOrmModule.forFeature([LandEntity])],
  exports: [TypeOrmModule],
  providers: [BillsService],
  controllers: [BillsController]
})
export class BillsModule {}
