import { Test, TestingModule } from '@nestjs/testing';
import { CreditValuesController } from './credit-values.controller';
import { CreditValuesService } from './credit-values.service';

describe('CreditValuesController', () => {
  let controller: CreditValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditValuesController],
      providers: [CreditValuesService],
    }).compile();

    controller = module.get<CreditValuesController>(CreditValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
