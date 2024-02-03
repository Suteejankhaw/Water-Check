import { Controller, Get, Post, Put, Delete, Param, NotFoundException, Body } from '@nestjs/common';
import { LandEntity } from './land.entity/land.entity';
import { LandsService } from './lands.service';

@Controller('lands')
export class LandsController {
  constructor(private readonly landService: LandsService) {}

  @Get()
 async findAll(): Promise<LandEntity[]> {
    return this.landService.findAll();
 }

 @Get(':id')
 async findById(@Param('id') id: number): Promise<LandEntity> {
    const land = await this.landService.findById(id);
    if (!land) {
      throw new NotFoundException(`Land with ID ${id} not found.`);
    }
    return land;
 }

 @Post()
 async create(@Body() land: LandEntity): Promise<LandEntity> {
    return this.landService.create(land);
 }

 @Put(':id')
 async update(@Param('id') id: number, @Body() land: LandEntity): Promise<LandEntity> {
    return this.landService.update(id, land);
 }

 @Delete(':id')
 async delete(@Param('id') id: number): Promise<void> {
    await this.landService.delete(id);
 }
}