import { Module } from '@nestjs/common';
import { LandsService } from './lands.service';
import { LandsController } from './lands.controller';

@Module({
  providers: [LandsService],
  controllers: [LandsController]
})
export class LandsModule {}
