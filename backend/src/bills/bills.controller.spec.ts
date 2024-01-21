import { Test, TestingModule } from '@nestjs/testing';
import { BillsController } from './bills.controller';

describe('BillsController', () => {
  let controller: BillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillsController],
    }).compile();

    controller = module.get<BillsController>(BillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
