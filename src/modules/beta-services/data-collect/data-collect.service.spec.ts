import { Test, TestingModule } from '@nestjs/testing';
import { DataCollectService } from './data-collect.service';

describe('DataCollectService', () => {
  let service: DataCollectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCollectService],
    }).compile();

    service = module.get<DataCollectService>(DataCollectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
