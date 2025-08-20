import { Test, TestingModule } from '@nestjs/testing';
import { DataCollectController } from './data-collect.controller';
import { DataCollectService } from './data-collect.service';

describe('DataCollectController', () => {
  let controller: DataCollectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCollectController],
      providers: [DataCollectService],
    }).compile();

    controller = module.get<DataCollectController>(DataCollectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
