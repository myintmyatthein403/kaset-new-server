import { Test, TestingModule } from '@nestjs/testing';
import { CreditValuesService } from './credit-values.service';

describe('CreditValuesService', () => {
  let service: CreditValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditValuesService],
    }).compile();

    service = module.get<CreditValuesService>(CreditValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
