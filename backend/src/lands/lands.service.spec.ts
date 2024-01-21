import { Test, TestingModule } from '@nestjs/testing';
import { LandsService } from './lands.service';

describe('LandsService', () => {
  let service: LandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandsService],
    }).compile();

    service = module.get<LandsService>(LandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
