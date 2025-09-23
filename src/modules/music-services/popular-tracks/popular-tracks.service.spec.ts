import { Test, TestingModule } from '@nestjs/testing';
import { PopularTracksService } from './popular-tracks.service';

describe('PopularTracksService', () => {
  let service: PopularTracksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularTracksService],
    }).compile();

    service = module.get<PopularTracksService>(PopularTracksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
