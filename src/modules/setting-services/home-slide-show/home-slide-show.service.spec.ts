import { Test, TestingModule } from '@nestjs/testing';
import { HomeSlideShowService } from './home-slide-show.service';

describe('HomeSlideShowService', () => {
  let service: HomeSlideShowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeSlideShowService],
    }).compile();

    service = module.get<HomeSlideShowService>(HomeSlideShowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
