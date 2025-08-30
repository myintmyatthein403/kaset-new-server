import { Test, TestingModule } from '@nestjs/testing';
import { HomeSlideShowController } from './home-slide-show.controller';
import { HomeSlideShowService } from './home-slide-show.service';

describe('HomeSlideShowController', () => {
  let controller: HomeSlideShowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeSlideShowController],
      providers: [HomeSlideShowService],
    }).compile();

    controller = module.get<HomeSlideShowController>(HomeSlideShowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
