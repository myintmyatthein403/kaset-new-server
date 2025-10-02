import { Test, TestingModule } from '@nestjs/testing';
import { DingerService } from './dinger.service';

describe('DingerService', () => {
  let service: DingerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DingerService],
    }).compile();

    service = module.get<DingerService>(DingerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
