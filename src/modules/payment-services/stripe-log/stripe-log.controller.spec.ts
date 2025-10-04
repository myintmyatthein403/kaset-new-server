import { Test, TestingModule } from '@nestjs/testing';
import { StripeLogController } from './stripe-log.controller';
import { StripeLogService } from './stripe-log.service';

describe('StripeLogController', () => {
  let controller: StripeLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeLogController],
      providers: [StripeLogService],
    }).compile();

    controller = module.get<StripeLogController>(StripeLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
