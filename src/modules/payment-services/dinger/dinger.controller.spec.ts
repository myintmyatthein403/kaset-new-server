import { Test, TestingModule } from '@nestjs/testing';
import { DingerController } from './dinger.controller';
import { DingerService } from './dinger.service';

describe('DingerController', () => {
  let controller: DingerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DingerController],
      providers: [DingerService],
    }).compile();

    controller = module.get<DingerController>(DingerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
