import { Test, TestingModule } from '@nestjs/testing';
import { StripeLogService } from './stripe-log.service';

describe('StripeLogService', () => {
  let service: StripeLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeLogService],
    }).compile();

    service = module.get<StripeLogService>(StripeLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
