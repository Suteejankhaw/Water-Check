// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, CollectorEntity, AdminEntity } from 'src/users/user.entity/user.entity';
import { LandEntity } from 'src/lands/land.entity/land.entity';
import { BillEntity } from 'src/bills/bill.entity/bill.entity';
import { SeederService } from './seeder.service';

@Module({
 imports: [
    TypeOrmModule.forFeature([UserEntity, CollectorEntity, AdminEntity, LandEntity, BillEntity]),
    // ... other necessary imports
 ],
 providers: [SeederService],
 exports: [SeederService], // Export the service if you want to use it elsewhere
})
export class SeederModule {}
