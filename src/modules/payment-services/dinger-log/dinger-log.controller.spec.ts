import { Test, TestingModule } from '@nestjs/testing';
import { DingerLogController } from './dinger-log.controller';
import { DingerLogService } from './dinger-log.service';

describe('DingerLogController', () => {
  let controller: DingerLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DingerLogController],
      providers: [DingerLogService],
    }).compile();

    controller = module.get<DingerLogController>(DingerLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
