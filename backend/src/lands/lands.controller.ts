import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LandEntity } from './land.entity/land.entity';
import { LandService } from './lands.service';

@Controller('lands')
export class LandController {
  constructor(private readonly landService: LandService) {}

  @Get(':id')
  async getLand(@Param('id', ParseIntPipe) id: number): Promise<LandEntity> {
    return this.landService.findOne(id);
  }
}