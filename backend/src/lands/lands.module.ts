import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandEntity } from './land.entity/land.entity';
import { LandsService } from './lands.service'; 
import { LandsController } from './lands.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([LandEntity])],
  exports: [TypeOrmModule],
  controllers: [LandsController],
  providers: [LandsService],
})
export class LandsModule {}
