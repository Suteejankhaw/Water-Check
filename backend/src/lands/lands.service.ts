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

  async findOne(id: number): Promise<LandEntity> {
    try {
      const land = await this.landRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!land) {
        throw new NotFoundException(`Land not found with ID ${id}`);
      }

      return land;
    } catch (error) {
      throw new NotFoundException(`Land not found with ID ${id}`);
    }
  }
}
