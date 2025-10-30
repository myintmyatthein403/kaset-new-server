import { Test, TestingModule } from '@nestjs/testing';
import { CreditKeysController } from './credit-keys.controller';
import { CreditKeysService } from './credit-keys.service';

describe('CreditKeysController', () => {
  let controller: CreditKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditKeysController],
      providers: [CreditKeysService],
    }).compile();

    controller = module.get<CreditKeysController>(CreditKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
