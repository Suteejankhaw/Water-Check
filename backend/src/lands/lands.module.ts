import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandEntity } from './land.entity/land.entity';
import { LandService } from './lands.service'; 
import { LandController } from './lands.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([LandEntity])], 
  controllers: [LandController],
  providers: [LandService],
})
export class LandsModule {}
