import { Test, TestingModule } from '@nestjs/testing';
import { DingerLogService } from './dinger-log.service';

describe('DingerLogService', () => {
  let service: DingerLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DingerLogService],
    }).compile();

    service = module.get<DingerLogService>(DingerLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
