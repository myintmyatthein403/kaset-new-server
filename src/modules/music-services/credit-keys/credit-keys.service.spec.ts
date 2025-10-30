import { Test, TestingModule } from '@nestjs/testing';
import { CreditKeysService } from './credit-keys.service';

describe('CreditKeysService', () => {
  let service: CreditKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditKeysService],
    }).compile();

    service = module.get<CreditKeysService>(CreditKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
