import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandEntity } from './land.entity/land.entity';


@Injectable()
export class LandService {
  constructor(
    @InjectRepository(LandEntity)
    private readonly landRepository: Repository<LandEntity>,
  ) {}

  async findAll(): Promise<LandEntity[]> {
    return this.landRepository.find();
  }

  async findById(id: number): Promise<LandEntity> {
    return this.landRepository.findOne({where: {id: id}});
 }

 async create(land: LandEntity): Promise<LandEntity> {
    return this.landRepository.save(land);
 }

 async update(id: number, land: LandEntity): Promise<LandEntity> {
    await this.landRepository.update(id, land);
    return this.landRepository.findOne({where: {id: id}});
 }

 async delete(id: number): Promise<void> {
    await this.landRepository.delete(id);
 }

 async createMultipleLands(landsData: Partial<LandEntity>[]): Promise<LandEntity[]> {
  const lands = landsData.map((data) => this.landRepository.create(data));
  return this.landRepository.save(lands);
}
}
