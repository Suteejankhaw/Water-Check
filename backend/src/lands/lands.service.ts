import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandEntity } from './land.entity/land.entity';


@Injectable()
export class LandsService {
  constructor(
    @InjectRepository(LandEntity)
    private readonly landRepository: Repository<LandEntity>,
  ) {}

  async findAll(): Promise<LandEntity[]> {
    return this.landRepository.find({
    });
  }

  async findById(id: number): Promise<LandEntity> {
    return this.landRepository.findOne({
      where: {id: id},
    });
 }

 async create(land: LandEntity): Promise<LandEntity> {
    return this.landRepository.save(land);
 }

 async update(id: number, land: LandEntity): Promise<LandEntity> {
    await this.landRepository.update(id, land);
    return this.landRepository.findOne({where: {id: id}});
 }

 async delete(id: number): Promise<void> {
  const billsCount = await this.landRepository.count({
    where: { id },
  });
  if (billsCount > 0) {
    console.error(`Pls delete all Bill in land ID ${id}.`);
    return;
  }
  await this.landRepository.delete(id);
  console.log(`success delete Land ID ${id}.`);
 }

 
 async createMultipleLands(landsData: Partial<LandEntity>[]): Promise<LandEntity[]> {
  const lands = landsData.map((data) => this.landRepository.create(data));
  return this.landRepository.save(lands);
  }

  async findOneByIdWithUserAndBills(id: number): Promise<LandEntity | undefined> {
    return this.landRepository.createQueryBuilder('land')
      .leftJoinAndSelect('land.user', 'user')
      .leftJoinAndSelect('land.bill', 'bill')
      .where('land.id = :id', { id })
      .getOne();
  }
}
